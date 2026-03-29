import { Repository } from 'typeorm';
import { CreateTaskCommentDto } from './dto/create-task-comment.dto';
import { TaskComment } from './entities/task-comment.entity';
import { Task } from './entities/task.entity';
import { Project } from './entities/project.entity';
import { EmailService } from '../common/services/email.service';
export declare class TaskCommentsService {
    private readonly commentRepository;
    private readonly taskRepository;
    private readonly projectRepository;
    private readonly emailService;
    constructor(commentRepository: Repository<TaskComment>, taskRepository: Repository<Task>, projectRepository: Repository<Project>, emailService: EmailService);
    create(createTaskCommentDto: CreateTaskCommentDto): Promise<{
        id: number;
        taskId: number;
        author: string;
        content: string;
        mentions: string[];
        parentId: number;
        createdAt: Date;
    }>;
    private sendCommentNotifications;
    findAll(taskId: number): Promise<{
        id: number;
        taskId: number;
        author: string;
        content: string;
        mentions: string[];
        parentId: number;
        createdAt: Date;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        taskId: number;
        author: string;
        content: string;
        mentions: string[];
        parentId: number;
        createdAt: Date;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
    private formatCommentResponse;
}
