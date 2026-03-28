import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseService } from './expense.service';
import { ExpenseController } from './expense.controller';
import { Expense } from './entities/expense.entity';
import { OurTeam } from '../setting/home/our-team/entities/our-team.entity';
import { DocumentsModule } from '../documents/documents.module';
import { EmailAlertModule } from '../email-alert/email-alert.module';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Expense, OurTeam]),
    DocumentsModule,
    EmailAlertModule,
    CommonModule,
  ],
  controllers: [ExpenseController],
  providers: [ExpenseService],
  exports: [ExpenseService],
})
export class ExpenseModule {}
