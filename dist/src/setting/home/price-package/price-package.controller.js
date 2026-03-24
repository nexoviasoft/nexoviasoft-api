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
exports.PricePackageController = void 0;
const common_1 = require("@nestjs/common");
const price_package_service_1 = require("./price-package.service");
const create_price_package_dto_1 = require("./dto/create-price-package.dto");
const update_price_package_dto_1 = require("./dto/update-price-package.dto");
let PricePackageController = class PricePackageController {
    constructor(pricePackageService) {
        this.pricePackageService = pricePackageService;
    }
    async create(createPricePackageDto) {
        const data = await this.pricePackageService.create(createPricePackageDto);
        return {
            statusCode: common_1.HttpStatus.CREATED,
            message: 'Price Package created successfully',
            data,
        };
    }
    async findAll() {
        const data = await this.pricePackageService.findAll();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Price Packages retrieved successfully',
            data,
        };
    }
    async findOne(id) {
        const data = await this.pricePackageService.findOne(+id);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Price Package retrieved successfully',
            data,
        };
    }
    async update(id, updatePricePackageDto) {
        const data = await this.pricePackageService.update(+id, updatePricePackageDto);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Price Package updated successfully',
            data,
        };
    }
    async remove(id) {
        await this.pricePackageService.remove(+id);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Price Package deleted successfully',
        };
    }
};
exports.PricePackageController = PricePackageController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_price_package_dto_1.CreatePricePackageDto]),
    __metadata("design:returntype", Promise)
], PricePackageController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PricePackageController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PricePackageController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_price_package_dto_1.UpdatePricePackageDto]),
    __metadata("design:returntype", Promise)
], PricePackageController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PricePackageController.prototype, "remove", null);
exports.PricePackageController = PricePackageController = __decorate([
    (0, common_1.Controller)('price-package'),
    __metadata("design:paramtypes", [price_package_service_1.PricePackageService])
], PricePackageController);
//# sourceMappingURL=price-package.controller.js.map