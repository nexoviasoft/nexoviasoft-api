import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerReviewService } from './customer-review.service';
import { CustomerReviewController } from './customer-review.controller';
import { CustomerReview } from './entities/customer-review.entity';
import { OurClient } from 'src/setting/our-client/entities/our-client.entity';
import { CaseStudy } from 'src/setting/home/case-studies/entities/case-study.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CustomerReview, OurClient, CaseStudy]),
  ],
  controllers: [CustomerReviewController],
  providers: [CustomerReviewService],
})
export class CustomerReviewModule {}
