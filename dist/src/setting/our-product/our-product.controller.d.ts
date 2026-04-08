import { HttpStatus } from '@nestjs/common';
import { OurProductService } from './our-product.service';
import { CreateOurProductDto } from './dto/create-our-product.dto';
import { UpdateOurProductDto } from './dto/update-our-product.dto';
export declare class OurProductController {
    private readonly ourProductService;
    constructor(ourProductService: OurProductService);
    create(createOurProductDto: CreateOurProductDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/our-product.entity").OurProduct;
    }>;
    findAll(): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/our-product.entity").OurProduct[];
    }>;
    findOne(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/our-product.entity").OurProduct;
    }>;
    update(id: string, updateOurProductDto: UpdateOurProductDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/our-product.entity").OurProduct;
    }>;
    remove(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
