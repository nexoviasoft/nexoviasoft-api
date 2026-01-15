import { Test, TestingModule } from '@nestjs/testing';
import { OurProductController } from './our-product.controller';
import { OurProductService } from './our-product.service';

describe('OurProductController', () => {
  let controller: OurProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OurProductController],
      providers: [OurProductService],
    }).compile();

    controller = module.get<OurProductController>(OurProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
