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
exports.CustomerReviewController = void 0;
const common_1 = require("@nestjs/common");
const customer_review_service_1 = require("./customer-review.service");
const create_customer_review_dto_1 = require("./dto/create-customer-review.dto");
const update_customer_review_dto_1 = require("./dto/update-customer-review.dto");
let CustomerReviewController = class CustomerReviewController {
    constructor(customerReviewService) {
        this.customerReviewService = customerReviewService;
    }
    async create(createCustomerReviewDto) {
        const data = await this.customerReviewService.create(createCustomerReviewDto);
        return {
            statusCode: common_1.HttpStatus.CREATED,
            message: 'Customer Review created successfully',
            data,
        };
    }
    async findAll() {
        const data = await this.customerReviewService.findAll();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Customer Reviews retrieved successfully',
            data,
        };
    }
    async findOne(id) {
        const data = await this.customerReviewService.findOne(+id);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Customer Review retrieved successfully',
            data,
        };
    }
    async approve(id) {
        const data = await this.customerReviewService.approve(+id);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Customer Review approved and featured successfully',
            data,
        };
    }
    async update(id, updateCustomerReviewDto) {
        const data = await this.customerReviewService.update(+id, updateCustomerReviewDto);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Customer Review updated successfully',
            data,
        };
    }
    async remove(id) {
        await this.customerReviewService.remove(+id);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Customer Review deleted successfully',
        };
    }
};
exports.CustomerReviewController = CustomerReviewController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_customer_review_dto_1.CreateCustomerReviewDto]),
    __metadata("design:returntype", Promise)
], CustomerReviewController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CustomerReviewController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CustomerReviewController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id/approve'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CustomerReviewController.prototype, "approve", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_customer_review_dto_1.UpdateCustomerReviewDto]),
    __metadata("design:returntype", Promise)
], CustomerReviewController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CustomerReviewController.prototype, "remove", null);
exports.CustomerReviewController = CustomerReviewController = __decorate([
    (0, common_1.Controller)('customer-review'),
    __metadata("design:paramtypes", [customer_review_service_1.CustomerReviewService])
], CustomerReviewController);
//# sourceMappingURL=customer-review.controller.js.map