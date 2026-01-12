import { Injectable } from '@nestjs/common';
import { CreateCustomerReviewDto } from './dto/create-customer-review.dto';
import { UpdateCustomerReviewDto } from './dto/update-customer-review.dto';

@Injectable()
export class CustomerReviewService {
  create(createCustomerReviewDto: CreateCustomerReviewDto) {
    return 'This action adds a new customerReview';
  }

  findAll() {
    return `This action returns all customerReview`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customerReview`;
  }

  update(id: number, updateCustomerReviewDto: UpdateCustomerReviewDto) {
    return `This action updates a #${id} customerReview`;
  }

  remove(id: number) {
    return `This action removes a #${id} customerReview`;
  }
}
