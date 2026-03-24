import { HttpStatus } from '@nestjs/common';
import { OurServiceService } from './our-service.service';
import { CreateOurServiceDto } from './dto/create-our-service.dto';
import { UpdateOurServiceDto } from './dto/update-our-service.dto';
export declare class OurServiceController {
    private readonly ourServiceService;
    constructor(ourServiceService: OurServiceService);
    create(createOurServiceDto: CreateOurServiceDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/our-service.entity").OurService;
    }>;
    findAll(): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/our-service.entity").OurService[];
    }>;
    findOne(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/our-service.entity").OurService;
    }>;
    update(id: string, updateOurServiceDto: UpdateOurServiceDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/our-service.entity").OurService;
    }>;
    remove(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
