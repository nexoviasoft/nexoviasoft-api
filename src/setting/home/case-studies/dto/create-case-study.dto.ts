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

    @IsNumber()
    @IsOptional()
    clientId: number;

    @IsString()
    @IsOptional()
    industry: string;

    @IsString()
    @IsOptional()
    problem_statement: string;

    @IsString()
    @IsOptional()
    solution_overview: string;

    @IsString()
    @IsOptional()
    results: string;

    @IsString()
    @IsOptional()
    duration: string;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    projectimage: string[];
}
