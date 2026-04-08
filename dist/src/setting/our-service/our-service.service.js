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
exports.OurServiceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const our_service_entity_1 = require("./entities/our-service.entity");
let OurServiceService = class OurServiceService {
    constructor(ourServiceRepository) {
        this.ourServiceRepository = ourServiceRepository;
    }
    async create(createOurServiceDto) {
        const service = this.ourServiceRepository.create(createOurServiceDto);
        return this.ourServiceRepository.save(service);
    }
    async findAll() {
        return this.ourServiceRepository.find({
            relations: ['category'],
        });
    }
    async findOne(id) {
        const service = await this.ourServiceRepository.findOne({
            where: { id },
            relations: ['category'],
        });
        if (!service) {
            throw new common_1.NotFoundException(`Service with ID ${id} not found`);
        }
        return service;
    }
    async update(id, updateOurServiceDto) {
        const service = await this.findOne(id);
        Object.assign(service, updateOurServiceDto);
        return this.ourServiceRepository.save(service);
    }
    async remove(id) {
        const service = await this.findOne(id);
        return this.ourServiceRepository.remove(service);
    }
};
exports.OurServiceService = OurServiceService;
exports.OurServiceService = OurServiceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(our_service_entity_1.OurService)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], OurServiceService);
//# sourceMappingURL=our-service.service.js.map