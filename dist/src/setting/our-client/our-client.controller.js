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
exports.OurClientController = void 0;
const common_1 = require("@nestjs/common");
const our_client_service_1 = require("./our-client.service");
const create_our_client_dto_1 = require("./dto/create-our-client.dto");
const update_our_client_dto_1 = require("./dto/update-our-client.dto");
let OurClientController = class OurClientController {
    constructor(ourClientService) {
        this.ourClientService = ourClientService;
    }
    async create(createOurClientDto) {
        const data = await this.ourClientService.create(createOurClientDto);
        return {
            statusCode: common_1.HttpStatus.CREATED,
            message: 'Client created successfully',
            data,
        };
    }
    async findAll() {
        const data = await this.ourClientService.findAll();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Clients retrieved successfully',
            data,
        };
    }
    async findOne(id) {
        const data = await this.ourClientService.findOne(+id);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Client retrieved successfully',
            data,
        };
    }
    async update(id, updateOurClientDto) {
        const data = await this.ourClientService.update(+id, updateOurClientDto);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Client updated successfully',
            data,
        };
    }
    async remove(id) {
        await this.ourClientService.remove(+id);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Client deleted successfully',
        };
    }
};
exports.OurClientController = OurClientController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_our_client_dto_1.CreateOurClientDto]),
    __metadata("design:returntype", Promise)
], OurClientController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OurClientController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OurClientController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_our_client_dto_1.UpdateOurClientDto]),
    __metadata("design:returntype", Promise)
], OurClientController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OurClientController.prototype, "remove", null);
exports.OurClientController = OurClientController = __decorate([
    (0, common_1.Controller)('our-client'),
    __metadata("design:paramtypes", [our_client_service_1.OurClientService])
], OurClientController);
//# sourceMappingURL=our-client.controller.js.map