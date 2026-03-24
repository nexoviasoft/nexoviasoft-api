import { Repository } from 'typeorm';
import { CreateTaskCommentDto } from './dto/create-task-comment.dto';
import { TaskComment } from './entities/task-comment.entity';
import { Task } from './entities/task.entity';
export declare class TaskCommentsService {
    private readonly commentRepository;
    private readonly taskRepository;
    constructor(commentRepository: Repository<TaskComment>, taskRepository: Repository<Task>);
    create(createTaskCommentDto: CreateTaskCommentDto): Promise<{
        id: number;
        taskId: number;
        author: string;
        content: string;
        mentions: string[];
        createdAt: Date;
    }>;
    findAll(taskId: number): Promise<{
        id: number;
        taskId: number;
        author: string;
        content: string;
        mentions: string[];
        createdAt: Date;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        taskId: number;
        author: string;
        content: string;
        mentions: string[];
        createdAt: Date;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
    private formatCommentResponse;
}
