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
exports.PricePackageService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const price_package_entity_1 = require("./entities/price-package.entity");
let PricePackageService = class PricePackageService {
    constructor(pricePackageRepository) {
        this.pricePackageRepository = pricePackageRepository;
    }
    async create(createPricePackageDto) {
        return this.pricePackageRepository.save(createPricePackageDto);
    }
    findAll() {
        return this.pricePackageRepository.find();
    }
    findOne(id) {
        return this.pricePackageRepository.findOneBy({ id });
    }
    async update(id, updatePricePackageDto) {
        await this.pricePackageRepository.update(id, updatePricePackageDto);
        return this.pricePackageRepository.findOneBy({ id });
    }
    remove(id) {
        return this.pricePackageRepository.delete(id);
    }
};
exports.PricePackageService = PricePackageService;
exports.PricePackageService = PricePackageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(price_package_entity_1.PricePackage)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PricePackageService);
//# sourceMappingURL=price-package.service.js.map