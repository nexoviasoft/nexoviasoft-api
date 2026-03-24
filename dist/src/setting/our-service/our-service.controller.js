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
exports.OurServiceController = void 0;
const common_1 = require("@nestjs/common");
const our_service_service_1 = require("./our-service.service");
const create_our_service_dto_1 = require("./dto/create-our-service.dto");
const update_our_service_dto_1 = require("./dto/update-our-service.dto");
let OurServiceController = class OurServiceController {
    constructor(ourServiceService) {
        this.ourServiceService = ourServiceService;
    }
    async create(createOurServiceDto) {
        const data = await this.ourServiceService.create(createOurServiceDto);
        return {
            statusCode: common_1.HttpStatus.CREATED,
            message: 'Service created successfully',
            data,
        };
    }
    async findAll() {
        const data = await this.ourServiceService.findAll();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Services retrieved successfully',
            data,
        };
    }
    async findOne(id) {
        const data = await this.ourServiceService.findOne(+id);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Service retrieved successfully',
            data,
        };
    }
    async update(id, updateOurServiceDto) {
        const data = await this.ourServiceService.update(+id, updateOurServiceDto);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Service updated successfully',
            data,
        };
    }
    async remove(id) {
        await this.ourServiceService.remove(+id);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Service deleted successfully',
        };
    }
};
exports.OurServiceController = OurServiceController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_our_service_dto_1.CreateOurServiceDto]),
    __metadata("design:returntype", Promise)
], OurServiceController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OurServiceController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OurServiceController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_our_service_dto_1.UpdateOurServiceDto]),
    __metadata("design:returntype", Promise)
], OurServiceController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OurServiceController.prototype, "remove", null);
exports.OurServiceController = OurServiceController = __decorate([
    (0, common_1.Controller)('our-service'),
    __metadata("design:paramtypes", [our_service_service_1.OurServiceService])
], OurServiceController);
//# sourceMappingURL=our-service.controller.js.map