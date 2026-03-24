import { HttpStatus } from '@nestjs/common';
import { CustomerReviewService } from './customer-review.service';
import { CreateCustomerReviewDto } from './dto/create-customer-review.dto';
import { UpdateCustomerReviewDto } from './dto/update-customer-review.dto';
export declare class CustomerReviewController {
    private readonly customerReviewService;
    constructor(customerReviewService: CustomerReviewService);
    create(createCustomerReviewDto: CreateCustomerReviewDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/customer-review.entity").CustomerReview;
    }>;
    findAll(): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/customer-review.entity").CustomerReview[];
    }>;
    findOne(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/customer-review.entity").CustomerReview;
    }>;
    approve(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/customer-review.entity").CustomerReview;
    }>;
    update(id: string, updateCustomerReviewDto: UpdateCustomerReviewDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/customer-review.entity").CustomerReview;
    }>;
    remove(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
