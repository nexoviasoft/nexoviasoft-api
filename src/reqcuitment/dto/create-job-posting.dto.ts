import { Type } from 'class-transformer';
import { IsString, IsOptional, IsNumber, IsDateString } from 'class-validator';

export class CreateJobPostingDto {
  @IsString()
  title: string;

  @IsString()
  department: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  departmentId?: number;

  @IsString()
  type: string; // Full-time, Part-time, Contract, Internship

  @IsString()
  location: string;

  @IsOptional()
  @IsString()
  status?: string; // Active, Inactive, Draft

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  applicants?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  vacancy?: number;

  @IsOptional()
  @IsDateString()
  postedDate?: string;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  expiryDate?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}
