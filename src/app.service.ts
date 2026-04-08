import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class AppService implements OnModuleInit {
  private readonly logger = new Logger(AppService.name);

  constructor(private readonly dataSource: DataSource) {}

  async onModuleInit(): Promise<void> {
    // Runtime safety net for mixed legacy schemas in production.
    try {
      await this.dataSource.query(`ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "orderId" varchar`);
      await this.dataSource.query(`ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "orderInfo" varchar`);
      await this.dataSource.query(`ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "clientId" integer`);
      await this.dataSource.query(`ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "clientInfo" integer`);
      await this.dataSource.query(`ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "categoryId" integer`);
      await this.dataSource.query(`ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "categoryInfo" integer`);

      await this.dataSource.query(
        `UPDATE "orders" SET "orderId" = "orderInfo" WHERE "orderId" IS NULL AND "orderInfo" IS NOT NULL`,
      );
      await this.dataSource.query(
        `UPDATE "orders" SET "orderInfo" = "orderId" WHERE "orderInfo" IS NULL AND "orderId" IS NOT NULL`,
      );
      await this.dataSource.query(
        `UPDATE "orders" SET "clientId" = "clientInfo" WHERE "clientId" IS NULL AND "clientInfo" IS NOT NULL`,
      );
      await this.dataSource.query(
        `UPDATE "orders" SET "clientInfo" = "clientId" WHERE "clientInfo" IS NULL AND "clientId" IS NOT NULL`,
      );
      await this.dataSource.query(
        `UPDATE "orders" SET "categoryId" = "categoryInfo" WHERE "categoryId" IS NULL AND "categoryInfo" IS NOT NULL`,
      );
      await this.dataSource.query(
        `UPDATE "orders" SET "categoryInfo" = "categoryId" WHERE "categoryInfo" IS NULL AND "categoryId" IS NOT NULL`,
      );
    } catch (error) {
      this.logger.warn(`Orders compatibility sync skipped: ${(error as Error).message}`);
    }
  }

  getHello(): string {
    return 'Hello World!';
  }
}