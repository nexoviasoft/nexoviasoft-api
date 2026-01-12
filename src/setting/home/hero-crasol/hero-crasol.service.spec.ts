import { Test, TestingModule } from '@nestjs/testing';
import { HeroCrasolService } from './hero-crasol.service';

describe('HeroCrasolService', () => {
  let service: HeroCrasolService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HeroCrasolService],
    }).compile();

    service = module.get<HeroCrasolService>(HeroCrasolService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
