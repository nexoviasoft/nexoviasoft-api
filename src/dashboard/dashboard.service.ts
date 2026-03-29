import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { Attendance } from '../attendance/entities/attendance.entity';
import { Leave } from '../leave/entities/leave.entity';
import { Meeting } from '../meeting/entities/meeting.entity';
import { Order } from '../order/entities/order.entity';
import { Payroll } from '../payroll/entities/payroll.entity';
import { Schedule } from '../schedule/entities/schedule.entity';
import { OurClient } from '../setting/our-client/entities/our-client.entity';
import { Expense, ExpenseStatus } from '../expense/entities/expense.entity';

type DashboardPeriod = 'weekly' | 'monthly' | 'quarterly' | 'yearly';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(OurClient)
    private readonly clientRepository: Repository<OurClient>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Payroll)
    private readonly payrollRepository: Repository<Payroll>,
    @InjectRepository(Attendance)
    private readonly attendanceRepository: Repository<Attendance>,
    @InjectRepository(Leave)
    private readonly leaveRepository: Repository<Leave>,
    @InjectRepository(Meeting)
    private readonly meetingRepository: Repository<Meeting>,
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
    @InjectRepository(Expense)
    private readonly expenseRepository: Repository<Expense>,
  ) {}

  async getActivity(tab?: string) {
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
      const incomes = await this.orderRepository.manager.getRepository('Income').find({
        relations: ['client', 'order'],
        order: { createdAt: 'DESC' },
        take: 8,
      });

      return {
        tab: 'Finance',
        items: incomes.map((i) => ({
          id: (i as any).id,
          orderId: (i as any).order?.orderId || 'Standalone',
          service: (i as any).order?.service || (i as any).description || 'Income',
          amount: Number((i as any).amount || 0),
          status: 'Completed',
          createdAt: (i as any).createdAt,
          client: (i as any).client
            ? {
                id: (i as any).client.id,
                name: (i as any).client.name,
              }
            : null,
        })),
      };
    }

    // default: attendance activity
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

  private normalizePeriod(period?: string): DashboardPeriod {
    const p = String(period || '').toLowerCase();
    if (p === 'weekly') return 'weekly';
    if (p === 'monthly') return 'monthly';
    if (p === 'quarterly') return 'quarterly';
    return 'yearly';
  }

  private startOfDay(d: Date) {
    const x = new Date(d);
    x.setHours(0, 0, 0, 0);
    return x;
  }

  async getSummary(_user?: { id?: number; role?: string }) {
    const now = new Date();
    const activeCustomersSince = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const [totalCustomers, activeCustomers, incomeRecords, payrollTotals, expenseTotals, attendanceRows, nextMeeting] =
      await Promise.all([
        this.clientRepository.count(),
        this.orderRepository
          .createQueryBuilder('o')
          .select('COUNT(DISTINCT o.clientId)', 'count')
          .where('o.createdAt >= :since', { since: activeCustomersSince.toISOString() })
          .getRawOne<{ count: string }>(),
        this.orderRepository.manager.getRepository('Income').find({ select: ['amount'] }),
        this.payrollRepository
          .createQueryBuilder('p')
          .select('COALESCE(SUM(p.netPay), 0)', 'totalCost')
          .getRawOne<{ totalCost: string }>(),
        this.expenseRepository
          .createQueryBuilder('e')
          .select('COALESCE(SUM(e.amount), 0)', 'totalAmount')
          .where('e.status = :status', { status: ExpenseStatus.APPROVED })
          .getRawOne<{ totalAmount: string }>(),
        this.attendanceRepository.find({
          relations: ['team'],
          order: { createdAt: 'DESC' },
          take: 8,
        }),
        this.meetingRepository.findOne({
          where: { dateTime: MoreThan(now) },
          order: { dateTime: 'ASC' },
        }),
      ]);

    const revenueTotal = incomeRecords.reduce((sum, i) => sum + Number((i as any).amount || 0), 0);
    const payrollExpense = Number(payrollTotals?.totalCost ?? 0);
    const additionalExpense = Number(expenseTotals?.totalAmount ?? 0);
    const expenseTotal = payrollExpense + additionalExpense;
    const profitTotal = revenueTotal - expenseTotal;

    // Attendance stats (same logic as AttendanceService.getStatusStats, but localized here)
    const allAttendances = await this.attendanceRepository.find();
    const stats = { total: allAttendances.length, onTime: 0, late: 0, absent: 0 };
    allAttendances.forEach((a) => {
      const s = a.status?.toLowerCase();
      if (s === 'on time') stats.onTime++;
      else if (s === 'late') stats.late++;
      else if (s === 'absent') stats.absent++;
    });

    const attendanceStats = {
      total: stats.total,
      onTime: stats.onTime,
      late: stats.late,
      absent: stats.absent,
      onTimePercentage: stats.total > 0 ? ((stats.onTime / stats.total) * 100).toFixed(2) : '0.00',
      latePercentage: stats.total > 0 ? ((stats.late / stats.total) * 100).toFixed(2) : '0.00',
      absentPercentage:
        stats.total > 0 ? ((stats.absent / stats.total) * 100).toFixed(2) : '0.00',
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

    // Optional: latest schedules (can be used later to replace the static Schedule section)
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
            topic: (nextMeeting as any).topic,
            dateTime: (nextMeeting as any).dateTime,
            meetingLink: (nextMeeting as any).meetingLink,
            status: (nextMeeting as any).status,
          }
        : null,
      recentAttendance,
      schedules: schedules.map((s) => ({
        id: s.id,
        weekStartDate: (s as any).weekStartDate,
        weekEndDate: (s as any).weekEndDate,
        team: (s as any).team
          ? {
              id: (s as any).team.id,
              name: `${(s as any).team.firstName} ${(s as any).team.lastName}`.trim(),
              role: (s as any).team.role,
              avatar: (s as any).team.profileImage,
            }
          : null,
      })),
    };
  }

  async getAttendanceTrend(period?: string) {
    const p = this.normalizePeriod(period);
    const now = new Date();
    const today = this.startOfDay(now);

    if (p === 'weekly') {
      // last 7 days, oldest → newest
      const start = new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000);

      const rows = await this.attendanceRepository
        .createQueryBuilder('a')
        .select(`TO_CHAR("a"."createdAt"::date, 'YYYY-MM-DD')`, 'day')
        .addSelect('COUNT(*)', 'total')
        .addSelect(
          `SUM(CASE WHEN LOWER("a"."status") IN ('on time','late') THEN 1 ELSE 0 END)`,
          'present',
        )
        .where('a.createdAt >= :start', { start: start.toISOString() })
        .groupBy('day')
        .orderBy('day', 'ASC')
        .getRawMany<{ day: string; total: string; present: string }>();

      const map = new Map(rows.map((r) => [r.day, r]));
      const data = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(start.getTime() + i * 24 * 60 * 60 * 1000);
        const key = d.toISOString().slice(0, 10);
        const r = map.get(key);
        const total = Number(r?.total ?? 0);
        const present = Number(r?.present ?? 0);
        const presence = total > 0 ? Math.round((present / total) * 100) : 0;
        const label = d.toLocaleDateString('en-US', { weekday: 'short' }); // Mon/Tue...
        return { label, presence };
      });
      return { period: 'Weekly', data };
    }

    if (p === 'monthly') {
      // last 30 days
      const start = new Date(today.getTime() - 29 * 24 * 60 * 60 * 1000);
      const rows = await this.attendanceRepository
        .createQueryBuilder('a')
        .select(`TO_CHAR("a"."createdAt"::date, 'YYYY-MM-DD')`, 'day')
        .addSelect('COUNT(*)', 'total')
        .addSelect(
          `SUM(CASE WHEN LOWER("a"."status") IN ('on time','late') THEN 1 ELSE 0 END)`,
          'present',
        )
        .where('a.createdAt >= :start', { start: start.toISOString() })
        .groupBy('day')
        .orderBy('day', 'ASC')
        .getRawMany<{ day: string; total: string; present: string }>();

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

    // yearly: 12 months
    const start = new Date(today);
    start.setMonth(start.getMonth() - 11);
    start.setDate(1);
    const rows = await this.attendanceRepository
      .createQueryBuilder('a')
      .select(`TO_CHAR(DATE_TRUNC('month', "a"."createdAt"), 'YYYY-MM')`, 'ym')
      .addSelect('COUNT(*)', 'total')
      .addSelect(
        `SUM(CASE WHEN LOWER("a"."status") IN ('on time','late') THEN 1 ELSE 0 END)`,
        'present',
      )
      .where('a.createdAt >= :start', { start: start.toISOString() })
      .groupBy('ym')
      .orderBy('ym', 'ASC')
      .getRawMany<{ ym: string; total: string; present: string }>();

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

  async getFinanceTrend(period?: string) {
    const p = this.normalizePeriod(period);
    const now = new Date();
    const today = this.startOfDay(now);
    let start: Date;
    let length: number;
    let format: string;
    let interval: 'day' | 'month';

    if (p === 'weekly') {
      start = new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000);
      length = 7;
      format = 'YYYY-MM-DD';
      interval = 'day';
    } else if (p === 'monthly') {
      start = new Date(today.getTime() - 29 * 24 * 60 * 60 * 1000);
      length = 30;
      format = 'YYYY-MM-DD';
      interval = 'day';
    } else if (p === 'quarterly') {
      start = new Date(today.getTime() - 89 * 24 * 60 * 60 * 1000);
      length = 90;
      format = 'YYYY-MM-DD';
      interval = 'day';
    } else {
      // yearly
      start = new Date(today);
      start.setMonth(start.getMonth() - 11);
      start.setDate(1);
      length = 12;
      format = 'YYYY-MM';
      interval = 'month';
    }

    const incomeRows = await this.orderRepository.manager
      .getRepository('Income')
      .createQueryBuilder('i')
      .select(`TO_CHAR(DATE_TRUNC('${interval}', "i"."createdAt"), '${format}')`, 'key')
      .addSelect(`COALESCE(SUM("i"."amount"), 0)`, 'amount')
      .where('i.createdAt >= :start', { start: start.toISOString() })
      .groupBy('key')
      .getRawMany<{ key: string; amount: string }>();

    const payrollRows = await this.payrollRepository
      .createQueryBuilder('p')
      .select(`TO_CHAR(DATE_TRUNC('${interval}', "p"."createdAt"), '${format}')`, 'key')
      .addSelect(`COALESCE(SUM("p"."netPay"), 0)`, 'amount')
      .where('p.createdAt >= :start', { start: start.toISOString() })
      .groupBy('key')
      .getRawMany<{ key: string; amount: string }>();

    const expenseRows = await this.expenseRepository
      .createQueryBuilder('e')
      .select(`TO_CHAR(DATE_TRUNC('${interval}', "e"."createdAt"), '${format}')`, 'key')
      .addSelect(`COALESCE(SUM("e"."amount"), 0)`, 'amount')
      .where('e.createdAt >= :start', { start: start.toISOString() })
      .andWhere('e.status = :status', { status: ExpenseStatus.APPROVED })
      .groupBy('key')
      .getRawMany<{ key: string; amount: string }>();

    const incomeMap = new Map(incomeRows.map((r) => [r.key, Number(r.amount)]));
    const payrollMap = new Map(payrollRows.map((r) => [r.key, Number(r.amount)]));
    const expenseMap = new Map(expenseRows.map((r) => [r.key, Number(r.amount)]));

    const data = Array.from({ length }, (_, i) => {
      const d = new Date(start);
      if (interval === 'day') {
        d.setDate(start.getDate() + i);
      } else {
        d.setMonth(start.getMonth() + i);
      }

      const key = interval === 'day' 
        ? d.toISOString().slice(0, 10) 
        : `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      
      const income = incomeMap.get(key) || 0;
      const expense = (payrollMap.get(key) || 0) + (expenseMap.get(key) || 0);
      const profit = income - expense;

      let label: string;
      if (p === 'weekly') label = d.toLocaleDateString('en-US', { weekday: 'short' });
      else if (p === 'monthly') label = String(d.getDate()).padStart(2, '0');
      else if (p === 'quarterly') label = String(i + 1).padStart(2, '0');
      else label = d.toLocaleDateString('en-US', { month: 'short' });

      return { label, income, expense, profit };
    });

    return { period: p.charAt(0).toUpperCase() + p.slice(1), data };
  }
}

