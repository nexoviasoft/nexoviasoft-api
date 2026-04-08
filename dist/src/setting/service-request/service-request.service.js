"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var ServiceRequestService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRequestService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const service_request_entity_1 = require("./entities/service-request.entity");
const email_service_1 = require("../../common/services/email.service");
let ServiceRequestService = ServiceRequestService_1 = class ServiceRequestService {
    constructor(serviceRequestRepository, emailService) {
        this.serviceRequestRepository = serviceRequestRepository;
        this.emailService = emailService;
        this.logger = new common_1.Logger(ServiceRequestService_1.name);
    }
    async create(createServiceRequestDto) {
        const serviceRequest = this.serviceRequestRepository.create(createServiceRequestDto);
        const savedRequest = await this.serviceRequestRepository.save(serviceRequest);
        const serviceRequestWithClient = await this.serviceRequestRepository.findOne({
            where: { id: savedRequest.id },
            relations: ['client'],
        });
        if (serviceRequestWithClient?.client?.email) {
            try {
                await this.emailService.sendServiceRequestConfirmation(serviceRequestWithClient.client.email, serviceRequestWithClient.client.name || 'Valued Client', createServiceRequestDto.serviceType);
                this.logger.log(`Confirmation email sent to ${serviceRequestWithClient.client.email} for service request ${savedRequest.id}`);
            }
            catch (error) {
                this.logger.error(`Failed to send confirmation email for service request ${savedRequest.id}:`, error);
            }
        }
        else {
            this.logger.warn(`No client email found for service request ${savedRequest.id}, skipping email notification`);
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
    async findOneEntity(id) {
        const serviceRequest = await this.serviceRequestRepository.findOne({
            where: { id },
            relations: ['client', 'pricePackage'],
        });
        if (!serviceRequest) {
            throw new common_1.NotFoundException(`Service request with ID ${id} not found`);
        }
        return serviceRequest;
    }
    async findOne(id) {
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
    async update(id, updateServiceRequestDto) {
        const serviceRequest = await this.findOneEntity(id);
        Object.assign(serviceRequest, updateServiceRequestDto);
        return this.serviceRequestRepository.save(serviceRequest);
    }
    async remove(id) {
        const serviceRequest = await this.findOneEntity(id);
        return this.serviceRequestRepository.remove(serviceRequest);
    }
};
exports.ServiceRequestService = ServiceRequestService;
exports.ServiceRequestService = ServiceRequestService = ServiceRequestService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(service_request_entity_1.ServiceRequest)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        email_service_1.EmailService])
], ServiceRequestService);
//# sourceMappingURL=service-request.service.js.map