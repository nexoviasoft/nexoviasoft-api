import { Test, TestingModule } from '@nestjs/testing';
import { ReqcuitmentService } from './reqcuitment.service';

describe('ReqcuitmentService', () => {
  let service: ReqcuitmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReqcuitmentService],
    }).compile();

    service = module.get<ReqcuitmentService>(ReqcuitmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
