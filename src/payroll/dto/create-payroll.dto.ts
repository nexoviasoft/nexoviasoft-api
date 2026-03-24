import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsIn,
  IsNumber,
  Min,
  Max,
  IsString,
} from 'class-validator';
import type { PayrollStatus } from '../entities/payroll.entity';

export class CreatePayrollDto {
  @IsInt()
  @IsNotEmpty()
  teamId: number;

  @IsInt()
  @Min(2000)
  @Max(3000)
  periodYear: number;

  @IsInt()
  @Min(1)
  @Max(12)
  periodMonth: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  baseSalary?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  bonus?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  deductions?: number;

  @IsIn(['Pending', 'Processing', 'Paid'])
  @IsOptional()
  status?: PayrollStatus;

  @IsString()
  @IsOptional()
  notes?: string;
}
