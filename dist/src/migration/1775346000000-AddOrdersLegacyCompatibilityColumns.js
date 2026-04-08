"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddOrdersLegacyCompatibilityColumns1775346000000 = void 0;
class AddOrdersLegacyCompatibilityColumns1775346000000 {
    async up(queryRunner) {
        await queryRunner.query(`
      ALTER TABLE "orders"
      ADD COLUMN IF NOT EXISTS "orderId" varchar
    `);
        await queryRunner.query(`
      ALTER TABLE "orders"
      ADD COLUMN IF NOT EXISTS "clientId" integer
    `);
        await queryRunner.query(`
      ALTER TABLE "orders"
      ADD COLUMN IF NOT EXISTS "categoryId" integer
    `);
        await queryRunner.query(`
      UPDATE "orders"
      SET "orderId" = "orderInfo"
      WHERE "orderId" IS NULL
        AND "orderInfo" IS NOT NULL
    `);
        await queryRunner.query(`
      UPDATE "orders"
      SET "clientId" = "clientInfo"
      WHERE "clientId" IS NULL
        AND "clientInfo" IS NOT NULL
    `);
        await queryRunner.query(`
      UPDATE "orders"
      SET "categoryId" = "categoryInfo"
      WHERE "categoryId" IS NULL
        AND "categoryInfo" IS NOT NULL
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
      ALTER TABLE "orders" DROP COLUMN IF EXISTS "categoryId"
    `);
        await queryRunner.query(`
      ALTER TABLE "orders" DROP COLUMN IF EXISTS "clientId"
    `);
        await queryRunner.query(`
      ALTER TABLE "orders" DROP COLUMN IF EXISTS "orderId"
    `);
    }
}
exports.AddOrdersLegacyCompatibilityColumns1775346000000 = AddOrdersLegacyCompatibilityColumns1775346000000;
//# sourceMappingURL=1775346000000-AddOrdersLegacyCompatibilityColumns.js.map