import { PartialType } from '@nestjs/mapped-types';
import { CreateExpenseDto } from './create-expense.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { ExpenseStatus } from '../entities/expense.entity';

export class UpdateExpenseDto extends PartialType(CreateExpenseDto) {
  @IsEnum(ExpenseStatus)
  @IsOptional()
  status?: ExpenseStatus;
}
