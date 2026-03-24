import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeetingService } from './meeting.service';
import { MeetingController } from './meeting.controller';
import { Meeting } from './entities/meeting.entity';
import { OurTeam } from '../setting/home/our-team/entities/our-team.entity';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [TypeOrmModule.forFeature([Meeting, OurTeam]), CommonModule],
  controllers: [MeetingController],
  providers: [MeetingService],
})
export class MeetingModule {}
