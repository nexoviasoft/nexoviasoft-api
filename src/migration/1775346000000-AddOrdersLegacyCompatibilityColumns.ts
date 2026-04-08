import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddOrdersLegacyCompatibilityColumns1775346000000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
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

  public async down(queryRunner: QueryRunner): Promise<void> {
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
