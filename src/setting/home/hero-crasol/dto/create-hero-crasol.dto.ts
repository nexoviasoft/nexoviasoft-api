import { IsOptional, IsString } from 'class-validator';

export class CreateHeroCrasolDto {
    @IsOptional()
    @IsString()
    status?: string;
}
