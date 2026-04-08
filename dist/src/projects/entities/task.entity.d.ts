import { Project } from './project.entity';
import { TaskComment } from './task-comment.entity';
export declare class Task {
    id: number;
    project: Project;
    projectId: number;
    title: string;
    description: string;
    priority: string;
    status: string;
    columnId: string;
    order: number;
    dueDate: Date;
    team: string;
    assignees: string[];
    createdAt: Date;
    updatedAt: Date;
    comments: TaskComment[];
}
