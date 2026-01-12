import { IsArray, IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCaseStudyDto {
    @IsString()
    title: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsBoolean()
    badge: boolean;

    @IsArray()
    @IsString({ each: true })
    features: string[];

    @IsArray()
    @IsNumber({}, { each: true })
    categories: number[];

    @IsString()
    imageUrl: string;

    @IsString()
    @IsOptional()
    caseStudyUrl: string;

    @IsString()
    @IsOptional()
    liveUrl: string;

    @IsString()
    @IsOptional()
    status: string;
}
