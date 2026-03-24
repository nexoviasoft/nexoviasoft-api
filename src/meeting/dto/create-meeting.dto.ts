import {
  IsArray,
  ArrayNotEmpty,
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateMeetingDto {
  @IsString()
  topic: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsDateString()
  dateTime: string;

  @IsInt()
  @Min(1)
  durationMinutes: number;

  @IsArray()
  @ArrayNotEmpty()
  attendeeIds: number[];

  @IsOptional()
  @IsString()
  organizerName?: string;
}
