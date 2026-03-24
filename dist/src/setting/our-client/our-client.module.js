"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OurClientModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const our_client_service_1 = require("./our-client.service");
const our_client_controller_1 = require("./our-client.controller");
const our_client_entity_1 = require("./entities/our-client.entity");
let OurClientModule = class OurClientModule {
};
exports.OurClientModule = OurClientModule;
exports.OurClientModule = OurClientModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([our_client_entity_1.OurClient])],
        controllers: [our_client_controller_1.OurClientController],
        providers: [our_client_service_1.OurClientService],
        exports: [our_client_service_1.OurClientService],
    })
], OurClientModule);
//# sourceMappingURL=our-client.module.js.map