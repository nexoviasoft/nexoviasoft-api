import { Repository } from 'typeorm';
import { Attendance } from '../attendance/entities/attendance.entity';
import { Leave } from '../leave/entities/leave.entity';
import { Meeting } from '../meeting/entities/meeting.entity';
import { Order } from '../order/entities/order.entity';
import { Payroll } from '../payroll/entities/payroll.entity';
import { Schedule } from '../schedule/entities/schedule.entity';
import { OurClient } from '../setting/our-client/entities/our-client.entity';
import { Expense } from '../expense/entities/expense.entity';
export declare class DashboardService {
    private readonly clientRepository;
    private readonly orderRepository;
    private readonly payrollRepository;
    private readonly attendanceRepository;
    private readonly leaveRepository;
    private readonly meetingRepository;
    private readonly scheduleRepository;
    private readonly expenseRepository;
    constructor(clientRepository: Repository<OurClient>, orderRepository: Repository<Order>, payrollRepository: Repository<Payroll>, attendanceRepository: Repository<Attendance>, leaveRepository: Repository<Leave>, meetingRepository: Repository<Meeting>, scheduleRepository: Repository<Schedule>, expenseRepository: Repository<Expense>);
    getActivity(tab?: string): Promise<{
        tab: string;
        items: {
            id: number;
            type: string;
            startDate: Date;
            endDate: Date;
            days: number;
            status: string;
            createdAt: Date;
            team: {
                id: number;
                name: string;
                role: string;
                avatar: string;
            };
        }[];
    } | {
        tab: string;
        items: {
            id: any;
            orderId: any;
            service: any;
            amount: number;
            status: string;
            createdAt: any;
            client: {
                id: any;
                name: any;
            };
        }[];
    } | {
        tab: string;
        items: {
            id: number;
            checkIn: string;
            checkOut: string;
            workHours: string;
            status: string;
            createdAt: Date;
            team: {
                id: number;
                name: string;
                role: string;
                avatar: string;
            };
        }[];
    }>;
    private normalizePeriod;
    private startOfDay;
    getSummary(_user?: {
        id?: number;
        role?: string;
    }): Promise<{
        customers: {
            total: number;
            active: number;
        };
        finance: {
            revenueTotal: number;
            expenseTotal: number;
            profitTotal: number;
        };
        attendance: {
            total: number;
            onTime: number;
            late: number;
            absent: number;
            onTimePercentage: string;
            latePercentage: string;
            absentPercentage: string;
        };
        nextAgenda: {
            id: number;
            topic: any;
            dateTime: any;
            meetingLink: any;
            status: any;
        };
        recentAttendance: {
            id: number;
            checkIn: string;
            checkOut: string;
            workHours: string;
            status: string;
            createdAt: Date;
            team: {
                id: number;
                name: string;
                role: string;
                avatar: string;
            };
        }[];
        schedules: {
            id: number;
            weekStartDate: any;
            weekEndDate: any;
            team: {
                id: any;
                name: string;
                role: any;
                avatar: any;
            };
        }[];
    }>;
    getAttendanceTrend(period?: string): Promise<{
        period: string;
        data: {
            label: string;
            presence: number;
        }[];
    }>;
    getFinanceTrend(period?: string): Promise<{
        period: string;
        data: {
            label: string;
            income: number;
            expense: number;
            profit: number;
        }[];
    }>;
}
