import { Test, TestingModule } from '@nestjs/testing';
import { OurServiceController } from './our-service.controller';
import { OurServiceService } from './our-service.service';

describe('OurServiceController', () => {
  let controller: OurServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OurServiceController],
      providers: [OurServiceService],
    }).compile();

    controller = module.get<OurServiceController>(OurServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
