import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OurTeamService } from './our-team.service';
import { OurTeamController } from './our-team.controller';
import { OurTeam } from './entities/our-team.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OurTeam])],
  controllers: [OurTeamController],
  providers: [OurTeamService],
  exports: [OurTeamService],
})
export class OurTeamModule {}
