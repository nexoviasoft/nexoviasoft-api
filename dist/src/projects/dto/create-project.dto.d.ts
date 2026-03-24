export declare class CreateProjectDto {
    name: string;
    description?: string;
    status?: string;
    progress?: number;
    applicationType?: string;
    platform?: string;
    departmentId?: number;
    projectLeadId?: number;
    teamMemberIds?: number[];
    dueDate?: string;
    tasksCompleted?: number;
    totalTasks?: number;
    template?: string;
}
