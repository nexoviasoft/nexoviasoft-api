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
exports.FooterController = void 0;
const common_1 = require("@nestjs/common");
const footer_service_1 = require("./footer.service");
const update_footer_dto_1 = require("./dto/update-footer.dto");
let FooterController = class FooterController {
    constructor(footerService) {
        this.footerService = footerService;
    }
    async getOne() {
        const data = await this.footerService.getOne();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Footer retrieved successfully',
            data,
        };
    }
    async update(updateFooterDto) {
        const data = await this.footerService.update(updateFooterDto);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Footer updated successfully',
            data,
        };
    }
};
exports.FooterController = FooterController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FooterController.prototype, "getOne", null);
__decorate([
    (0, common_1.Patch)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_footer_dto_1.UpdateFooterDto]),
    __metadata("design:returntype", Promise)
], FooterController.prototype, "update", null);
exports.FooterController = FooterController = __decorate([
    (0, common_1.Controller)('footer'),
    __metadata("design:paramtypes", [footer_service_1.FooterService])
], FooterController);
//# sourceMappingURL=footer.controller.js.map