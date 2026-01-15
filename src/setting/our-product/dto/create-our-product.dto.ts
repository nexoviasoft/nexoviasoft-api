import { IsString, IsOptional, IsArray, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateOurProductDto {
  @IsOptional()
  @IsNumber()
  categoryId?: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  logo?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  feature?: string[];

  @IsOptional()
  @IsString()
  url?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  totalUser?: number;
}
