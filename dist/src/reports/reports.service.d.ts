import { Repository } from 'typeorm';
import { Order } from '../order/entities/order.entity';
import { Project } from '../projects/entities/project.entity';
import { Task } from '../projects/entities/task.entity';
import { Attendance } from '../attendance/entities/attendance.entity';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
export declare class ReportsService {
    private readonly orderRepository;
    private readonly projectRepository;
    private readonly taskRepository;
    private readonly attendanceRepository;
    constructor(orderRepository: Repository<Order>, projectRepository: Repository<Project>, taskRepository: Repository<Task>, attendanceRepository: Repository<Attendance>);
    getDashboard(params?: {
        from?: string;
        to?: string;
    }): Promise<{
        range: {
            from: string;
            to: string;
        };
        stats: {
            label: string;
            value: string;
            subtext: string;
            trend: string;
        }[];
        revenueTrend: {
            name: string;
            pv: number;
        }[];
        taskDistribution: {
            name: string;
            value: number;
        }[];
    }>;
    create(createReportDto: CreateReportDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateReportDto: UpdateReportDto): string;
    remove(id: number): string;
    private parseDateOrThrow;
    private toNumber;
    private formatCurrency;
    private formatSignedPercent;
    private parseWorkHoursToMinutes;
    private groupIncomesByMonth;
    private buildTaskDistribution;
}
