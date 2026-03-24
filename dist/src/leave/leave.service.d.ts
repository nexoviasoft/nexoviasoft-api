import { Repository } from 'typeorm';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { UpdateLeaveDto } from './dto/update-leave.dto';
import { Leave } from './entities/leave.entity';
import { OurTeam } from '../setting/home/our-team/entities/our-team.entity';
import { EmailService } from '../common/services/email.service';
export declare class LeaveService {
    private readonly leaveRepository;
    private readonly ourTeamRepository;
    private readonly emailService;
    private readonly logger;
    constructor(leaveRepository: Repository<Leave>, ourTeamRepository: Repository<OurTeam>, emailService: EmailService);
    create(createLeaveDto: CreateLeaveDto): Promise<Leave>;
    findAll(): Promise<Leave[]>;
    findByTeamId(teamId: number): Promise<Leave[]>;
    findOne(id: number): Promise<Leave>;
    findOneByTeamId(id: number, teamId: number): Promise<Leave>;
    update(id: number, updateLeaveDto: UpdateLeaveDto): Promise<Leave>;
    updateByTeamId(id: number, teamId: number, updateLeaveDto: UpdateLeaveDto): Promise<Leave>;
    remove(id: number): Promise<{
        message: string;
    }>;
    removeByTeamId(id: number, teamId: number): Promise<{
        message: string;
    }>;
    approve(id: number): Promise<Leave>;
    reject(id: number, rejectionReason?: string): Promise<Leave>;
    getStatistics(teamId?: number): Promise<{
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
}
