import { HttpStatus } from '@nestjs/common';
import { OurClientService } from './our-client.service';
import { CreateOurClientDto } from './dto/create-our-client.dto';
import { UpdateOurClientDto } from './dto/update-our-client.dto';
export declare class OurClientController {
    private readonly ourClientService;
    constructor(ourClientService: OurClientService);
    create(createOurClientDto: CreateOurClientDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/our-client.entity").OurClient;
    }>;
    findAll(): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/our-client.entity").OurClient[];
    }>;
    findOne(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/our-client.entity").OurClient;
    }>;
    update(id: string, updateOurClientDto: UpdateOurClientDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/our-client.entity").OurClient;
    }>;
    remove(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
