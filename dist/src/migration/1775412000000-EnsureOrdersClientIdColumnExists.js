"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnsureOrdersClientIdColumnExists1775412000000 = void 0;
class EnsureOrdersClientIdColumnExists1775412000000 {
    async up(queryRunner) {
        await queryRunner.query(`
      ALTER TABLE "orders"
      ADD COLUMN IF NOT EXISTS "clientId" integer
    `);
        await queryRunner.query(`
      UPDATE "orders"
      SET "clientId" = "clientInfo"
      WHERE "clientId" IS NULL
        AND "clientInfo" IS NOT NULL
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`SELECT 1`);
    }
}
exports.EnsureOrdersClientIdColumnExists1775412000000 = EnsureOrdersClientIdColumnExists1775412000000;
//# sourceMappingURL=1775412000000-EnsureOrdersClientIdColumnExists.js.map