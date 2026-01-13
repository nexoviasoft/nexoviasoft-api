import { IsString, IsOptional, IsArray, IsBoolean, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class LinkDto {
  @IsString()
  label: string;

  @IsString()
  url: string;
}

export class CreateFooterDto {
  @IsOptional()
  @IsString()
  logo_url?: string;

  @IsString()
  company_name: string;

  @IsString()
  company_description: string;

  @IsString()
  location: string;

  @IsOptional()
  @IsString()
  twitter_url?: string;

  @IsOptional()
  @IsString()
  instagram_url?: string;

  @IsOptional()
  @IsString()
  linkedin_url?: string;

  @IsOptional()
  @IsString()
  youtube_url?: string;

  @IsOptional()
  @IsString()
  company_links_title?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LinkDto)
  company_links?: { label: string; url: string }[];

  @IsOptional()
  @IsString()
  services_links_title?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LinkDto)
  services_links?: { label: string; url: string }[];

  @IsOptional()
  @IsString()
  legal_links_title?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LinkDto)
  legal_links?: { label: string; url: string }[];

  @IsOptional()
  @IsString()
  newsletter_title?: string;

  @IsOptional()
  @IsString()
  newsletter_placeholder?: string;

  @IsOptional()
  @IsBoolean()
  newsletter_enabled?: boolean;
}
