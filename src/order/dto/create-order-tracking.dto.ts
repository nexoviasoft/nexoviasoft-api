import { IsNumber, IsOptional, IsEnum, IsString, Min, Max } from 'class-validator';
import { OrderStatus } from '../entities/order.entity';

export class CreateOrderTrackingDto {
  @IsNumber()
  orderId: number;

  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  progress?: number;

  @IsOptional()
  @IsString()
  note?: string;

  @IsOptional()
  @IsNumber()
  createdBy?: number;

  @IsOptional()
  @IsString()
  createdByName?: string;
}
