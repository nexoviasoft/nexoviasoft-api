import { HttpStatus } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
export declare class AttendanceController {
    private readonly attendanceService;
    constructor(attendanceService: AttendanceService);
    create(req: any, createAttendanceDto: CreateAttendanceDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/attendance.entity").Attendance;
    }>;
    findAll(): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            id: number;
            checkIn: string;
            checkOut: string;
            workHours: string;
            status: string;
            approved: boolean;
            teamId: number;
            team: {
                id: number;
                name: string;
                role: string;
                avatar: string;
            };
        }[];
    }>;
    findMine(req: any): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            id: number;
            checkIn: string;
            checkOut: string;
            workHours: string;
            status: string;
            approved: boolean;
            teamId: number;
            team: {
                id: number;
                name: string;
                role: string;
                avatar: string;
            };
        }[];
    }>;
    getStatusStats(): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            total: number;
            onTime: number;
            late: number;
            absent: number;
            onTimePercentage: string;
            latePercentage: string;
            absentPercentage: string;
        };
    }>;
    getMyStatusStats(req: any): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            total: number;
            onTime: number;
            late: number;
            absent: number;
            onTimePercentage: string;
            latePercentage: string;
            absentPercentage: string;
        };
    }>;
    findOne(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data?: undefined;
    } | {
        statusCode: HttpStatus;
        message: string;
        data: {
            id: number;
            checkIn: string;
            checkOut: string;
            workHours: string;
            status: string;
            approved: boolean;
            teamId: number;
            team: {
                id: number;
                name: string;
                role: string;
                avatar: string;
            };
        };
    }>;
    update(id: string, updateAttendanceDto: UpdateAttendanceDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/attendance.entity").Attendance;
    }>;
    approve(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/attendance.entity").Attendance;
    }>;
    remove(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
