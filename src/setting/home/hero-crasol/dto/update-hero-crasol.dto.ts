import { PartialType } from '@nestjs/mapped-types';
import { CreateHeroCrasolDto } from './create-hero-crasol.dto';
import { IsString, IsOptional } from 'class-validator';

export class UpdateHeroCrasolDto extends PartialType(CreateHeroCrasolDto) {
    @IsOptional()
    @IsString()
    logoUrl?: string;

    @IsOptional()
    @IsString()
    status?: string;
}
