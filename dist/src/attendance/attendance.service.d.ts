import { Repository } from 'typeorm';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { Attendance } from './entities/attendance.entity';
export declare class AttendanceService {
    private readonly attendanceRepository;
    constructor(attendanceRepository: Repository<Attendance>);
    create(createAttendanceDto: CreateAttendanceDto): Promise<Attendance>;
    findAll(): Promise<{
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
    }[]>;
    findMine(teamId: number): Promise<{
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
    }[]>;
    findOne(id: number): Promise<{
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
    }>;
    update(id: number, updateAttendanceDto: UpdateAttendanceDto): Promise<Attendance>;
    remove(id: number): Promise<Attendance>;
    getStatusStats(): Promise<{
        total: number;
        onTime: number;
        late: number;
        absent: number;
        onTimePercentage: string;
        latePercentage: string;
        absentPercentage: string;
    }>;
    getMyStatusStats(teamId: number): Promise<{
        total: number;
        onTime: number;
        late: number;
        absent: number;
        onTimePercentage: string;
        latePercentage: string;
        absentPercentage: string;
    }>;
}
