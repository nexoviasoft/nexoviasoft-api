"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("../order/entities/order.entity");
const project_entity_1 = require("../projects/entities/project.entity");
const task_entity_1 = require("../projects/entities/task.entity");
const attendance_entity_1 = require("../attendance/entities/attendance.entity");
let ReportsService = class ReportsService {
    constructor(orderRepository, projectRepository, taskRepository, attendanceRepository) {
        this.orderRepository = orderRepository;
        this.projectRepository = projectRepository;
        this.taskRepository = taskRepository;
        this.attendanceRepository = attendanceRepository;
    }
    async getDashboard(params) {
        const { from, to } = params || {};
        const now = new Date();
        const toDate = to ? this.parseDateOrThrow(to) : now;
        const fromDate = from
            ? this.parseDateOrThrow(from)
            : new Date(toDate.getTime() - 30 * 24 * 60 * 60 * 1000);
        const rangeStart = new Date(fromDate);
        rangeStart.setHours(0, 0, 0, 0);
        const rangeEnd = new Date(toDate);
        rangeEnd.setHours(23, 59, 59, 999);
        const rangeMs = rangeEnd.getTime() - rangeStart.getTime();
        const prevEnd = new Date(rangeStart.getTime() - 1);
        const prevStart = new Date(prevEnd.getTime() - rangeMs);
        const [orders, prevOrders, tasks, projects, attendances] = await Promise.all([
            this.orderRepository.find({
                where: { createdAt: (0, typeorm_2.Between)(rangeStart, rangeEnd) },
                order: { createdAt: 'ASC' },
            }),
            this.orderRepository.find({
                where: { createdAt: (0, typeorm_2.Between)(prevStart, prevEnd) },
            }),
            this.taskRepository.find({
                where: { createdAt: (0, typeorm_2.Between)(rangeStart, rangeEnd) },
            }),
            this.projectRepository.find(),
            this.attendanceRepository.find({
                where: { createdAt: (0, typeorm_2.Between)(rangeStart, rangeEnd) },
            }),
        ]);
        const totalRevenue = orders.reduce((sum, o) => sum + this.toNumber(o.amount), 0);
        const prevRevenue = prevOrders.reduce((sum, o) => sum + this.toNumber(o.amount), 0);
        const revenueChangePct = prevRevenue > 0 ? ((totalRevenue - prevRevenue) / prevRevenue) * 100 : null;
        const totalMinutesWorked = attendances.reduce((sum, a) => {
            const minutes = this.parseWorkHoursToMinutes(a.workHours);
            return sum + minutes;
        }, 0);
        const totalHoursWorked = Math.round(totalMinutesWorked / 60);
        const activeProjects = projects.filter((p) => (p.status || '').toLowerCase() !== 'completed').length;
        const dueThisWeek = projects.filter((p) => {
            if (!p.dueDate)
                return false;
            const d = p.dueDate instanceof Date ? p.dueDate : new Date(p.dueDate);
            const in7Days = new Date();
            in7Days.setDate(in7Days.getDate() + 7);
            return d >= now && d <= in7Days && (p.status || '').toLowerCase() !== 'completed';
        }).length;
        const totalTasks = tasks.length;
        const completedTasks = tasks.filter((t) => (t.status || '').toLowerCase() === 'complete').length;
        const efficiency = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
        const revenueTrend = this.groupOrdersByMonth(orders);
        const taskDistribution = this.buildTaskDistribution(tasks);
        const stats = [
            {
                label: 'Total Revenue',
                value: this.formatCurrency(totalRevenue),
                subtext: revenueChangePct === null
                    ? 'No previous period data'
                    : `${this.formatSignedPercent(revenueChangePct)} vs last period`,
                trend: revenueChangePct === null
                    ? 'neutral'
                    : revenueChangePct > 0
                        ? 'up'
                        : revenueChangePct < 0
                            ? 'down'
                            : 'neutral',
            },
            {
                label: 'Hours Worked',
                value: `${totalHoursWorked}h`,
                subtext: 'Total billable hours',
                trend: 'neutral',
            },
            {
                label: 'Active Projects',
                value: String(activeProjects),
                subtext: `${dueThisWeek} due this week`,
                trend: 'neutral',
            },
            {
                label: 'Efficiency',
                value: `${efficiency}%`,
                subtext: 'Task completion rate',
                trend: 'neutral',
            },
        ];
        return {
            range: {
                from: rangeStart.toISOString(),
                to: rangeEnd.toISOString(),
            },
            stats,
            revenueTrend,
            taskDistribution,
        };
    }
    create(createReportDto) {
        return 'This action adds a new report';
    }
    findAll() {
        return `This action returns all reports`;
    }
    findOne(id) {
        return `This action returns a #${id} report`;
    }
    update(id, updateReportDto) {
        return `This action updates a #${id} report`;
    }
    remove(id) {
        return `This action removes a #${id} report`;
    }
    parseDateOrThrow(value) {
        const d = new Date(value);
        if (Number.isNaN(d.getTime())) {
            throw new Error(`Invalid date: ${value}`);
        }
        return d;
    }
    toNumber(value) {
        const n = typeof value === 'number' ? value : parseFloat(String(value ?? 0));
        return Number.isFinite(n) ? n : 0;
    }
    formatCurrency(amount) {
        return `$${Math.round(amount).toLocaleString('en-US')}`;
    }
    formatSignedPercent(pct) {
        const rounded = Math.round(pct);
        return `${rounded >= 0 ? '+' : ''}${rounded}%`;
    }
    parseWorkHoursToMinutes(workHours) {
        if (!workHours)
            return 0;
        const s = String(workHours).trim();
        if (!s || s === '-')
            return 0;
        const m = s.match(/(\d+)\s*h\s*(\d+)\s*m/i);
        if (!m)
            return 0;
        const h = parseInt(m[1], 10);
        const mins = parseInt(m[2], 10);
        if (!Number.isFinite(h) || !Number.isFinite(mins))
            return 0;
        return h * 60 + mins;
    }
    groupOrdersByMonth(orders) {
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const buckets = new Map();
        for (const o of orders) {
            const d = o.createdAt instanceof Date ? o.createdAt : new Date(o.createdAt);
            if (Number.isNaN(d.getTime()))
                continue;
            const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
            buckets.set(key, (buckets.get(key) || 0) + this.toNumber(o.amount));
        }
        const sortedKeys = [...buckets.keys()].sort();
        return sortedKeys.map((key) => {
            const [y, mm] = key.split('-');
            const monthIdx = parseInt(mm, 10) - 1;
            const name = monthNames[monthIdx] || `${mm}/${y}`;
            return { name, pv: Math.round(buckets.get(key) || 0) };
        });
    }
    buildTaskDistribution(tasks) {
        const counts = {
            Completed: 0,
            'In Progress': 0,
            'To Do': 0,
            Backlog: 0,
        };
        for (const t of tasks) {
            const s = (t.status || '').toLowerCase();
            if (s === 'complete' || s === 'completed')
                counts.Completed++;
            else if (s === 'in-progress' || s === 'in progress')
                counts['In Progress']++;
            else if (s === 'todo' || s === 'to do')
                counts['To Do']++;
            else if (s === 'review')
                counts.Backlog++;
            else
                counts.Backlog++;
        }
        return [
            { name: 'Completed', value: counts.Completed },
            { name: 'In Progress', value: counts['In Progress'] },
            { name: 'To Do', value: counts['To Do'] },
            { name: 'Backlog', value: counts.Backlog },
        ];
    }
};
exports.ReportsService = ReportsService;
exports.ReportsService = ReportsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(project_entity_1.Project)),
    __param(2, (0, typeorm_1.InjectRepository)(task_entity_1.Task)),
    __param(3, (0, typeorm_1.InjectRepository)(attendance_entity_1.Attendance)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ReportsService);
//# sourceMappingURL=reports.service.js.map