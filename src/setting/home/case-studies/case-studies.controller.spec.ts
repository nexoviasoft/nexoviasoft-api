import { Test, TestingModule } from '@nestjs/testing';
import { CaseStudiesController } from './case-studies.controller';
import { CaseStudiesService } from './case-studies.service';

describe('CaseStudiesController', () => {
  let controller: CaseStudiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CaseStudiesController],
      providers: [CaseStudiesService],
    }).compile();

    controller = module.get<CaseStudiesController>(CaseStudiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
