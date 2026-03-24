import { IsString, IsNumber, IsOptional, IsEnum, IsArray, IsDateString, Min, Max } from 'class-validator';
import { OrderStatus } from '../entities/order.entity';

export class CreateOrderDto {
  @IsOptional()
  @IsString()
  orderId?: string;

  @IsNumber()
  clientId: number;

  @IsOptional()
  @IsNumber()
  categoryId?: number;

  @IsString()
  service: string;

  @IsNumber()
  @Min(0)
  amount: number;

  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  progress?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  assignedTo?: string[];

  @IsOptional()
  @IsDateString()
  date?: string;
}
