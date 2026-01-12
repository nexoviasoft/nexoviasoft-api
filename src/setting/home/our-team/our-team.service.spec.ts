import { Test, TestingModule } from '@nestjs/testing';
import { OurTeamService } from './our-team.service';

describe('OurTeamService', () => {
  let service: OurTeamService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OurTeamService],
    }).compile();

    service = module.get<OurTeamService>(OurTeamService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
