import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HealthModule } from './health/health.module';
import { HeroCrasolModule } from './setting/home/hero-crasol/hero-crasol.module';
import { CaseStudiesModule } from './setting/home/case-studies/case-studies.module';
import { CategoryModule } from './setting/category/category.module';
import { PricePackageModule } from './setting/home/price-package/price-package.module';
import { DepartmentModule } from './setting/department/department.module';
import { OurTeamModule } from './setting/home/our-team/our-team.module';
import { OurClientModule } from './setting/our-client/our-client.module';
import { CustomerReviewModule } from './setting/home/customer-review/customer-review.module';
import { FooterModule } from './setting/footer/footer.module';
import { CommonModule } from './common/common.module';
import { ServiceRequestModule } from './setting/service-request/service-request.module';
import { OurServiceModule } from './setting/our-service/our-service.module';
import { OurProductModule } from './setting/our-product/our-product.module';


@Module({
  imports: [
    // ENV config
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Common module (CDN upload service)
    CommonModule,

    // Database connection (NeonDB)
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get<string>('DATABASE_URL'),
        autoLoadEntities: true,
        synchronize: true, // ❌ false in production
        ssl: {
          rejectUnauthorized: false,
        },
        connectTimeoutMS: 30000, // 30 seconds
        extra: {
          connectionTimeoutMillis: 30000,
          keepAlive: true,
        },
      }),
    }),

    // Health check module

    HeroCrasolModule,
    HealthModule,
    CaseStudiesModule,
    CategoryModule,
    PricePackageModule,
    DepartmentModule,
    OurTeamModule,
    OurClientModule,
    CustomerReviewModule,
    FooterModule,
    ServiceRequestModule,
    OurServiceModule,
    OurProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
