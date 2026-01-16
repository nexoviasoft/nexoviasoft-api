import { IsString, IsOptional, IsArray, IsNumber, IsBoolean, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class OtherServiceItemDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsBoolean()
  isfeature: boolean;
}

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
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OtherServiceItemDto)
  otherservice?: OtherServiceItemDto[];

  @IsOptional()
  @IsNumber()
  categoryId?: number;
}
