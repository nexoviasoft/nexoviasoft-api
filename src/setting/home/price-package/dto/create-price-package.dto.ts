import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreatePricePackageDto {
    @IsString()
    title: string;

    @IsString()
    price: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsString()
    projectLimit: string;

    @IsString()
    revisionLimit: string;

    @IsArray()
    @IsString({ each: true })
    features: string[];

    @IsOptional()
    @IsString()
    badge?: string;

    @IsOptional()
    @IsString()
    type?: string;

    @IsOptional()
    @IsString()
    iconUrl?: string;

    @IsOptional()
    @IsString()
    status?: string;
}
