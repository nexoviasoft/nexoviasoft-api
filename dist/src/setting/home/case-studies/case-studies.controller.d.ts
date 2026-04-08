import { HttpStatus } from '@nestjs/common';
import { CaseStudiesService } from './case-studies.service';
import { CreateCaseStudyDto } from './dto/create-case-study.dto';
import { UpdateCaseStudyDto } from './dto/update-case-study.dto';
export declare class CaseStudiesController {
    private readonly caseStudiesService;
    constructor(caseStudiesService: CaseStudiesService);
    create(createCaseStudyDto: CreateCaseStudyDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/case-study.entity").CaseStudy;
    }>;
    findAll(): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/case-study.entity").CaseStudy[];
    }>;
    findOne(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/case-study.entity").CaseStudy;
    }>;
    update(id: string, updateCaseStudyDto: UpdateCaseStudyDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/case-study.entity").CaseStudy;
    }>;
    remove(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
