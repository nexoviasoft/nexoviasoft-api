import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HealthModule } from './health/health.module';
import { HeroCrasolModule } from './setting/home/hero-crasol/hero-crasol.module';

@Module({
  imports: [
    // ENV config
    ConfigModule.forRoot({
      isGlobal: true,
    }),

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
      }),
    }),

    // Health check module

    HeroCrasolModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
