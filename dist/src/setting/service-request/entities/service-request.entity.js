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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRequest = void 0;
const typeorm_1 = require("typeorm");
const our_client_entity_1 = require("../../our-client/entities/our-client.entity");
const price_package_entity_1 = require("../../home/price-package/entities/price-package.entity");
const our_service_entity_1 = require("../../our-service/entities/our-service.entity");
let ServiceRequest = class ServiceRequest {
};
exports.ServiceRequest = ServiceRequest;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ServiceRequest.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => our_client_entity_1.OurClient, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'clientId' }),
    __metadata("design:type", our_client_entity_1.OurClient)
], ServiceRequest.prototype, "client", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], ServiceRequest.prototype, "clientId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => price_package_entity_1.PricePackage, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'pricePackageId' }),
    __metadata("design:type", price_package_entity_1.PricePackage)
], ServiceRequest.prototype, "pricePackage", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], ServiceRequest.prototype, "pricePackageId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => our_service_entity_1.OurService, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'serviceId' }),
    __metadata("design:type", our_service_entity_1.OurService)
], ServiceRequest.prototype, "service", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], ServiceRequest.prototype, "serviceId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ServiceRequest.prototype, "serviceType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], ServiceRequest.prototype, "message", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ServiceRequest.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ServiceRequest.prototype, "updatedAt", void 0);
exports.ServiceRequest = ServiceRequest = __decorate([
    (0, typeorm_1.Entity)('service_requests')
], ServiceRequest);
//# sourceMappingURL=service-request.entity.js.map