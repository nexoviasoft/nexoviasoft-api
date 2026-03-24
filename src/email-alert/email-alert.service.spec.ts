import { Test, TestingModule } from '@nestjs/testing';
import { EmailAlertService } from './email-alert.service';

describe('EmailAlertService', () => {
  let service: EmailAlertService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailAlertService],
    }).compile();

    service = module.get<EmailAlertService>(EmailAlertService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
