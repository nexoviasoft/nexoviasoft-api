import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { Attendance } from './entities/attendance.entity';
import { OurTeam } from '../setting/home/our-team/entities/our-team.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Attendance, OurTeam])],
  controllers: [AttendanceController],
  providers: [AttendanceService],
})
export class AttendanceModule {}
