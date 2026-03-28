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
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const attendance_entity_1 = require("../attendance/entities/attendance.entity");
const leave_entity_1 = require("../leave/entities/leave.entity");
const meeting_entity_1 = require("../meeting/entities/meeting.entity");
const order_entity_1 = require("../order/entities/order.entity");
const payroll_entity_1 = require("../payroll/entities/payroll.entity");
const schedule_entity_1 = require("../schedule/entities/schedule.entity");
const our_client_entity_1 = require("../setting/our-client/entities/our-client.entity");
const expense_entity_1 = require("../expense/entities/expense.entity");
let DashboardService = class DashboardService {
    constructor(clientRepository, orderRepository, payrollRepository, attendanceRepository, leaveRepository, meetingRepository, scheduleRepository, expenseRepository) {
        this.clientRepository = clientRepository;
        this.orderRepository = orderRepository;
        this.payrollRepository = payrollRepository;
        this.attendanceRepository = attendanceRepository;
        this.leaveRepository = leaveRepository;
        this.meetingRepository = meetingRepository;
        this.scheduleRepository = scheduleRepository;
        this.expenseRepository = expenseRepository;
    }
    async getActivity(tab) {
        const t = String(tab || 'attendance').toLowerCase();
        if (t === 'leave' || t === 'leave request' || t === 'leave-requests' || t === 'leaverequest') {
            const leaves = await this.leaveRepository.find({
                relations: ['team'],
                order: { createdAt: 'DESC' },
                take: 8,
            });
            return {
                tab: 'Leave',
                items: leaves.map((l) => ({
                    id: l.id,
                    type: l.type,
                    startDate: l.startDate,
                    endDate: l.endDate,
                    days: l.days,
                    status: l.status,
                    createdAt: l.createdAt,
                    team: l.team
                        ? {
                            id: l.team.id,
                            name: `${l.team.firstName} ${l.team.lastName}`.trim(),
                            role: l.team.role,
                            avatar: l.team.profileImage,
                        }
                        : null,
                })),
            };
        }
        if (t === 'finance') {
            const orders = await this.orderRepository.find({
                relations: ['client'],
                order: { createdAt: 'DESC' },
                take: 8,
            });
            return {
                tab: 'Finance',
                items: orders.map((o) => ({
                    id: o.id,
                    orderId: o.orderId,
                    service: o.service,
                    amount: Number(o.amount || 0),
                    status: o.status,
                    createdAt: o.createdAt,
                    client: o.client
                        ? {
                            id: o.client.id,
                            name: o.client.name,
                        }
                        : null,
                })),
            };
        }
        const attendanceRows = await this.attendanceRepository.find({
            relations: ['team'],
            order: { createdAt: 'DESC' },
            take: 8,
        });
        return {
            tab: 'Attendance',
            items: attendanceRows.map((a) => ({
                id: a.id,
                checkIn: a.checkIn || '-',
                checkOut: a.checkOut || '-',
                workHours: a.workHours || '-',
                status: a.status,
                createdAt: a.createdAt,
                team: a.team
                    ? {
                        id: a.team.id,
                        name: `${a.team.firstName} ${a.team.lastName}`.trim(),
                        role: a.team.role,
                        avatar: a.team.profileImage,
                    }
                    : null,
            })),
        };
    }
    normalizePeriod(period) {
        const p = String(period || '').toLowerCase();
        if (p === 'weekly')
            return 'weekly';
        if (p === 'monthly')
            return 'monthly';
        if (p === 'quarterly')
            return 'quarterly';
        return 'yearly';
    }
    startOfDay(d) {
        const x = new Date(d);
        x.setHours(0, 0, 0, 0);
        return x;
    }
    async getSummary(_user) {
        const now = new Date();
        const activeCustomersSince = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        const [totalCustomers, activeCustomers, orderAmounts, payrollTotals, expenseTotals, attendanceRows, nextMeeting] = await Promise.all([
            this.clientRepository.count(),
            this.orderRepository
                .createQueryBuilder('o')
                .select('COUNT(DISTINCT o.clientId)', 'count')
                .where('o.createdAt >= :since', { since: activeCustomersSince.toISOString() })
                .getRawOne(),
            this.orderRepository.find({ select: ['amount'] }),
            this.payrollRepository
                .createQueryBuilder('p')
                .select('COALESCE(SUM(p.netPay), 0)', 'totalCost')
                .getRawOne(),
            this.expenseRepository
                .createQueryBuilder('e')
                .select('COALESCE(SUM(e.amount), 0)', 'totalAmount')
                .where('e.status = :status', { status: expense_entity_1.ExpenseStatus.APPROVED })
                .getRawOne(),
            this.attendanceRepository.find({
                relations: ['team'],
                order: { createdAt: 'DESC' },
                take: 8,
            }),
            this.meetingRepository.findOne({
                where: { dateTime: (0, typeorm_2.MoreThan)(now) },
                order: { dateTime: 'ASC' },
            }),
        ]);
        const revenueTotal = orderAmounts.reduce((sum, o) => sum + Number(o.amount || 0), 0);
        const payrollExpense = Number(payrollTotals?.totalCost ?? 0);
        const additionalExpense = Number(expenseTotals?.totalAmount ?? 0);
        const expenseTotal = payrollExpense + additionalExpense;
        const profitTotal = revenueTotal - expenseTotal;
        const allAttendances = await this.attendanceRepository.find();
        const stats = { total: allAttendances.length, onTime: 0, late: 0, absent: 0 };
        allAttendances.forEach((a) => {
            const s = a.status?.toLowerCase();
            if (s === 'on time')
                stats.onTime++;
            else if (s === 'late')
                stats.late++;
            else if (s === 'absent')
                stats.absent++;
        });
        const attendanceStats = {
            total: stats.total,
            onTime: stats.onTime,
            late: stats.late,
            absent: stats.absent,
            onTimePercentage: stats.total > 0 ? ((stats.onTime / stats.total) * 100).toFixed(2) : '0.00',
            latePercentage: stats.total > 0 ? ((stats.late / stats.total) * 100).toFixed(2) : '0.00',
            absentPercentage: stats.total > 0 ? ((stats.absent / stats.total) * 100).toFixed(2) : '0.00',
        };
        const recentAttendance = attendanceRows.map((a) => ({
            id: a.id,
            checkIn: a.checkIn || '-',
            checkOut: a.checkOut || '-',
            workHours: a.workHours || '-',
            status: a.status,
            createdAt: a.createdAt,
            team: a.team
                ? {
                    id: a.team.id,
                    name: `${a.team.firstName} ${a.team.lastName}`.trim(),
                    role: a.team.role,
                    avatar: a.team.profileImage,
                }
                : null,
        }));
        const schedules = await this.scheduleRepository.find({
            relations: ['team'],
            order: { id: 'DESC' },
            take: 5,
        });
        return {
            customers: {
                total: totalCustomers,
                active: Number(activeCustomers?.count ?? 0),
            },
            finance: {
                revenueTotal,
                expenseTotal,
                profitTotal,
            },
            attendance: attendanceStats,
            nextAgenda: nextMeeting
                ? {
                    id: nextMeeting.id,
                    topic: nextMeeting.topic,
                    dateTime: nextMeeting.dateTime,
                    meetingLink: nextMeeting.meetingLink,
                    status: nextMeeting.status,
                }
                : null,
            recentAttendance,
            schedules: schedules.map((s) => ({
                id: s.id,
                weekStartDate: s.weekStartDate,
                weekEndDate: s.weekEndDate,
                team: s.team
                    ? {
                        id: s.team.id,
                        name: `${s.team.firstName} ${s.team.lastName}`.trim(),
                        role: s.team.role,
                        avatar: s.team.profileImage,
                    }
                    : null,
            })),
        };
    }
    async getAttendanceTrend(period) {
        const p = this.normalizePeriod(period);
        const now = new Date();
        const today = this.startOfDay(now);
        if (p === 'weekly') {
            const start = new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000);
            const rows = await this.attendanceRepository
                .createQueryBuilder('a')
                .select(`TO_CHAR("a"."createdAt"::date, 'YYYY-MM-DD')`, 'day')
                .addSelect('COUNT(*)', 'total')
                .addSelect(`SUM(CASE WHEN LOWER("a"."status") IN ('on time','late') THEN 1 ELSE 0 END)`, 'present')
                .where('a.createdAt >= :start', { start: start.toISOString() })
                .groupBy('day')
                .orderBy('day', 'ASC')
                .getRawMany();
            const map = new Map(rows.map((r) => [r.day, r]));
            const data = Array.from({ length: 7 }, (_, i) => {
                const d = new Date(start.getTime() + i * 24 * 60 * 60 * 1000);
                const key = d.toISOString().slice(0, 10);
                const r = map.get(key);
                const total = Number(r?.total ?? 0);
                const present = Number(r?.present ?? 0);
                const presence = total > 0 ? Math.round((present / total) * 100) : 0;
                const label = d.toLocaleDateString('en-US', { weekday: 'short' });
                return { label, presence };
            });
            return { period: 'Weekly', data };
        }
        if (p === 'monthly') {
            const start = new Date(today.getTime() - 29 * 24 * 60 * 60 * 1000);
            const rows = await this.attendanceRepository
                .createQueryBuilder('a')
                .select(`TO_CHAR("a"."createdAt"::date, 'YYYY-MM-DD')`, 'day')
                .addSelect('COUNT(*)', 'total')
                .addSelect(`SUM(CASE WHEN LOWER("a"."status") IN ('on time','late') THEN 1 ELSE 0 END)`, 'present')
                .where('a.createdAt >= :start', { start: start.toISOString() })
                .groupBy('day')
                .orderBy('day', 'ASC')
                .getRawMany();
            const map = new Map(rows.map((r) => [r.day, r]));
            const data = Array.from({ length: 30 }, (_, i) => {
                const d = new Date(start.getTime() + i * 24 * 60 * 60 * 1000);
                const key = d.toISOString().slice(0, 10);
                const r = map.get(key);
                const total = Number(r?.total ?? 0);
                const present = Number(r?.present ?? 0);
                const presence = total > 0 ? Math.round((present / total) * 100) : 0;
                const label = String(d.getDate()).padStart(2, '0');
                return { label, presence };
            });
            return { period: 'Monthly', data };
        }
        const start = new Date(today);
        start.setMonth(start.getMonth() - 11);
        start.setDate(1);
        const rows = await this.attendanceRepository
            .createQueryBuilder('a')
            .select(`TO_CHAR(DATE_TRUNC('month', "a"."createdAt"), 'YYYY-MM')`, 'ym')
            .addSelect('COUNT(*)', 'total')
            .addSelect(`SUM(CASE WHEN LOWER("a"."status") IN ('on time','late') THEN 1 ELSE 0 END)`, 'present')
            .where('a.createdAt >= :start', { start: start.toISOString() })
            .groupBy('ym')
            .orderBy('ym', 'ASC')
            .getRawMany();
        const map = new Map(rows.map((r) => [r.ym, r]));
        const data = Array.from({ length: 12 }, (_, i) => {
            const d = new Date(start);
            d.setMonth(start.getMonth() + i);
            const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
            const r = map.get(key);
            const total = Number(r?.total ?? 0);
            const present = Number(r?.present ?? 0);
            const presence = total > 0 ? Math.round((present / total) * 100) : 0;
            const label = d.toLocaleDateString('en-US', { month: 'short' });
            return { label, presence };
        });
        return { period: 'Yearly', data };
    }
    async getFinanceTrend(period) {
        const p = this.normalizePeriod(period);
        const now = new Date();
        const today = this.startOfDay(now);
        let start;
        let length;
        let format;
        let interval;
        if (p === 'weekly') {
            start = new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000);
            length = 7;
            format = 'YYYY-MM-DD';
            interval = 'day';
        }
        else if (p === 'monthly') {
            start = new Date(today.getTime() - 29 * 24 * 60 * 60 * 1000);
            length = 30;
            format = 'YYYY-MM-DD';
            interval = 'day';
        }
        else if (p === 'quarterly') {
            start = new Date(today.getTime() - 89 * 24 * 60 * 60 * 1000);
            length = 90;
            format = 'YYYY-MM-DD';
            interval = 'day';
        }
        else {
            start = new Date(today);
            start.setMonth(start.getMonth() - 11);
            start.setDate(1);
            length = 12;
            format = 'YYYY-MM';
            interval = 'month';
        }
        const incomeRows = await this.orderRepository
            .createQueryBuilder('o')
            .select(`TO_CHAR(DATE_TRUNC('${interval}', "o"."createdAt"), '${format}')`, 'key')
            .addSelect(`COALESCE(SUM("o"."amount"), 0)`, 'amount')
            .where('o.createdAt >= :start', { start: start.toISOString() })
            .groupBy('key')
            .getRawMany();
        const payrollRows = await this.payrollRepository
            .createQueryBuilder('p')
            .select(`TO_CHAR(DATE_TRUNC('${interval}', "p"."createdAt"), '${format}')`, 'key')
            .addSelect(`COALESCE(SUM("p"."netPay"), 0)`, 'amount')
            .where('p.createdAt >= :start', { start: start.toISOString() })
            .groupBy('key')
            .getRawMany();
        const expenseRows = await this.expenseRepository
            .createQueryBuilder('e')
            .select(`TO_CHAR(DATE_TRUNC('${interval}', "e"."createdAt"), '${format}')`, 'key')
            .addSelect(`COALESCE(SUM("e"."amount"), 0)`, 'amount')
            .where('e.createdAt >= :start', { start: start.toISOString() })
            .andWhere('e.status = :status', { status: expense_entity_1.ExpenseStatus.APPROVED })
            .groupBy('key')
            .getRawMany();
        const incomeMap = new Map(incomeRows.map((r) => [r.key, Number(r.amount)]));
        const payrollMap = new Map(payrollRows.map((r) => [r.key, Number(r.amount)]));
        const expenseMap = new Map(expenseRows.map((r) => [r.key, Number(r.amount)]));
        const data = Array.from({ length }, (_, i) => {
            const d = new Date(start);
            if (interval === 'day') {
                d.setDate(start.getDate() + i);
            }
            else {
                d.setMonth(start.getMonth() + i);
            }
            const key = interval === 'day'
                ? d.toISOString().slice(0, 10)
                : `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
            const income = incomeMap.get(key) || 0;
            const expense = (payrollMap.get(key) || 0) + (expenseMap.get(key) || 0);
            const profit = income - expense;
            let label;
            if (p === 'weekly')
                label = d.toLocaleDateString('en-US', { weekday: 'short' });
            else if (p === 'monthly')
                label = String(d.getDate()).padStart(2, '0');
            else if (p === 'quarterly')
                label = String(i + 1).padStart(2, '0');
            else
                label = d.toLocaleDateString('en-US', { month: 'short' });
            return { label, income, expense, profit };
        });
        return { period: p.charAt(0).toUpperCase() + p.slice(1), data };
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(our_client_entity_1.OurClient)),
    __param(1, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(2, (0, typeorm_1.InjectRepository)(payroll_entity_1.Payroll)),
    __param(3, (0, typeorm_1.InjectRepository)(attendance_entity_1.Attendance)),
    __param(4, (0, typeorm_1.InjectRepository)(leave_entity_1.Leave)),
    __param(5, (0, typeorm_1.InjectRepository)(meeting_entity_1.Meeting)),
    __param(6, (0, typeorm_1.InjectRepository)(schedule_entity_1.Schedule)),
    __param(7, (0, typeorm_1.InjectRepository)(expense_entity_1.Expense)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map