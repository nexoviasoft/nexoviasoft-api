import { Module } from '@nestjs/common';
import { OurTeamService } from './our-team.service';
import { OurTeamController } from './our-team.controller';

@Module({
  controllers: [OurTeamController],
  providers: [OurTeamService],
})
export class OurTeamModule {}
