import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMissingOrdersColumnsForLegacySchema1775350200000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1
          FROM pg_type
          WHERE typname = 'orders_status_enum'
        ) THEN
          CREATE TYPE "orders_status_enum" AS ENUM ('Pending', 'In Progress', 'Review', 'Completed');
        END IF;
      END $$;
    `);

    await queryRunner.query(`ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "service" varchar`);
    await queryRunner.query(`ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "amount" numeric(10,2)`);
    await queryRunner.query(`
      ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "status" "orders_status_enum" DEFAULT 'Pending'
    `);
    await queryRunner.query(`ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "progress" integer DEFAULT 0`);
    await queryRunner.query(`ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "assignedTo" text`);
    await queryRunner.query(`ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "date" date`);
    await queryRunner.query(`
      ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "paidAmount" numeric(10,2) DEFAULT 0
    `);
    await queryRunner.query(`
      ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "createdAt" TIMESTAMP DEFAULT now()
    `);
    await queryRunner.query(`
      ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "updatedAt" TIMESTAMP DEFAULT now()
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN IF EXISTS "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN IF EXISTS "createdAt"`);
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN IF EXISTS "paidAmount"`);
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN IF EXISTS "date"`);
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN IF EXISTS "assignedTo"`);
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN IF EXISTS "progress"`);
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN IF EXISTS "status"`);
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN IF EXISTS "amount"`);
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN IF EXISTS "service"`);
  }
}
