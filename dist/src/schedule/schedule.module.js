"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const schedule_service_1 = require("./schedule.service");
const schedule_controller_1 = require("./schedule.controller");
const schedule_entity_1 = require("./entities/schedule.entity");
const our_team_entity_1 = require("../setting/home/our-team/entities/our-team.entity");
let ScheduleModule = class ScheduleModule {
};
exports.ScheduleModule = ScheduleModule;
exports.ScheduleModule = ScheduleModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([schedule_entity_1.Schedule, our_team_entity_1.OurTeam])],
        controllers: [schedule_controller_1.ScheduleController],
        providers: [schedule_service_1.ScheduleService],
    })
], ScheduleModule);
//# sourceMappingURL=schedule.module.js.map