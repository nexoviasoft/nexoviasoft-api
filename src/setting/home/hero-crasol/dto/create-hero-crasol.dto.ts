import { IsString, IsOptional } from 'class-validator';

export class CreateHeroCrasolDto {
    @IsOptional()
    @IsString()
    status?: string;
}
