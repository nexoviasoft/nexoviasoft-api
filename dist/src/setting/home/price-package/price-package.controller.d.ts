import { HttpStatus } from '@nestjs/common';
import { PricePackageService } from './price-package.service';
import { CreatePricePackageDto } from './dto/create-price-package.dto';
import { UpdatePricePackageDto } from './dto/update-price-package.dto';
export declare class PricePackageController {
    private readonly pricePackageService;
    constructor(pricePackageService: PricePackageService);
    create(createPricePackageDto: CreatePricePackageDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: CreatePricePackageDto & import("./entities/price-package.entity").PricePackage;
    }>;
    findAll(): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/price-package.entity").PricePackage[];
    }>;
    findOne(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/price-package.entity").PricePackage;
    }>;
    update(id: string, updatePricePackageDto: UpdatePricePackageDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/price-package.entity").PricePackage;
    }>;
    remove(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
