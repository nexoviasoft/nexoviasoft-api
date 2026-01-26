import { IsString, IsOptional, IsNumber, IsDateString, IsArray, IsInt, Min, Max } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(100)
  progress?: number;

  @IsString()
  @IsOptional()
  applicationType?: string;

  @IsString()
  @IsOptional()
  platform?: string;

  @IsInt()
  @IsOptional()
  departmentId?: number;

  @IsInt()
  @IsOptional()
  projectLeadId?: number;

  @IsArray()
  @IsOptional()
  @IsInt({ each: true })
  teamMemberIds?: number[];

  @IsDateString()
  @IsOptional()
  dueDate?: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  tasksCompleted?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  totalTasks?: number;

  @IsString()
  @IsOptional()
  template?: string;
}
