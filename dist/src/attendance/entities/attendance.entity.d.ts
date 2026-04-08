import { OurTeam } from '../../setting/home/our-team/entities/our-team.entity';
export declare class Attendance {
    id: number;
    checkIn: string;
    checkOut: string;
    workHours: string;
    status: string;
    approved: boolean;
    team: OurTeam;
    teamId: number;
    createdAt: Date;
    updatedAt: Date;
}
