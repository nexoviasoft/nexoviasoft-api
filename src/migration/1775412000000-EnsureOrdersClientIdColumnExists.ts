import { MigrationInterface, QueryRunner } from 'typeorm';

export class EnsureOrdersClientIdColumnExists1775412000000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
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

  public async down(queryRunner: QueryRunner): Promise<void> {
    // No-op: keep column for compatibility with deployed builds.
    await queryRunner.query(`SELECT 1`);
  }
}
