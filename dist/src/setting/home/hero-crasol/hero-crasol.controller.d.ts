import { HttpStatus } from '@nestjs/common';
import { HeroCrasolService } from './hero-crasol.service';
import { CreateHeroCrasolDto } from './dto/create-hero-crasol.dto';
import { UpdateHeroCrasolDto } from './dto/update-hero-crasol.dto';
export declare class HeroCrasolController {
    private readonly heroCrasolService;
    constructor(heroCrasolService: HeroCrasolService);
    create(createHeroCrasolDto: CreateHeroCrasolDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: CreateHeroCrasolDto & import("./entities/hero-crasol.entity").HeroCrasol;
    }>;
    findAll(): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/hero-crasol.entity").HeroCrasol[];
    }>;
    findOne(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/hero-crasol.entity").HeroCrasol;
    }>;
    update(id: string, updateHeroCrasolDto: UpdateHeroCrasolDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/hero-crasol.entity").HeroCrasol;
    }>;
    remove(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
