import { Test, TestingModule } from '@nestjs/testing';
import { ReqcuitmentController } from './reqcuitment.controller';
import { ReqcuitmentService } from './reqcuitment.service';

describe('ReqcuitmentController', () => {
  let controller: ReqcuitmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReqcuitmentController],
      providers: [ReqcuitmentService],
    }).compile();

    controller = module.get<ReqcuitmentController>(ReqcuitmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
