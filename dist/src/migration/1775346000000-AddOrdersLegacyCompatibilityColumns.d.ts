import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddOrdersLegacyCompatibilityColumns1775346000000 implements MigrationInterface {
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
