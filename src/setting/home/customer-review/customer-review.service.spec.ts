import { Test, TestingModule } from '@nestjs/testing';
import { CustomerReviewService } from './customer-review.service';

describe('CustomerReviewService', () => {
  let service: CustomerReviewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerReviewService],
    }).compile();

    service = module.get<CustomerReviewService>(CustomerReviewService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
