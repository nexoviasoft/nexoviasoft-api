import { Candidate } from './candidate.entity';
export declare class Interview {
    id: number;
    candidate: string;
    position: string;
    date: Date;
    time: string;
    interviewer: string;
    type: string;
    status: string;
    meetLink?: string;
    candidateEntity: Candidate;
    candidateId: number;
    createdAt: Date;
    updatedAt: Date;
}
