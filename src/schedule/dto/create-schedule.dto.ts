import { IsNumber, IsArray, IsOptional, IsDateString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ShiftDto {
  @IsOptional()
  day?: string; // Day of week: 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'

  @IsOptional()
  startTime?: string; // Format: 'HH:mm' (e.g., '09:00')

  @IsOptional()
  endTime?: string; // Format: 'HH:mm' (e.g., '17:00')

  @IsOptional()
  time?: string; // Alternative: time range string (e.g., '09:00 - 17:00') for backward compatibility

  @IsOptional()
  label?: string; // Department/task label (e.g., 'DESIGN', 'PRODUCT', 'DEV', 'MARKETING', 'CHECK-IN')

  @IsOptional()
  type?: string; // Shift type or color code identifier
}

export class CreateScheduleDto {
  @IsNumber()
  teamId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ShiftDto)
  shifts: Array<ShiftDto | null>;

  @IsOptional()
  @IsDateString()
  weekStartDate?: string;

  @IsOptional()
  @IsDateString()
  weekEndDate?: string;
}
