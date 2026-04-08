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
var AppService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let AppService = AppService_1 = class AppService {
    constructor(dataSource) {
        this.dataSource = dataSource;
        this.logger = new common_1.Logger(AppService_1.name);
    }
    async onModuleInit() {
        try {
            await this.dataSource.query(`ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "orderId" varchar`);
            await this.dataSource.query(`ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "orderInfo" varchar`);
            await this.dataSource.query(`ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "clientId" integer`);
            await this.dataSource.query(`ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "clientInfo" integer`);
            await this.dataSource.query(`ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "categoryId" integer`);
            await this.dataSource.query(`ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "categoryInfo" integer`);
            await this.dataSource.query(`UPDATE "orders" SET "orderId" = "orderInfo" WHERE "orderId" IS NULL AND "orderInfo" IS NOT NULL`);
            await this.dataSource.query(`UPDATE "orders" SET "orderInfo" = "orderId" WHERE "orderInfo" IS NULL AND "orderId" IS NOT NULL`);
            await this.dataSource.query(`UPDATE "orders" SET "clientId" = "clientInfo" WHERE "clientId" IS NULL AND "clientInfo" IS NOT NULL`);
            await this.dataSource.query(`UPDATE "orders" SET "clientInfo" = "clientId" WHERE "clientInfo" IS NULL AND "clientId" IS NOT NULL`);
            await this.dataSource.query(`UPDATE "orders" SET "categoryId" = "categoryInfo" WHERE "categoryId" IS NULL AND "categoryInfo" IS NOT NULL`);
            await this.dataSource.query(`UPDATE "orders" SET "categoryInfo" = "categoryId" WHERE "categoryInfo" IS NULL AND "categoryId" IS NOT NULL`);
        }
        catch (error) {
            this.logger.warn(`Orders compatibility sync skipped: ${error.message}`);
        }
    }
    getHello() {
        return 'Hello World!';
    }
};
exports.AppService = AppService;
exports.AppService = AppService = AppService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], AppService);
//# sourceMappingURL=app.service.js.map