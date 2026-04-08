export declare class CreateTaskDto {
    projectId: number;
    title: string;
    description?: string;
    priority?: string;
    status?: string;
    columnId?: string;
    order?: number;
    dueDate?: string;
    team?: string;
    assignees?: string[];
}
