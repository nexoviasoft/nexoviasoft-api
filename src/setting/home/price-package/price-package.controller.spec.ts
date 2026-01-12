import { Test, TestingModule } from '@nestjs/testing';
import { PricePackageController } from './price-package.controller';
import { PricePackageService } from './price-package.service';

describe('PricePackageController', () => {
  let controller: PricePackageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PricePackageController],
      providers: [PricePackageService],
    }).compile();

    controller = module.get<PricePackageController>(PricePackageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
