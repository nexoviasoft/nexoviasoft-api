import { Repository } from 'typeorm';
import { CreatePricePackageDto } from './dto/create-price-package.dto';
import { UpdatePricePackageDto } from './dto/update-price-package.dto';
import { PricePackage } from './entities/price-package.entity';
export declare class PricePackageService {
    private pricePackageRepository;
    constructor(pricePackageRepository: Repository<PricePackage>);
    create(createPricePackageDto: CreatePricePackageDto): Promise<CreatePricePackageDto & PricePackage>;
    findAll(): Promise<PricePackage[]>;
    findOne(id: number): Promise<PricePackage>;
    update(id: number, updatePricePackageDto: UpdatePricePackageDto): Promise<PricePackage>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
