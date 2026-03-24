import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { MoveTaskDto } from './dto/move-task.dto';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
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
    findAll(projectId: string): Promise<{
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
}
