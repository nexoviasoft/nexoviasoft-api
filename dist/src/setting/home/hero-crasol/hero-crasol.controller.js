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
exports.HeroCrasolController = void 0;
const common_1 = require("@nestjs/common");
const hero_crasol_service_1 = require("./hero-crasol.service");
const create_hero_crasol_dto_1 = require("./dto/create-hero-crasol.dto");
const update_hero_crasol_dto_1 = require("./dto/update-hero-crasol.dto");
let HeroCrasolController = class HeroCrasolController {
    constructor(heroCrasolService) {
        this.heroCrasolService = heroCrasolService;
    }
    async create(createHeroCrasolDto) {
        const data = await this.heroCrasolService.create(createHeroCrasolDto);
        return {
            statusCode: common_1.HttpStatus.CREATED,
            message: 'Hero Crasol created successfully',
            data,
        };
    }
    async findAll() {
        const data = await this.heroCrasolService.findAll();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Hero Crasols retrieved successfully',
            data,
        };
    }
    async findOne(id) {
        const data = await this.heroCrasolService.findOne(+id);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Hero Crasol retrieved successfully',
            data,
        };
    }
    async update(id, updateHeroCrasolDto) {
        const data = await this.heroCrasolService.update(+id, updateHeroCrasolDto);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Hero Crasol updated successfully',
            data,
        };
    }
    async remove(id) {
        await this.heroCrasolService.remove(+id);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Hero Crasol deleted successfully',
        };
    }
};
exports.HeroCrasolController = HeroCrasolController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_hero_crasol_dto_1.CreateHeroCrasolDto]),
    __metadata("design:returntype", Promise)
], HeroCrasolController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HeroCrasolController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HeroCrasolController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_hero_crasol_dto_1.UpdateHeroCrasolDto]),
    __metadata("design:returntype", Promise)
], HeroCrasolController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HeroCrasolController.prototype, "remove", null);
exports.HeroCrasolController = HeroCrasolController = __decorate([
    (0, common_1.Controller)('hero-crasol'),
    __metadata("design:paramtypes", [hero_crasol_service_1.HeroCrasolService])
], HeroCrasolController);
//# sourceMappingURL=hero-crasol.controller.js.map