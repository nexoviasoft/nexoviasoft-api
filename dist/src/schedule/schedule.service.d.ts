import { Repository } from 'typeorm';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { Schedule } from './entities/schedule.entity';
import { EmailService } from '../common/services/email.service';
export declare class ScheduleService {
    private readonly scheduleRepository;
    private readonly emailService;
    private readonly logger;
    constructor(scheduleRepository: Repository<Schedule>, emailService: EmailService);
    create(createScheduleDto: CreateScheduleDto): Promise<Schedule>;
    private mapSchedule;
    findAll(user: {
        id?: number;
        role?: string;
        departmentId?: number;
    }, opts?: {
        weekStartDate?: string;
        weekEndDate?: string;
    }): Promise<{
        id: number;
        teamId: number;
        team: {
            id: number;
            name: string;
            role: string;
            avatar: string;
            email: string;
            departmentId: number;
        };
        shifts: {
            day?: string;
            startTime?: string;
            endTime?: string;
            time?: string;
            label?: string;
            type?: string;
        }[];
        weekStartDate: Date;
        weekEndDate: Date;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        teamId: number;
        team: {
            id: number;
            name: string;
            role: string;
            avatar: string;
            email: string;
            departmentId: number;
        };
        shifts: {
            day?: string;
            startTime?: string;
            endTime?: string;
            time?: string;
            label?: string;
            type?: string;
        }[];
        weekStartDate: Date;
        weekEndDate: Date;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: number, updateScheduleDto: UpdateScheduleDto): Promise<Schedule>;
    remove(id: number): Promise<Schedule>;
}
