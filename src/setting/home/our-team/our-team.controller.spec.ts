import { Test, TestingModule } from '@nestjs/testing';
import { OurTeamController } from './our-team.controller';
import { OurTeamService } from './our-team.service';

describe('OurTeamController', () => {
  let controller: OurTeamController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OurTeamController],
      providers: [OurTeamService],
    }).compile();

    controller = module.get<OurTeamController>(OurTeamController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
