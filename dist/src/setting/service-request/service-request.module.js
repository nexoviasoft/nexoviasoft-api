"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRequestModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const service_request_service_1 = require("./service-request.service");
const service_request_controller_1 = require("./service-request.controller");
const service_request_entity_1 = require("./entities/service-request.entity");
const our_client_entity_1 = require("../our-client/entities/our-client.entity");
const price_package_entity_1 = require("../home/price-package/entities/price-package.entity");
let ServiceRequestModule = class ServiceRequestModule {
};
exports.ServiceRequestModule = ServiceRequestModule;
exports.ServiceRequestModule = ServiceRequestModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([service_request_entity_1.ServiceRequest, our_client_entity_1.OurClient, price_package_entity_1.PricePackage])],
        controllers: [service_request_controller_1.ServiceRequestController],
        providers: [service_request_service_1.ServiceRequestService],
        exports: [service_request_service_1.ServiceRequestService],
    })
], ServiceRequestModule);
//# sourceMappingURL=service-request.module.js.map