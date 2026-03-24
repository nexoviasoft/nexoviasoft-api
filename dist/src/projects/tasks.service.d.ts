import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { MoveTaskDto } from './dto/move-task.dto';
import { Task } from './entities/task.entity';
import { Project } from './entities/project.entity';
import { OurTeam } from '../setting/home/our-team/entities/our-team.entity';
import { EmailService } from '../common/services/email.service';
export declare class TasksService {
    private readonly taskRepository;
    private readonly projectRepository;
    private readonly ourTeamRepository;
    private readonly emailService;
    private readonly logger;
    constructor(taskRepository: Repository<Task>, projectRepository: Repository<Project>, ourTeamRepository: Repository<OurTeam>, emailService: EmailService);
    create(createTaskDto: CreateTaskDto): Promise<{
        id: number;
        projectId: number;
        title: string;
        description: string;
        priority: string;
        status: string;
        columnId: string;
        order: number;
        dueDate: string;
        team: string;
        assignees: string[];
        comments: {
            id: number;
            author: string;
            content: string;
            mentions: string[];
            createdAt: string;
        }[];
        createdAt: string;
        updatedAt: string;
    }>;
    findAll(projectId: number): Promise<{
        id: number;
        projectId: number;
        title: string;
        description: string;
        priority: string;
        status: string;
        columnId: string;
        order: number;
        dueDate: string;
        team: string;
        assignees: string[];
        comments: {
            id: number;
            author: string;
            content: string;
            mentions: string[];
            createdAt: string;
        }[];
        createdAt: string;
        updatedAt: string;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        projectId: number;
        title: string;
        description: string;
        priority: string;
        status: string;
        columnId: string;
        order: number;
        dueDate: string;
        team: string;
        assignees: string[];
        comments: {
            id: number;
            author: string;
            content: string;
            mentions: string[];
            createdAt: string;
        }[];
        createdAt: string;
        updatedAt: string;
    }>;
    update(id: number, updateTaskDto: UpdateTaskDto): Promise<{
        id: number;
        projectId: number;
        title: string;
        description: string;
        priority: string;
        status: string;
        columnId: string;
        order: number;
        dueDate: string;
        team: string;
        assignees: string[];
        comments: {
            id: number;
            author: string;
            content: string;
            mentions: string[];
            createdAt: string;
        }[];
        createdAt: string;
        updatedAt: string;
    }>;
    moveTask(moveTaskDto: MoveTaskDto): Promise<{
        id: number;
        projectId: number;
        title: string;
        description: string;
        priority: string;
        status: string;
        columnId: string;
        order: number;
        dueDate: string;
        team: string;
        assignees: string[];
        comments: {
            id: number;
            author: string;
            content: string;
            mentions: string[];
            createdAt: string;
        }[];
        createdAt: string;
        updatedAt: string;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
    private updateProjectTaskCounts;
    private formatTaskResponse;
    private findTeamMemberByInitials;
    private sendAssignmentEmails;
}
