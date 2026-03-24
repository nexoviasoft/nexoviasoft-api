import { Project } from './project.entity';
export declare class ProjectComment {
    id: number;
    project: Project;
    projectId: number;
    author: string;
    content: string;
    mentions: string[];
    createdAt: Date;
}
