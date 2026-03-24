import { Repository } from 'typeorm';
import { CreateCustomerReviewDto } from './dto/create-customer-review.dto';
import { UpdateCustomerReviewDto } from './dto/update-customer-review.dto';
import { CustomerReview } from './entities/customer-review.entity';
import { OurClient } from 'src/setting/our-client/entities/our-client.entity';
import { CaseStudy } from 'src/setting/home/case-studies/entities/case-study.entity';
export declare class CustomerReviewService {
    private readonly customerReviewRepository;
    private readonly ourClientRepository;
    private readonly caseStudyRepository;
    constructor(customerReviewRepository: Repository<CustomerReview>, ourClientRepository: Repository<OurClient>, caseStudyRepository: Repository<CaseStudy>);
    create(createCustomerReviewDto: CreateCustomerReviewDto): Promise<CustomerReview>;
    findAll(): Promise<CustomerReview[]>;
    findOne(id: number): Promise<CustomerReview>;
    update(id: number, updateCustomerReviewDto: UpdateCustomerReviewDto): Promise<CustomerReview>;
    approve(id: number): Promise<CustomerReview>;
    remove(id: number): Promise<CustomerReview>;
}
