import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { OurTeam } from '../setting/home/our-team/entities/our-team.entity';
export declare class ProjectsService {
    private readonly projectRepository;
    private readonly teamRepository;
    constructor(projectRepository: Repository<Project>, teamRepository: Repository<OurTeam>);
    create(createProjectDto: CreateProjectDto): Promise<{
        id: number;
        name: string;
        description: string;
        status: string;
        progress: number;
        applicationType: string;
        platform: string;
        department: {
            id: number;
            name: string;
            description: string;
        };
        departmentId: number;
        projectLead: {
            id: number;
            firstName: string;
            lastName: string;
            name: string;
            email: string;
            position: string;
            avatar: string;
        };
        projectLeadId: number;
        team: {
            id: number;
            name: string;
            avatar: string;
            email: string;
            position: string;
        }[];
        teamMembers: {
            id: number;
            firstName: string;
            lastName: string;
            email: string;
            position: string;
            avatar: string;
        }[];
        dueDate: string;
        tasksCompleted: number;
        totalTasks: number;
        template: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<{
        id: number;
        name: string;
        description: string;
        status: string;
        progress: number;
        applicationType: string;
        platform: string;
        department: {
            id: number;
            name: string;
            description: string;
        };
        departmentId: number;
        projectLead: {
            id: number;
            firstName: string;
            lastName: string;
            name: string;
            email: string;
            position: string;
            avatar: string;
        };
        projectLeadId: number;
        team: {
            id: number;
            name: string;
            avatar: string;
            email: string;
            position: string;
        }[];
        teamMembers: {
            id: number;
            firstName: string;
            lastName: string;
            email: string;
            position: string;
            avatar: string;
        }[];
        dueDate: string;
        tasksCompleted: number;
        totalTasks: number;
        template: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        name: string;
        description: string;
        status: string;
        progress: number;
        applicationType: string;
        platform: string;
        department: {
            id: number;
            name: string;
            description: string;
        };
        departmentId: number;
        projectLead: {
            id: number;
            firstName: string;
            lastName: string;
            name: string;
            email: string;
            position: string;
            avatar: string;
        };
        projectLeadId: number;
        team: {
            id: number;
            name: string;
            avatar: string;
            email: string;
            position: string;
        }[];
        teamMembers: {
            id: number;
            firstName: string;
            lastName: string;
            email: string;
            position: string;
            avatar: string;
        }[];
        dueDate: string;
        tasksCompleted: number;
        totalTasks: number;
        template: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: number, updateProjectDto: UpdateProjectDto): Promise<{
        id: number;
        name: string;
        description: string;
        status: string;
        progress: number;
        applicationType: string;
        platform: string;
        department: {
            id: number;
            name: string;
            description: string;
        };
        departmentId: number;
        projectLead: {
            id: number;
            firstName: string;
            lastName: string;
            name: string;
            email: string;
            position: string;
            avatar: string;
        };
        projectLeadId: number;
        team: {
            id: number;
            name: string;
            avatar: string;
            email: string;
            position: string;
        }[];
        teamMembers: {
            id: number;
            firstName: string;
            lastName: string;
            email: string;
            position: string;
            avatar: string;
        }[];
        dueDate: string;
        tasksCompleted: number;
        totalTasks: number;
        template: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
    private formatProjectResponse;
}
