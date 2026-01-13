import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateOurClientDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  designation?: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  photo?: string;

  @IsOptional()
  @IsString()
  companyName?: string;

  @IsOptional()
  @IsString()
  companyType?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  country?: string;
}
