import { IsString, IsOptional, IsNumber, IsDateString } from 'class-validator';

export class CreateInterviewDto {
  @IsString()
  candidate: string; // Candidate name

  @IsString()
  position: string;

  @IsDateString()
  date: string;

  @IsString()
  time: string; // Format: HH:mm

  @IsString()
  interviewer: string;

  @IsString()
  type: string; // Technical, Behavioral, Portfolio Review, Final Round

  @IsOptional()
  @IsString()
  status?: string; // Scheduled, Completed, Cancelled, Rescheduled

  @IsOptional()
  @IsNumber()
  candidateId?: number;
}
