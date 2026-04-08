"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncomeModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const income_service_1 = require("./income.service");
const income_controller_1 = require("./income.controller");
const income_entity_1 = require("./entities/income.entity");
const order_entity_1 = require("../order/entities/order.entity");
const our_client_entity_1 = require("../setting/our-client/entities/our-client.entity");
const common_module_1 = require("../common/common.module");
let IncomeModule = class IncomeModule {
};
exports.IncomeModule = IncomeModule;
exports.IncomeModule = IncomeModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([income_entity_1.Income, order_entity_1.Order, our_client_entity_1.OurClient]),
            common_module_1.CommonModule,
        ],
        controllers: [income_controller_1.IncomeController],
        providers: [income_service_1.IncomeService],
        exports: [income_service_1.IncomeService],
    })
], IncomeModule);
//# sourceMappingURL=income.module.js.map