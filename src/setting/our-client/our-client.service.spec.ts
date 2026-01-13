import { Test, TestingModule } from '@nestjs/testing';
import { OurClientService } from './our-client.service';

describe('OurClientService', () => {
  let service: OurClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OurClientService],
    }).compile();

    service = module.get<OurClientService>(OurClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
