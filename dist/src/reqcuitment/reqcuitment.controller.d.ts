import { HttpStatus } from '@nestjs/common';
import { ReqcuitmentService } from './reqcuitment.service';
import { CreateJobPostingDto } from './dto/create-job-posting.dto';
import { UpdateJobPostingDto } from './dto/update-job-posting.dto';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { CreateInterviewDto } from './dto/create-interview.dto';
import { UpdateInterviewDto } from './dto/update-interview.dto';
export declare class ReqcuitmentController {
    private readonly reqcuitmentService;
    constructor(reqcuitmentService: ReqcuitmentService);
    createJobPosting(createJobPostingDto: CreateJobPostingDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/job-posting.entity").JobPosting;
    }>;
    findAllJobPostings(): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/job-posting.entity").JobPosting[];
    }>;
    findOneJobPosting(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/job-posting.entity").JobPosting;
    }>;
    updateJobPosting(id: string, updateJobPostingDto: UpdateJobPostingDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/job-posting.entity").JobPosting;
    }>;
    removeJobPosting(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
    createCandidate(createCandidateDto: CreateCandidateDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/candidate.entity").Candidate;
    }>;
    findAllCandidates(): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/candidate.entity").Candidate[];
    }>;
    findOneCandidate(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/candidate.entity").Candidate;
    }>;
    updateCandidate(id: string, updateCandidateDto: UpdateCandidateDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/candidate.entity").Candidate;
    }>;
    removeCandidate(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
    createInterview(createInterviewDto: CreateInterviewDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/interview.entity").Interview;
    }>;
    createBulkInterviews(body: {
        interview: CreateInterviewDto;
        candidateIds: number[];
    }): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/interview.entity").Interview[];
    }>;
    findAllInterviews(): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/interview.entity").Interview[];
    }>;
    findOneInterview(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/interview.entity").Interview;
    }>;
    updateInterview(id: string, updateInterviewDto: UpdateInterviewDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/interview.entity").Interview;
    }>;
    removeInterview(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
