"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const health_module_1 = require("./health/health.module");
const hero_crasol_module_1 = require("./setting/home/hero-crasol/hero-crasol.module");
const case_studies_module_1 = require("./setting/home/case-studies/case-studies.module");
const category_module_1 = require("./setting/category/category.module");
const price_package_module_1 = require("./setting/home/price-package/price-package.module");
const department_module_1 = require("./setting/department/department.module");
const our_team_module_1 = require("./setting/home/our-team/our-team.module");
const our_client_module_1 = require("./setting/our-client/our-client.module");
const customer_review_module_1 = require("./setting/home/customer-review/customer-review.module");
const footer_module_1 = require("./setting/footer/footer.module");
const common_module_1 = require("./common/common.module");
const service_request_module_1 = require("./setting/service-request/service-request.module");
const our_service_module_1 = require("./setting/our-service/our-service.module");
const our_product_module_1 = require("./setting/our-product/our-product.module");
const attendance_module_1 = require("./attendance/attendance.module");
const schedule_module_1 = require("./schedule/schedule.module");
const projects_module_1 = require("./projects/projects.module");
const auth_module_1 = require("./auth/auth.module");
const order_module_1 = require("./order/order.module");
const leave_module_1 = require("./leave/leave.module");
const documents_module_1 = require("./documents/documents.module");
const email_alert_module_1 = require("./email-alert/email-alert.module");
const reqcuitment_module_1 = require("./reqcuitment/reqcuitment.module");
const payroll_module_1 = require("./payroll/payroll.module");
const reports_module_1 = require("./reports/reports.module");
const broadcast_module_1 = require("./broadcast/broadcast.module");
const meeting_module_1 = require("./meeting/meeting.module");
const dashboard_module_1 = require("./dashboard/dashboard.module");
const expense_module_1 = require("./expense/expense.module");
const income_module_1 = require("./income/income.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            common_module_1.CommonModule,
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (config) => {
                    return {
                        type: 'postgres',
                        url: config.get('DATABASE_URL'),
                        autoLoadEntities: true,
                        synchronize: false,
                        ssl: {
                            rejectUnauthorized: true,
                        },
                        connectTimeoutMS: 30000,
                        extra: {
                            connectionTimeoutMillis: 30000,
                            keepAlive: true,
                        },
                    };
                },
            }),
            hero_crasol_module_1.HeroCrasolModule,
            health_module_1.HealthModule,
            case_studies_module_1.CaseStudiesModule,
            category_module_1.CategoryModule,
            price_package_module_1.PricePackageModule,
            department_module_1.DepartmentModule,
            our_team_module_1.OurTeamModule,
            our_client_module_1.OurClientModule,
            customer_review_module_1.CustomerReviewModule,
            footer_module_1.FooterModule,
            service_request_module_1.ServiceRequestModule,
            our_service_module_1.OurServiceModule,
            our_product_module_1.OurProductModule,
            attendance_module_1.AttendanceModule,
            schedule_module_1.ScheduleModule,
            projects_module_1.ProjectsModule,
            auth_module_1.AuthModule,
            order_module_1.OrderModule,
            leave_module_1.LeaveModule,
            documents_module_1.DocumentsModule,
            email_alert_module_1.EmailAlertModule,
            reqcuitment_module_1.ReqcuitmentModule,
            payroll_module_1.PayrollModule,
            reports_module_1.ReportsModule,
            broadcast_module_1.BroadcastModule,
            meeting_module_1.MeetingModule,
            dashboard_module_1.DashboardModule,
            expense_module_1.ExpenseModule,
            income_module_1.IncomeModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map