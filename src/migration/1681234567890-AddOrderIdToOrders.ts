import { MigrationInterface, QueryRunner, TableColumn, TableUnique } from 'typeorm';

export class AddOrderIdToOrders1681234567890 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. Add the new column as nullable without default
    await queryRunner.addColumn(
      'orders',
      new TableColumn({
        name: 'orderId',
        type: 'varchar',
        isNullable: true,
      }),
    );

    // 2. Populate existing rows with a default value (you can customize the logic)
    await queryRunner.query(`UPDATE "orders" SET "orderId" = 'some_default_value' WHERE "orderId" IS NULL`);

    // 3. Alter column to be NOT NULL and unique
    await queryRunner.changeColumn(
      'orders',
      'orderId',
      new TableColumn({
        name: 'orderId',
        type: 'varchar',
        isNullable: false,
        isUnique: true,
      }),
    );

    // 4. Add unique constraint (ensures uniqueness at DB level)
    await queryRunner.createUniqueConstraint(
      'orders',
      new TableUnique({ name: 'UQ_orders_orderId', columnNames: ['orderId'] }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop unique constraint first
    await queryRunner.dropUniqueConstraint('orders', 'UQ_orders_orderId');
    // Then drop the column
    await queryRunner.dropColumn('orders', 'orderId');
  }
}
