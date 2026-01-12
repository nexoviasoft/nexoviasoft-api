import { Test, TestingModule } from '@nestjs/testing';
import { CustomerReviewController } from './customer-review.controller';
import { CustomerReviewService } from './customer-review.service';

describe('CustomerReviewController', () => {
  let controller: CustomerReviewController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerReviewController],
      providers: [CustomerReviewService],
    }).compile();

    controller = module.get<CustomerReviewController>(CustomerReviewController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
