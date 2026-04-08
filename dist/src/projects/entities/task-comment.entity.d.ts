import { Task } from './task.entity';
export declare class TaskComment {
    id: number;
    task: Task;
    taskId: number;
    author: string;
    content: string;
    mentions: string[];
    parentId: number;
    createdAt: Date;
}
