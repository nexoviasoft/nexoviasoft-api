import { Test, TestingModule } from '@nestjs/testing';
import { CaseStudiesService } from './case-studies.service';

describe('CaseStudiesService', () => {
  let service: CaseStudiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CaseStudiesService],
    }).compile();

    service = module.get<CaseStudiesService>(CaseStudiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
