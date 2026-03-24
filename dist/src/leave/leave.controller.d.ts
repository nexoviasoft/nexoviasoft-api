import { LeaveService } from './leave.service';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { UpdateLeaveDto } from './dto/update-leave.dto';
export declare class LeaveController {
    private readonly leaveService;
    constructor(leaveService: LeaveService);
    create(createLeaveDto: CreateLeaveDto, req: any): Promise<import("./entities/leave.entity").Leave>;
    findAll(req: any): Promise<import("./entities/leave.entity").Leave[]>;
    getStatistics(req: any): Promise<{
        byType: {
            type: string;
            used: number;
            pending: number;
            rejected: number;
            total: number;
            remaining: number;
            trend: string;
        }[];
        statusCounts: {
            pending: number;
            approved: number;
            rejected: number;
            total: number;
        };
    }>;
    getStatisticsByTeam(teamId: string, req: any): Promise<{
        byType: {
            type: string;
            used: number;
            pending: number;
            rejected: number;
            total: number;
            remaining: number;
            trend: string;
        }[];
        statusCounts: {
            pending: number;
            approved: number;
            rejected: number;
            total: number;
        };
    }>;
    findOne(id: string, req: any): Promise<import("./entities/leave.entity").Leave>;
    update(id: string, updateLeaveDto: UpdateLeaveDto, req: any): Promise<import("./entities/leave.entity").Leave>;
    approve(id: string, req: any): Promise<import("./entities/leave.entity").Leave>;
    reject(id: string, body?: {
        rejectionReason?: string;
    }, req?: any): Promise<import("./entities/leave.entity").Leave>;
    remove(id: string, req: any): Promise<{
        message: string;
    }>;
}
