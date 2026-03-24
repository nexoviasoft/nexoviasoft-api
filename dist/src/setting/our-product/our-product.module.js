"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OurProductModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const our_product_service_1 = require("./our-product.service");
const our_product_controller_1 = require("./our-product.controller");
const our_product_entity_1 = require("./entities/our-product.entity");
let OurProductModule = class OurProductModule {
};
exports.OurProductModule = OurProductModule;
exports.OurProductModule = OurProductModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([our_product_entity_1.OurProduct])],
        controllers: [our_product_controller_1.OurProductController],
        providers: [our_product_service_1.OurProductService],
    })
], OurProductModule);
//# sourceMappingURL=our-product.module.js.map