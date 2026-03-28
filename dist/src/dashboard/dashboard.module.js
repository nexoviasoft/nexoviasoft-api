"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const attendance_entity_1 = require("../attendance/entities/attendance.entity");
const leave_entity_1 = require("../leave/entities/leave.entity");
const meeting_entity_1 = require("../meeting/entities/meeting.entity");
const order_entity_1 = require("../order/entities/order.entity");
const payroll_entity_1 = require("../payroll/entities/payroll.entity");
const schedule_entity_1 = require("../schedule/entities/schedule.entity");
const our_client_entity_1 = require("../setting/our-client/entities/our-client.entity");
const dashboard_controller_1 = require("./dashboard.controller");
const dashboard_service_1 = require("./dashboard.service");
const expense_entity_1 = require("../expense/entities/expense.entity");
let DashboardModule = class DashboardModule {
};
exports.DashboardModule = DashboardModule;
exports.DashboardModule = DashboardModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                our_client_entity_1.OurClient,
                order_entity_1.Order,
                payroll_entity_1.Payroll,
                attendance_entity_1.Attendance,
                leave_entity_1.Leave,
                meeting_entity_1.Meeting,
                schedule_entity_1.Schedule,
                expense_entity_1.Expense,
            ]),
        ],
        controllers: [dashboard_controller_1.DashboardController],
        providers: [dashboard_service_1.DashboardService],
    })
], DashboardModule);
//# sourceMappingURL=dashboard.module.js.map