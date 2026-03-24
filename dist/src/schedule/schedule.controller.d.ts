import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
export declare class ScheduleController {
    private readonly scheduleService;
    constructor(scheduleService: ScheduleService);
    create(createScheduleDto: CreateScheduleDto): Promise<import("./entities/schedule.entity").Schedule>;
    findAll(req: any, weekStartDate?: string, weekEndDate?: string): Promise<{
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
    findOne(id: string): Promise<{
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
    update(id: string, updateScheduleDto: UpdateScheduleDto): Promise<import("./entities/schedule.entity").Schedule>;
    remove(id: string): Promise<import("./entities/schedule.entity").Schedule>;
}
