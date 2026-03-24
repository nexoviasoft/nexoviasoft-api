export declare class CreateCustomerReviewDto {
    client_id?: number;
    case_study_id?: number;
    rating: number;
    review_title: string;
    review_message: string;
    review_type?: string;
    is_featured?: boolean;
    status?: string;
}
