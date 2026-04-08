import { OurClient } from 'src/setting/our-client/entities/our-client.entity';
import { CaseStudy } from 'src/setting/home/case-studies/entities/case-study.entity';
export declare class CustomerReview {
    id: number;
    client: OurClient;
    client_id: number;
    caseStudy: CaseStudy;
    case_study_id: number;
    rating: number;
    review_title: string;
    review_message: string;
    review_type: string;
    is_featured: boolean;
    status: string;
    created_at: Date;
    updated_at: Date;
}
