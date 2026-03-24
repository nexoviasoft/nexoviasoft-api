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
var EmailAlertService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailAlertService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const email_alert_entity_1 = require("./entities/email-alert.entity");
const email_service_1 = require("../common/services/email.service");
let EmailAlertService = EmailAlertService_1 = class EmailAlertService {
    constructor(emailAlertRepository, emailService) {
        this.emailAlertRepository = emailAlertRepository;
        this.emailService = emailService;
        this.logger = new common_1.Logger(EmailAlertService_1.name);
    }
    async create(createEmailAlertDto) {
        const emailAlert = this.emailAlertRepository.create(createEmailAlertDto);
        return await this.emailAlertRepository.save(emailAlert);
    }
    async findAll() {
        return await this.emailAlertRepository.find({
            order: { createdAt: 'DESC' },
        });
    }
    async findOneEntity(id) {
        const emailAlert = await this.emailAlertRepository.findOne({
            where: { id },
        });
        if (!emailAlert) {
            throw new common_1.NotFoundException(`Email alert with ID ${id} not found`);
        }
        return emailAlert;
    }
    async findOne(id) {
        return await this.findOneEntity(id);
    }
    async update(id, updateEmailAlertDto) {
        const emailAlert = await this.findOneEntity(id);
        Object.assign(emailAlert, updateEmailAlertDto);
        return await this.emailAlertRepository.save(emailAlert);
    }
    async remove(id) {
        const emailAlert = await this.findOneEntity(id);
        return await this.emailAlertRepository.remove(emailAlert);
    }
    async sendEmail(to, subject, body) {
        try {
            const htmlBody = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${subject}</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px;">
            ${body.replace(/\n/g, '<br>')}
          </div>
        </body>
        </html>
      `;
            const recipients = to.split(',').map((email) => email.trim());
            await this.emailService.sendGenericEmail(recipients, subject, htmlBody);
            this.logger.log(`Email sent successfully to ${to}`);
            return {
                success: true,
                message: `Email sent successfully to ${to}`,
            };
        }
        catch (error) {
            this.logger.error(`Failed to send email to ${to}:`, error);
            throw error;
        }
    }
};
exports.EmailAlertService = EmailAlertService;
exports.EmailAlertService = EmailAlertService = EmailAlertService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(email_alert_entity_1.EmailAlert)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        email_service_1.EmailService])
], EmailAlertService);
//# sourceMappingURL=email-alert.service.js.map