import { Test, TestingModule } from '@nestjs/testing';
import { EmailAlertController } from './email-alert.controller';
import { EmailAlertService } from './email-alert.service';

describe('EmailAlertController', () => {
  let controller: EmailAlertController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmailAlertController],
      providers: [EmailAlertService],
    }).compile();

    controller = module.get<EmailAlertController>(EmailAlertController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
