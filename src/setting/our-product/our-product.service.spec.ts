import { Test, TestingModule } from '@nestjs/testing';
import { OurProductService } from './our-product.service';

describe('OurProductService', () => {
  let service: OurProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OurProductService],
    }).compile();

    service = module.get<OurProductService>(OurProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
