import { Test, TestingModule } from '@nestjs/testing';
import { HeroCrasolController } from './hero-crasol.controller';
import { HeroCrasolService } from './hero-crasol.service';

describe('HeroCrasolController', () => {
  let controller: HeroCrasolController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HeroCrasolController],
      providers: [HeroCrasolService],
    }).compile();

    controller = module.get<HeroCrasolController>(HeroCrasolController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
