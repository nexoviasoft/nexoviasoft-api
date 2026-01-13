import { Test, TestingModule } from '@nestjs/testing';
import { OurClientController } from './our-client.controller';
import { OurClientService } from './our-client.service';

describe('OurClientController', () => {
  let controller: OurClientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OurClientController],
      providers: [OurClientService],
    }).compile();

    controller = module.get<OurClientController>(OurClientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
