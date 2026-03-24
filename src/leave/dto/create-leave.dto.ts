import { IsString, IsDateString, IsInt, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateLeaveDto {
  @IsInt()
  @IsNotEmpty()
  teamId: number;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @IsDateString()
  @IsNotEmpty()
  endDate: string;

  @IsInt()
  @IsNotEmpty()
  days: number;

  @IsString()
  @IsNotEmpty()
  reason: string;
}
