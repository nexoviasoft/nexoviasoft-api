import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateServiceRequestDto } from './dto/create-service-request.dto';
import { UpdateServiceRequestDto } from './dto/update-service-request.dto';
import { ServiceRequest } from './entities/service-request.entity';
import { EmailService } from '../../common/services/email.service';

@Injectable()
export class ServiceRequestService {
  private readonly logger = new Logger(ServiceRequestService.name);

  constructor(
    @InjectRepository(ServiceRequest)
    private readonly serviceRequestRepository: Repository<ServiceRequest>,
    private readonly emailService: EmailService,
  ) {}

  async create(createServiceRequestDto: CreateServiceRequestDto) {
    const serviceRequest = this.serviceRequestRepository.create(createServiceRequestDto);
    const savedRequest = await this.serviceRequestRepository.save(serviceRequest);

    // Load client relation to get email
    const serviceRequestWithClient = await this.serviceRequestRepository.findOne({
      where: { id: savedRequest.id },
      relations: ['client'],
    });

    // Send confirmation email to client if email exists
    if (serviceRequestWithClient?.client?.email) {
      try {
        await this.emailService.sendServiceRequestConfirmation(
          serviceRequestWithClient.client.email,
          serviceRequestWithClient.client.name || 'Valued Client',
          createServiceRequestDto.serviceType,
        );
        this.logger.log(
          `Confirmation email sent to ${serviceRequestWithClient.client.email} for service request ${savedRequest.id}`,
        );
      } catch (error) {
        this.logger.error(
          `Failed to send confirmation email for service request ${savedRequest.id}:`,
          error,
        );
        // Don't throw error - service request is already created
      }
    } else {
      this.logger.warn(
        `No client email found for service request ${savedRequest.id}, skipping email notification`,
      );
    }

    return savedRequest;
  }

  async findAll() {
    const serviceRequests = await this.serviceRequestRepository.find({
      relations: ['client', 'pricePackage'],
    });

    return serviceRequests.map((request) => ({
      ...request,
      client: request.client
        ? {
            name: request.client.name,
            designation: request.client.designation,
            email: request.client.email,
            phone: request.client.phone,
            companyName: request.client.companyName,
            location: request.client.location,
          }
        : null,
      pricePackage: request.pricePackage
        ? {
            title: request.pricePackage.title,
            price: request.pricePackage.price,
            feature: request.pricePackage.features,
            projectLimit: request.pricePackage.projectLimit,
            revisionLimit: request.pricePackage.revisionLimit,
          }
        : null,
    }));
  }

  private async findOneEntity(id: number): Promise<ServiceRequest> {
    const serviceRequest = await this.serviceRequestRepository.findOne({
      where: { id },
      relations: ['client', 'pricePackage'],
    });
    
    if (!serviceRequest) {
      throw new NotFoundException(`Service request with ID ${id} not found`);
    }
    
    return serviceRequest;
  }

  async findOne(id: number) {
    const serviceRequest = await this.findOneEntity(id);
    
    return {
      ...serviceRequest,
      client: serviceRequest.client
        ? {
            name: serviceRequest.client.name,
            designation: serviceRequest.client.designation,
            email: serviceRequest.client.email,
            phone: serviceRequest.client.phone,
            companyName: serviceRequest.client.companyName,
            location: serviceRequest.client.location,
          }
        : null,
      pricePackage: serviceRequest.pricePackage
        ? {
            title: serviceRequest.pricePackage.title,
            price: serviceRequest.pricePackage.price,
            feature: serviceRequest.pricePackage.features,
            projectLimit: serviceRequest.pricePackage.projectLimit,
            revisionLimit: serviceRequest.pricePackage.revisionLimit,
          }
        : null,
    };
  }

  async update(id: number, updateServiceRequestDto: UpdateServiceRequestDto) {
    const serviceRequest = await this.findOneEntity(id);
    Object.assign(serviceRequest, updateServiceRequestDto);
    return this.serviceRequestRepository.save(serviceRequest);
  }

  async remove(id: number) {
    const serviceRequest = await this.findOneEntity(id);
    return this.serviceRequestRepository.remove(serviceRequest);
  }
}
