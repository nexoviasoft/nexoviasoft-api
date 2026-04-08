import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddMissingOrdersColumnsForLegacySchema1775350200000 implements MigrationInterface {
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
