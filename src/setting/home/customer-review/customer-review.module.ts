import { Module } from '@nestjs/common';
import { CustomerReviewService } from './customer-review.service';
import { CustomerReviewController } from './customer-review.controller';

@Module({
  controllers: [CustomerReviewController],
  providers: [CustomerReviewService],
})
export class CustomerReviewModule {}
