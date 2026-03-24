import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { Order } from '../order/entities/order.entity';
import { Project } from '../projects/entities/project.entity';
import { Task } from '../projects/entities/task.entity';
import { Attendance } from '../attendance/entities/attendance.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Project, Task, Attendance])],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
