import { Repository } from 'typeorm';
import { CreateHeroCrasolDto } from './dto/create-hero-crasol.dto';
import { UpdateHeroCrasolDto } from './dto/update-hero-crasol.dto';
import { HeroCrasol } from './entities/hero-crasol.entity';
export declare class HeroCrasolService {
    private heroCrasolRepository;
    constructor(heroCrasolRepository: Repository<HeroCrasol>);
    create(createHeroCrasolDto: CreateHeroCrasolDto): Promise<CreateHeroCrasolDto & HeroCrasol>;
    findAll(): Promise<HeroCrasol[]>;
    findOne(id: number): Promise<HeroCrasol>;
    update(id: number, updateHeroCrasolDto: UpdateHeroCrasolDto): Promise<HeroCrasol>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
