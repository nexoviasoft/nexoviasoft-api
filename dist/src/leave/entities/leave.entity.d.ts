import { OurTeam } from '../../setting/home/our-team/entities/our-team.entity';
export declare class Leave {
    id: number;
    team: OurTeam;
    teamId: number;
    type: string;
    startDate: Date;
    endDate: Date;
    days: number;
    reason: string;
    status: string;
    appliedOn: Date;
    createdAt: Date;
    updatedAt: Date;
}
