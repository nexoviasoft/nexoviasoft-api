import { IsString, IsOptional, IsArray, IsNumber } from 'class-validator';

export class CreateOurServiceDto {
  @IsOptional()
  @IsString()
  logo?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  subtitle?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  keyFeature?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  benefit?: string[];

  @IsOptional()
  @IsNumber()
  categoryId?: number;
}
