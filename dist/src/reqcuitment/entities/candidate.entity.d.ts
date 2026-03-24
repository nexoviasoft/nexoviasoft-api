import { JobPosting } from './job-posting.entity';
import { Interview } from './interview.entity';
export declare class Candidate {
    id: number;
    name: string;
    photo?: string;
    email: string;
    phone: string;
    position: string;
    stage: string;
    appliedDate: Date;
    experience: string;
    skills: string[];
    jobPosting: JobPosting;
    jobPostingId: number;
    interviews: Interview[];
    createdAt: Date;
    updatedAt: Date;
}
