import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateServiceRequestDto } from './dto/create-service-request.dto';
import { UpdateServiceRequestDto } from './dto/update-service-request.dto';
import { ServiceRequest } from './entities/service-request.entity';
import { OurClient } from '../our-client/entities/our-client.entity';
import { PricePackage } from '../home/price-package/entities/price-package.entity';

@Injectable()
export class ServiceRequestService {
  constructor(
    @InjectRepository(ServiceRequest)
    private readonly serviceRequestRepository: Repository<ServiceRequest>,
    @InjectRepository(OurClient)
    private readonly ourClientRepository: Repository<OurClient>,
    @InjectRepository(PricePackage)
    private readonly pricePackageRepository: Repository<PricePackage>,
  ) {}

  async create(createServiceRequestDto: CreateServiceRequestDto) {
    const serviceRequest = this.serviceRequestRepository.create(createServiceRequestDto);
    return this.serviceRequestRepository.save(serviceRequest);
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
