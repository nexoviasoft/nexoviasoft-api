import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateServiceRequestDto {
  @IsOptional()
  @IsNumber()
  clientId?: number;

  @IsOptional()
  @IsNumber()
  pricePackageId?: number;

  @IsOptional()
  @IsNumber()
  serviceId?: number;

  @IsString()
  serviceType: string;

  @IsString()
  message: string;
}
