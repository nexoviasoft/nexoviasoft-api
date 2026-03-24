import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeaveService } from './leave.service';
import { LeaveController } from './leave.controller';
import { Leave } from './entities/leave.entity';
import { OurTeam } from '../setting/home/our-team/entities/our-team.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Leave, OurTeam])],
  controllers: [LeaveController],
  providers: [LeaveService],
  exports: [LeaveService],
})
export class LeaveModule {}
