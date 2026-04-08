import { MigrationInterface, QueryRunner, TableColumn, TableUnique } from 'typeorm';

export class AddOrderIdToOrders1681234567890 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add the new column with a temporary default value
    await queryRunner.addColumn(
      'orders',
      new TableColumn({
        name: 'orderId',
        type: 'varchar',
        isNullable: true, // allow null initially for existing rows
        default: `'some_default_value'`,
      }),
    );

    // Populate existing rows (if needed, already set by default)
    // Ensure NOT NULL constraint
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

    // Add unique constraint (if not covered by isUnique above)
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
