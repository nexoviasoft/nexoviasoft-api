"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailAlertModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const email_alert_service_1 = require("./email-alert.service");
const email_alert_controller_1 = require("./email-alert.controller");
const email_alert_entity_1 = require("./entities/email-alert.entity");
const common_module_1 = require("../common/common.module");
let EmailAlertModule = class EmailAlertModule {
};
exports.EmailAlertModule = EmailAlertModule;
exports.EmailAlertModule = EmailAlertModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([email_alert_entity_1.EmailAlert]),
            common_module_1.CommonModule,
        ],
        controllers: [email_alert_controller_1.EmailAlertController],
        providers: [email_alert_service_1.EmailAlertService],
        exports: [email_alert_service_1.EmailAlertService],
    })
], EmailAlertModule);
//# sourceMappingURL=email-alert.module.js.map