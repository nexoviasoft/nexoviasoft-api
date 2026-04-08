import { HttpStatus } from '@nestjs/common';
import { OurTeamService } from './our-team.service';
import { CreateOurTeamDto } from './dto/create-our-team.dto';
import { UpdateOurTeamDto } from './dto/update-our-team.dto';
export declare class OurTeamController {
    private readonly ourTeamService;
    constructor(ourTeamService: OurTeamService);
    create(createOurTeamDto: CreateOurTeamDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/our-team.entity").OurTeam;
    }>;
    findAll(): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/our-team.entity").OurTeam[];
    }>;
    findAllPublic(): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            id: number;
            name: string;
            image: string;
            designation: string;
        }[];
    }>;
    findByEmail(email: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/our-team.entity").OurTeam;
    }>;
    findOne(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/our-team.entity").OurTeam;
    }>;
    update(id: string, updateOurTeamDto: UpdateOurTeamDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/our-team.entity").OurTeam;
    }>;
    remove(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
    activate(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/our-team.entity").OurTeam;
    }>;
    deactivate(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/our-team.entity").OurTeam;
    }>;
    suspend(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/our-team.entity").OurTeam;
    }>;
}
