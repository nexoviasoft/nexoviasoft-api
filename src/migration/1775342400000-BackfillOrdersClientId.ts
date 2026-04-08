import { MigrationInterface, QueryRunner } from 'typeorm';

export class BackfillOrdersClientId1775342400000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const nullClientRows = await queryRunner.query(
      `SELECT COUNT(*)::int AS count FROM "orders" WHERE "clientId" IS NULL`,
    );
    const missingCount = Number(nullClientRows?.[0]?.count ?? 0);

    if (missingCount > 0) {
      const tableNameResult = await queryRunner.query(`
        SELECT CASE
          WHEN to_regclass('public."our_client"') IS NOT NULL THEN 'our_client'
          WHEN to_regclass('public."ourclient"') IS NOT NULL THEN 'ourclient'
          ELSE NULL
        END AS table_name
      `);

      const clientTableName = tableNameResult?.[0]?.table_name;
      if (!clientTableName) {
        throw new Error(
          'Could not find clients table (expected "our_client" or "ourclient") while backfilling orders.clientId.',
        );
      }

      const firstClient = await queryRunner.query(
        `SELECT "id" FROM "${clientTableName}" ORDER BY "id" ASC LIMIT 1`,
      );

      if (!firstClient?.length || firstClient[0].id == null) {
        throw new Error(
          'Cannot backfill orders.clientId because no client rows exist. Create a client first, then rerun migration.',
        );
      }

      const fallbackClientId = Number(firstClient[0].id);
      await queryRunner.query(
        `UPDATE "orders" SET "clientId" = $1 WHERE "clientId" IS NULL`,
        [fallbackClientId],
      );
    }

    await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "clientId" SET NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "clientId" DROP NOT NULL`);
  }
}
