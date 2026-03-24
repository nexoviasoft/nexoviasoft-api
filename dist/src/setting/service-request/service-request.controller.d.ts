import { HttpStatus } from '@nestjs/common';
import { ServiceRequestService } from './service-request.service';
import { CreateServiceRequestDto } from './dto/create-service-request.dto';
import { UpdateServiceRequestDto } from './dto/update-service-request.dto';
export declare class ServiceRequestController {
    private readonly serviceRequestService;
    constructor(serviceRequestService: ServiceRequestService);
    create(createServiceRequestDto: CreateServiceRequestDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/service-request.entity").ServiceRequest;
    }>;
    findAll(): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            client: {
                name: string;
                designation: string;
                email: string;
                phone: string;
                companyName: string;
                location: string;
            };
            pricePackage: {
                title: string;
                price: string;
                feature: string[];
                projectLimit: string;
                revisionLimit: string;
            };
            id: number;
            clientId: number;
            pricePackageId: number;
            service: import("../our-service/entities/our-service.entity").OurService;
            serviceId: number;
            serviceType: string;
            message: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
    findOne(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            client: {
                name: string;
                designation: string;
                email: string;
                phone: string;
                companyName: string;
                location: string;
            };
            pricePackage: {
                title: string;
                price: string;
                feature: string[];
                projectLimit: string;
                revisionLimit: string;
            };
            id: number;
            clientId: number;
            pricePackageId: number;
            service: import("../our-service/entities/our-service.entity").OurService;
            serviceId: number;
            serviceType: string;
            message: string;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    update(id: string, updateServiceRequestDto: UpdateServiceRequestDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/service-request.entity").ServiceRequest;
    }>;
    remove(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
