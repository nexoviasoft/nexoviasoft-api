import { TaskCommentsService } from './task-comments.service';
import { CreateTaskCommentDto } from './dto/create-task-comment.dto';
export declare class TaskCommentsController {
    private readonly taskCommentsService;
    constructor(taskCommentsService: TaskCommentsService);
    create(createTaskCommentDto: CreateTaskCommentDto): Promise<{
        id: number;
        taskId: number;
        author: string;
        content: string;
        mentions: string[];
        parentId: number;
        createdAt: Date;
    }>;
    findAll(taskId: string): Promise<{
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
}
