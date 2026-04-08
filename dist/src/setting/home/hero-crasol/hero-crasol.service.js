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
exports.HeroCrasolService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const hero_crasol_entity_1 = require("./entities/hero-crasol.entity");
let HeroCrasolService = class HeroCrasolService {
    constructor(heroCrasolRepository) {
        this.heroCrasolRepository = heroCrasolRepository;
    }
    async create(createHeroCrasolDto) {
        return this.heroCrasolRepository.save(createHeroCrasolDto);
    }
    findAll() {
        return this.heroCrasolRepository.find();
    }
    findOne(id) {
        return this.heroCrasolRepository.findOneBy({ id });
    }
    async update(id, updateHeroCrasolDto) {
        await this.heroCrasolRepository.update(id, updateHeroCrasolDto);
        return this.heroCrasolRepository.findOneBy({ id });
    }
    remove(id) {
        return this.heroCrasolRepository.delete(id);
    }
};
exports.HeroCrasolService = HeroCrasolService;
exports.HeroCrasolService = HeroCrasolService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(hero_crasol_entity_1.HeroCrasol)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], HeroCrasolService);
//# sourceMappingURL=hero-crasol.service.js.map