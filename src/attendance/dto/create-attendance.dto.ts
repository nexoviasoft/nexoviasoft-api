import { IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator';

export class CreateAttendanceDto {
  @IsOptional()
  @IsString()
  checkIn?: string;

  @IsOptional()
  @IsString()
  checkOut?: string;

  @IsOptional()
  @IsString()
  workHours?: string;

  @IsString()
  status: string;

  @IsOptional()
  @IsNumber()
  teamId?: number;

  @IsOptional()
  @IsBoolean()
  approved?: boolean;
}
