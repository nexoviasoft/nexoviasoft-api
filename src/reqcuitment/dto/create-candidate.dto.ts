import { IsString, IsOptional, IsArray, IsNumber, IsDateString } from 'class-validator';

export class CreateCandidateDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  photo?: string;

  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsString()
  position: string;

  @IsOptional()
  @IsString()
  stage?: string; // applied, screening, interview, offer, hired

  @IsOptional()
  @IsDateString()
  appliedDate?: string;

  @IsOptional()
  @IsString()
  experience?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  skills?: string[];

  @IsOptional()
  @IsNumber()
  jobPostingId?: number;

  @IsOptional()
  @IsString()
  cvData?: string;

  @IsOptional()
  @IsString()
  cvUrl?: string;

  @IsOptional()
  @IsString()
  cvFilename?: string;
}
