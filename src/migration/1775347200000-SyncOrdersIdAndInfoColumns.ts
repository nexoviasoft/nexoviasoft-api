import { MigrationInterface, QueryRunner } from 'typeorm';

export class SyncOrdersIdAndInfoColumns1775347200000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Ensure both schema variants exist so old/new builds can run.
    await queryRunner.query(`ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "orderId" varchar`);
    await queryRunner.query(`ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "orderInfo" varchar`);
    await queryRunner.query(`ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "clientId" integer`);
    await queryRunner.query(`ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "clientInfo" integer`);
    await queryRunner.query(`ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "categoryId" integer`);
    await queryRunner.query(`ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "categoryInfo" integer`);

    // Keep values in sync in both directions.
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

  public async down(): Promise<void> {
    // No-op: keep compatibility columns to avoid breaking old deployments.
  }
}
