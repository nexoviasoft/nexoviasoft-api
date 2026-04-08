"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddOrderIdToOrders1681234567890 = void 0;
const typeorm_1 = require("typeorm");
class AddOrderIdToOrders1681234567890 {
    async up(queryRunner) {
        await queryRunner.addColumn('orders', new typeorm_1.TableColumn({
            name: 'orderId',
            type: 'varchar',
            isNullable: true,
        }));
        await queryRunner.query(`UPDATE "orders" SET "orderId" = 'some_default_value' WHERE "orderId" IS NULL`);
        await queryRunner.changeColumn('orders', 'orderId', new typeorm_1.TableColumn({
            name: 'orderId',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
        }));
        await queryRunner.createUniqueConstraint('orders', new typeorm_1.TableUnique({ name: 'UQ_orders_orderId', columnNames: ['orderId'] }));
    }
    async down(queryRunner) {
        await queryRunner.dropUniqueConstraint('orders', 'UQ_orders_orderId');
        await queryRunner.dropColumn('orders', 'orderId');
    }
}
exports.AddOrderIdToOrders1681234567890 = AddOrderIdToOrders1681234567890;
//# sourceMappingURL=1681234567890-AddOrderIdToOrders.js.map