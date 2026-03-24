import { Candidate } from './candidate.entity';
import { Department } from '../../setting/department/entities/department.entity';
export declare class JobPosting {
    id: number;
    title: string;
    department: string;
    departmentEntity?: Department;
    departmentId?: number;
    type: string;
    location: string;
    status: string;
    applicants: number;
    postedDate: Date;
    description: string;
    imageUrl?: string;
    candidates: Candidate[];
    createdAt: Date;
    updatedAt: Date;
}
