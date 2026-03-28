import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { ExpenseType } from '../entities/expense.entity';

export class CreateExpenseDto {
  @IsEnum(ExpenseType)
  type: ExpenseType;

  @IsNumber()
  amount: number;

  @IsString()
  @IsOptional()
  description?: string;
}
