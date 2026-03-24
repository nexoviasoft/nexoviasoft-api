import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PayrollService } from './payroll.service';
import { PayrollController } from './payroll.controller';
import { Payroll } from './entities/payroll.entity';
import { OurTeam } from '../setting/home/our-team/entities/our-team.entity';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [TypeOrmModule.forFeature([Payroll, OurTeam]), CommonModule],
  controllers: [PayrollController],
  providers: [PayrollService],
})
export class PayrollModule {}
