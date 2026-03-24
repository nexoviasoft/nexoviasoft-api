import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendance } from '../attendance/entities/attendance.entity';
import { Leave } from '../leave/entities/leave.entity';
import { Meeting } from '../meeting/entities/meeting.entity';
import { Order } from '../order/entities/order.entity';
import { Payroll } from '../payroll/entities/payroll.entity';
import { Schedule } from '../schedule/entities/schedule.entity';
import { OurClient } from '../setting/our-client/entities/our-client.entity';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OurClient,
      Order,
      Payroll,
      Attendance,
      Leave,
      Meeting,
      Schedule,
    ]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}

