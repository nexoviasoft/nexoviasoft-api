import { Repository } from 'typeorm';
import { CreateOurProductDto } from './dto/create-our-product.dto';
import { UpdateOurProductDto } from './dto/update-our-product.dto';
import { OurProduct } from './entities/our-product.entity';
export declare class OurProductService {
    private readonly ourProductRepository;
    constructor(ourProductRepository: Repository<OurProduct>);
    create(createOurProductDto: CreateOurProductDto): Promise<OurProduct>;
    findAll(): Promise<OurProduct[]>;
    findOne(id: number): Promise<OurProduct>;
    update(id: number, updateOurProductDto: UpdateOurProductDto): Promise<OurProduct>;
    remove(id: number): Promise<OurProduct>;
}
