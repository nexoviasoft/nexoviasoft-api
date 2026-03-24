import { CaseStudy } from 'src/setting/home/case-studies/entities/case-study.entity';
export declare class Category {
    id: number;
    name: string;
    description: string;
    caseStudies: CaseStudy[];
    status: string;
}
