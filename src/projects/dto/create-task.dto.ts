import { IsString, IsOptional, IsNumber, IsDateString, IsArray, IsInt } from 'class-validator';

export class CreateTaskDto {
  @IsInt()
  projectId: number;

  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  priority?: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  columnId?: string;

  @IsInt()
  @IsOptional()
  order?: number;

  @IsDateString()
  @IsOptional()
  dueDate?: string;

  @IsString()
  @IsOptional()
  team?: string;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  assignees?: string[];
}
