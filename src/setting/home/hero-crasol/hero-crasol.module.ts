import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeroCrasolService } from './hero-crasol.service';
import { HeroCrasolController } from './hero-crasol.controller';
import { HeroCrasol } from './entities/hero-crasol.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HeroCrasol])],
  controllers: [HeroCrasolController],
  providers: [HeroCrasolService],
})
export class HeroCrasolModule { }
