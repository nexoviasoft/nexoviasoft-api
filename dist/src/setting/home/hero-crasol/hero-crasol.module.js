"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeroCrasolModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const hero_crasol_service_1 = require("./hero-crasol.service");
const hero_crasol_controller_1 = require("./hero-crasol.controller");
const hero_crasol_entity_1 = require("./entities/hero-crasol.entity");
let HeroCrasolModule = class HeroCrasolModule {
};
exports.HeroCrasolModule = HeroCrasolModule;
exports.HeroCrasolModule = HeroCrasolModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([hero_crasol_entity_1.HeroCrasol])],
        controllers: [hero_crasol_controller_1.HeroCrasolController],
        providers: [hero_crasol_service_1.HeroCrasolService],
    })
], HeroCrasolModule);
//# sourceMappingURL=hero-crasol.module.js.map