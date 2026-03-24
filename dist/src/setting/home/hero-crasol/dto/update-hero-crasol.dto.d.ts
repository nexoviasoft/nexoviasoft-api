import { CreateHeroCrasolDto } from './create-hero-crasol.dto';
declare const UpdateHeroCrasolDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateHeroCrasolDto>>;
export declare class UpdateHeroCrasolDto extends UpdateHeroCrasolDto_base {
    logoUrl?: string;
    status?: string;
}
export {};
