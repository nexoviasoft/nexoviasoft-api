import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PricePackageService } from './price-package.service';
import { PricePackageController } from './price-package.controller';
import { PricePackage } from './entities/price-package.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PricePackage])],
  controllers: [PricePackageController],
  providers: [PricePackageService],
  exports: [PricePackageService],
})
export class PricePackageModule { }
