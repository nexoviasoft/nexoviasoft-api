import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { Schedule } from './entities/schedule.entity';
import { OurTeam } from '../setting/home/our-team/entities/our-team.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Schedule, OurTeam])],
  controllers: [ScheduleController],
  providers: [ScheduleService],
})
export class ScheduleModule {}
