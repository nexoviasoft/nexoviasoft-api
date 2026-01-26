import { IsString, IsInt, IsOptional, IsBoolean } from 'class-validator';

export class CreateColumnDto {
  @IsInt()
  projectId: number;

  @IsString()
  title: string;

  @IsInt()
  @IsOptional()
  order?: number;

  @IsBoolean()
  @IsOptional()
  isCustom?: boolean;
}
