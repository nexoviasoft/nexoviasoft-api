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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRequestController = void 0;
const common_1 = require("@nestjs/common");
const service_request_service_1 = require("./service-request.service");
const create_service_request_dto_1 = require("./dto/create-service-request.dto");
const update_service_request_dto_1 = require("./dto/update-service-request.dto");
let ServiceRequestController = class ServiceRequestController {
    constructor(serviceRequestService) {
        this.serviceRequestService = serviceRequestService;
    }
    async create(createServiceRequestDto) {
        const data = await this.serviceRequestService.create(createServiceRequestDto);
        return {
            statusCode: common_1.HttpStatus.CREATED,
            message: 'Service request created successfully',
            data,
        };
    }
    async findAll() {
        const data = await this.serviceRequestService.findAll();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Service requests retrieved successfully',
            data,
        };
    }
    async findOne(id) {
        const data = await this.serviceRequestService.findOne(+id);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Service request retrieved successfully',
            data,
        };
    }
    async update(id, updateServiceRequestDto) {
        const data = await this.serviceRequestService.update(+id, updateServiceRequestDto);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Service request updated successfully',
            data,
        };
    }
    async remove(id) {
        await this.serviceRequestService.remove(+id);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Service request deleted successfully',
        };
    }
};
exports.ServiceRequestController = ServiceRequestController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_service_request_dto_1.CreateServiceRequestDto]),
    __metadata("design:returntype", Promise)
], ServiceRequestController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ServiceRequestController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ServiceRequestController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_service_request_dto_1.UpdateServiceRequestDto]),
    __metadata("design:returntype", Promise)
], ServiceRequestController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ServiceRequestController.prototype, "remove", null);
exports.ServiceRequestController = ServiceRequestController = __decorate([
    (0, common_1.Controller)('service-request'),
    __metadata("design:paramtypes", [service_request_service_1.ServiceRequestService])
], ServiceRequestController);
//# sourceMappingURL=service-request.controller.js.map