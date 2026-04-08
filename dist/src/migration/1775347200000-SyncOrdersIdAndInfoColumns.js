"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyncOrdersIdAndInfoColumns1775347200000 = void 0;
class SyncOrdersIdAndInfoColumns1775347200000 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "orderId" varchar`);
        await queryRunner.query(`ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "orderInfo" varchar`);
        await queryRunner.query(`ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "clientId" integer`);
        await queryRunner.query(`ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "clientInfo" integer`);
        await queryRunner.query(`ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "categoryId" integer`);
        await queryRunner.query(`ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "categoryInfo" integer`);
        await queryRunner.query(`
      UPDATE "orders"
      SET "orderId" = "orderInfo"
      WHERE "orderId" IS NULL AND "orderInfo" IS NOT NULL
    `);
        await queryRunner.query(`
      UPDATE "orders"
      SET "orderInfo" = "orderId"
      WHERE "orderInfo" IS NULL AND "orderId" IS NOT NULL
    `);
        await queryRunner.query(`
      UPDATE "orders"
      SET "clientId" = "clientInfo"
      WHERE "clientId" IS NULL AND "clientInfo" IS NOT NULL
    `);
        await queryRunner.query(`
      UPDATE "orders"
      SET "clientInfo" = "clientId"
      WHERE "clientInfo" IS NULL AND "clientId" IS NOT NULL
    `);
        await queryRunner.query(`
      UPDATE "orders"
      SET "categoryId" = "categoryInfo"
      WHERE "categoryId" IS NULL AND "categoryInfo" IS NOT NULL
    `);
        await queryRunner.query(`
      UPDATE "orders"
      SET "categoryInfo" = "categoryId"
      WHERE "categoryInfo" IS NULL AND "categoryId" IS NOT NULL
    `);
    }
    async down() {
    }
}
exports.SyncOrdersIdAndInfoColumns1775347200000 = SyncOrdersIdAndInfoColumns1775347200000;
//# sourceMappingURL=1775347200000-SyncOrdersIdAndInfoColumns.js.map