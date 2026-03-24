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
exports.OurProductController = void 0;
const common_1 = require("@nestjs/common");
const our_product_service_1 = require("./our-product.service");
const create_our_product_dto_1 = require("./dto/create-our-product.dto");
const update_our_product_dto_1 = require("./dto/update-our-product.dto");
let OurProductController = class OurProductController {
    constructor(ourProductService) {
        this.ourProductService = ourProductService;
    }
    async create(createOurProductDto) {
        const data = await this.ourProductService.create(createOurProductDto);
        return {
            statusCode: common_1.HttpStatus.CREATED,
            message: 'Product created successfully',
            data,
        };
    }
    async findAll() {
        const data = await this.ourProductService.findAll();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Products retrieved successfully',
            data,
        };
    }
    async findOne(id) {
        const data = await this.ourProductService.findOne(+id);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Product retrieved successfully',
            data,
        };
    }
    async update(id, updateOurProductDto) {
        const data = await this.ourProductService.update(+id, updateOurProductDto);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Product updated successfully',
            data,
        };
    }
    async remove(id) {
        await this.ourProductService.remove(+id);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Product deleted successfully',
        };
    }
};
exports.OurProductController = OurProductController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_our_product_dto_1.CreateOurProductDto]),
    __metadata("design:returntype", Promise)
], OurProductController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OurProductController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OurProductController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_our_product_dto_1.UpdateOurProductDto]),
    __metadata("design:returntype", Promise)
], OurProductController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OurProductController.prototype, "remove", null);
exports.OurProductController = OurProductController = __decorate([
    (0, common_1.Controller)('our-product'),
    __metadata("design:paramtypes", [our_product_service_1.OurProductService])
], OurProductController);
//# sourceMappingURL=our-product.controller.js.map