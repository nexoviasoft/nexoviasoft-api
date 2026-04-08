import { OurTeam } from '../../setting/home/our-team/entities/our-team.entity';
export declare class Schedule {
    id: number;
    team: OurTeam;
    teamId: number;
    shifts: Array<{
        day?: string;
        startTime?: string;
        endTime?: string;
        time?: string;
        label?: string;
        type?: string;
    } | null>;
    weekStartDate: Date;
    weekEndDate: Date;
    createdAt: Date;
    updatedAt: Date;
}
