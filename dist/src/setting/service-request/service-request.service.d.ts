import { Repository } from 'typeorm';
import { CreateServiceRequestDto } from './dto/create-service-request.dto';
import { UpdateServiceRequestDto } from './dto/update-service-request.dto';
import { ServiceRequest } from './entities/service-request.entity';
import { EmailService } from '../../common/services/email.service';
export declare class ServiceRequestService {
    private readonly serviceRequestRepository;
    private readonly emailService;
    private readonly logger;
    constructor(serviceRequestRepository: Repository<ServiceRequest>, emailService: EmailService);
    create(createServiceRequestDto: CreateServiceRequestDto): Promise<ServiceRequest>;
    findAll(): Promise<{
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
    }[]>;
    private findOneEntity;
    findOne(id: number): Promise<{
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
    }>;
    update(id: number, updateServiceRequestDto: UpdateServiceRequestDto): Promise<ServiceRequest>;
    remove(id: number): Promise<ServiceRequest>;
}
