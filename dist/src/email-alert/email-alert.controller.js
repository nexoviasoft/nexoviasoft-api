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
exports.EmailAlertController = void 0;
const common_1 = require("@nestjs/common");
const email_alert_service_1 = require("./email-alert.service");
const create_email_alert_dto_1 = require("./dto/create-email-alert.dto");
const update_email_alert_dto_1 = require("./dto/update-email-alert.dto");
let EmailAlertController = class EmailAlertController {
    constructor(emailAlertService) {
        this.emailAlertService = emailAlertService;
    }
    async create(createEmailAlertDto) {
        const data = await this.emailAlertService.create(createEmailAlertDto);
        return {
            statusCode: common_1.HttpStatus.CREATED,
            message: 'Email alert created successfully',
            data,
        };
    }
    async findAll() {
        const data = await this.emailAlertService.findAll();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Email alerts retrieved successfully',
            data,
        };
    }
    async findOne(id) {
        const data = await this.emailAlertService.findOne(+id);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Email alert retrieved successfully',
            data,
        };
    }
    async update(id, updateEmailAlertDto) {
        const data = await this.emailAlertService.update(+id, updateEmailAlertDto);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Email alert updated successfully',
            data,
        };
    }
    async remove(id) {
        await this.emailAlertService.remove(+id);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Email alert deleted successfully',
        };
    }
    async sendEmail(body) {
        const result = await this.emailAlertService.sendEmail(body.to, body.subject, body.body);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: result.message,
            success: result.success,
        };
    }
};
exports.EmailAlertController = EmailAlertController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_email_alert_dto_1.CreateEmailAlertDto]),
    __metadata("design:returntype", Promise)
], EmailAlertController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EmailAlertController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmailAlertController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_email_alert_dto_1.UpdateEmailAlertDto]),
    __metadata("design:returntype", Promise)
], EmailAlertController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmailAlertController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('send'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmailAlertController.prototype, "sendEmail", null);
exports.EmailAlertController = EmailAlertController = __decorate([
    (0, common_1.Controller)('email-alert'),
    __metadata("design:paramtypes", [email_alert_service_1.EmailAlertService])
], EmailAlertController);
//# sourceMappingURL=email-alert.controller.js.map