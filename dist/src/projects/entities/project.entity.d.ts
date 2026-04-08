import { Department } from '../../setting/department/entities/department.entity';
import { OurTeam } from '../../setting/home/our-team/entities/our-team.entity';
export declare class Project {
    id: number;
    name: string;
    description: string;
    status: string;
    progress: number;
    applicationType: string;
    platform: string;
    department: Department;
    departmentId: number;
    projectLead: OurTeam;
    projectLeadId: number;
    teamMembers: OurTeam[];
    dueDate: Date;
    tasksCompleted: number;
    totalTasks: number;
    template: string;
    createdAt: Date;
    updatedAt: Date;
}
