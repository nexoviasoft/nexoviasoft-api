import {
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsEnum,
  Min,
  Max,
} from 'class-validator';

export class CreateCustomerReviewDto {
  @IsNumber()
  @IsOptional()
  client_id?: number;

  @IsNumber()
  @IsOptional()
  case_study_id?: number;

  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number; // Required, must be between 1 and 5

  @IsString()
  review_title: string;

  @IsString()
  review_message: string;

  @IsEnum(['project', 'service', 'case-study'])
  @IsOptional()
  review_type?: string;

  @IsBoolean()
  @IsOptional()
  is_featured?: boolean;

  @IsEnum(['pending', 'approved', 'rejected'])
  @IsOptional()
  status?: string;
}
