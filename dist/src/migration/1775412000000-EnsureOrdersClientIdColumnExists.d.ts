import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class EnsureOrdersClientIdColumnExists1775412000000 implements MigrationInterface {
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
