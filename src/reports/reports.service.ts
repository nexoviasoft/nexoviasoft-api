import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Order } from '../order/entities/order.entity';
import { Project } from '../projects/entities/project.entity';
import { Task } from '../projects/entities/task.entity';
import { Attendance } from '../attendance/entities/attendance.entity';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(Attendance)
    private readonly attendanceRepository: Repository<Attendance>,
  ) {}

  async getDashboard(params?: { from?: string; to?: string }) {
    const { from, to } = params || {};

    const now = new Date();
    const toDate = to ? this.parseDateOrThrow(to) : now;
    const fromDate = from
      ? this.parseDateOrThrow(from)
      : new Date(toDate.getTime() - 30 * 24 * 60 * 60 * 1000);

    // Normalize to start/end of day for stable comparisons
    const rangeStart = new Date(fromDate);
    rangeStart.setHours(0, 0, 0, 0);
    const rangeEnd = new Date(toDate);
    rangeEnd.setHours(23, 59, 59, 999);

    // Previous period (same length) for deltas
    const rangeMs = rangeEnd.getTime() - rangeStart.getTime();
    const prevEnd = new Date(rangeStart.getTime() - 1);
    const prevStart = new Date(prevEnd.getTime() - rangeMs);

    const [incomes, prevIncomes, tasks, projects, attendances] = await Promise.all([
      this.orderRepository.manager.getRepository('Income').find({
        where: { createdAt: Between(rangeStart, rangeEnd) },
        order: { createdAt: 'ASC' },
      }),
      this.orderRepository.manager.getRepository('Income').find({
        where: { createdAt: Between(prevStart, prevEnd) },
      }),
      this.taskRepository.find({
        where: { createdAt: Between(rangeStart, rangeEnd) },
      }),
      this.projectRepository.find(),
      this.attendanceRepository.find({
        where: { createdAt: Between(rangeStart, rangeEnd) },
      }),
    ]);

    // Total Revenue (from actual incomes)
    const totalRevenue = incomes.reduce((sum, i) => sum + this.toNumber((i as any).amount), 0);
    const prevRevenue = prevIncomes.reduce((sum, i) => sum + this.toNumber((i as any).amount), 0);
    const revenueChangePct =
      prevRevenue > 0 ? ((totalRevenue - prevRevenue) / prevRevenue) * 100 : null;

    // Hours Worked (from attendance.workHours like "9h 5m")
    const totalMinutesWorked = attendances.reduce((sum, a) => {
      const minutes = this.parseWorkHoursToMinutes(a.workHours);
      return sum + minutes;
    }, 0);
    const totalHoursWorked = Math.round(totalMinutesWorked / 60);

    // Active projects
    const activeProjects = projects.filter(
      (p) => (p.status || '').toLowerCase() !== 'completed',
    ).length;

    const dueThisWeek = projects.filter((p) => {
      if (!p.dueDate) return false;
      const d = p.dueDate instanceof Date ? p.dueDate : new Date(p.dueDate);
      const in7Days = new Date();
      in7Days.setDate(in7Days.getDate() + 7);
      return d >= now && d <= in7Days && (p.status || '').toLowerCase() !== 'completed';
    }).length;

    // Efficiency from tasks completed ratio
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((t) => (t.status || '').toLowerCase() === 'complete').length;
    const efficiency = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    // Revenue Trend (monthly buckets) for chart [{ name, pv }]
    const revenueTrend = this.groupIncomesByMonth(incomes as any);

    // Task Distribution for pie [{ name, value }]
    const taskDistribution = this.buildTaskDistribution(tasks);

    const stats = [
      {
        label: 'Total Revenue',
        value: this.formatCurrency(totalRevenue),
        subtext:
          revenueChangePct === null
            ? 'No previous period data'
            : `${this.formatSignedPercent(revenueChangePct)} vs last period`,
        trend:
          revenueChangePct === null
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

  create(createReportDto: CreateReportDto) {
    return 'This action adds a new report';
  }

  findAll() {
    return `This action returns all reports`;
  }

  findOne(id: number) {
    return `This action returns a #${id} report`;
  }

  update(id: number, updateReportDto: UpdateReportDto) {
    return `This action updates a #${id} report`;
  }

  remove(id: number) {
    return `This action removes a #${id} report`;
  }

  private parseDateOrThrow(value: string): Date {
    // Accept YYYY-MM-DD (preferred) or ISO strings
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) {
      throw new Error(`Invalid date: ${value}`);
    }
    return d;
  }

  private toNumber(value: any): number {
    // TypeORM decimal often comes as string
    const n = typeof value === 'number' ? value : parseFloat(String(value ?? 0));
    return Number.isFinite(n) ? n : 0;
  }

  private formatCurrency(amount: number): string {
    // Keep same string style as current UI examples
    return `$${Math.round(amount).toLocaleString('en-US')}`;
  }

  private formatSignedPercent(pct: number): string {
    const rounded = Math.round(pct);
    return `${rounded >= 0 ? '+' : ''}${rounded}%`;
  }

  private parseWorkHoursToMinutes(workHours?: string | null): number {
    if (!workHours) return 0;
    const s = String(workHours).trim();
    if (!s || s === '-') return 0;
    const m = s.match(/(\d+)\s*h\s*(\d+)\s*m/i);
    if (!m) return 0;
    const h = parseInt(m[1], 10);
    const mins = parseInt(m[2], 10);
    if (!Number.isFinite(h) || !Number.isFinite(mins)) return 0;
    return h * 60 + mins;
  }

  private groupIncomesByMonth(incomes: any[]): Array<{ name: string; pv: number }> {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const buckets = new Map<string, number>(); // key: YYYY-MM

    for (const i of incomes) {
      const d = i.createdAt instanceof Date ? i.createdAt : new Date(i.createdAt as any);
      if (Number.isNaN(d.getTime())) continue;
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      buckets.set(key, (buckets.get(key) || 0) + this.toNumber(i.amount));
    }

    const sortedKeys = [...buckets.keys()].sort();
    return sortedKeys.map((key) => {
      const [y, mm] = key.split('-');
      const monthIdx = parseInt(mm, 10) - 1;
      const name = monthNames[monthIdx] || `${mm}/${y}`;
      return { name, pv: Math.round(buckets.get(key) || 0) };
    });
  }

  private buildTaskDistribution(tasks: Task[]): Array<{ name: string; value: number }> {
    const counts = {
      Completed: 0,
      'In Progress': 0,
      'To Do': 0,
      Backlog: 0,
    };

    for (const t of tasks) {
      const s = (t.status || '').toLowerCase();
      if (s === 'complete' || s === 'completed') counts.Completed++;
      else if (s === 'in-progress' || s === 'in progress') counts['In Progress']++;
      else if (s === 'todo' || s === 'to do') counts['To Do']++;
      else if (s === 'review') counts.Backlog++;
      else counts.Backlog++;
    }

    return [
      { name: 'Completed', value: counts.Completed },
      { name: 'In Progress', value: counts['In Progress'] },
      { name: 'To Do', value: counts['To Do'] },
      { name: 'Backlog', value: counts.Backlog },
    ];
  }
}
