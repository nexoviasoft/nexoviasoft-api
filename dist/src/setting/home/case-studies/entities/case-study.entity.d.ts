import { Category } from 'src/setting/category/entities/category.entity';
import { OurClient } from 'src/setting/our-client/entities/our-client.entity';
export declare class CaseStudy {
    id: number;
    title: string;
    description: string;
    badge: boolean;
    features: string[];
    categories: Category[];
    imageUrl: string;
    caseStudyUrl: string;
    liveUrl: string;
    status: string;
    client: OurClient;
    clientId: number;
    industry: string;
    problem_statement: string;
    solution_overview: string;
    results: string;
    duration: string;
    projectimage: string[];
}
