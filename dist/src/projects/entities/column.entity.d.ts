import { Project } from './project.entity';
export declare class ProjectColumn {
    id: number;
    project: Project;
    projectId: number;
    title: string;
    order: number;
    isCustom: boolean;
    createdAt: Date;
    updatedAt: Date;
}
