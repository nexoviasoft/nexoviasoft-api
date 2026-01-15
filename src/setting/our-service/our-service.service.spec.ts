import { Test, TestingModule } from '@nestjs/testing';
import { OurServiceService } from './our-service.service';

describe('OurServiceService', () => {
  let service: OurServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OurServiceService],
    }).compile();

    service = module.get<OurServiceService>(OurServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
