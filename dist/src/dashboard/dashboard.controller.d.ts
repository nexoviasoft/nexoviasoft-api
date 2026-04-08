import { HttpStatus } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    summary(req: any): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
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
        };
    }>;
    attendanceTrend(period?: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            period: string;
            data: {
                label: string;
                presence: number;
            }[];
        };
    }>;
    financeTrend(period?: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            period: string;
            data: {
                label: string;
                income: number;
                expense: number;
                profit: number;
            }[];
        };
    }>;
    activity(tab?: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
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
        };
    }>;
}
