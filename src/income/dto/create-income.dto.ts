import { IsNumber, IsOptional, IsString, IsDateString } from 'class-validator';

export class CreateIncomeDto {
  @IsOptional()
  @IsNumber()
  orderId?: number;

  @IsNumber()
  clientId: number;

  @IsNumber()
  amount: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDateString()
  date?: string;

  @IsOptional()
  @IsString()
  receiptNo?: string;
}

export class UpdateIncomeDto {
  @IsOptional()
  @IsNumber()
  orderId?: number;

  @IsOptional()
  @IsNumber()
  clientId?: number;

  @IsOptional()
  @IsNumber()
  amount?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDateString()
  date?: string;

  @IsOptional()
  @IsString()
  receiptNo?: string;
}
