import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OurProductService } from './our-product.service';
import { OurProductController } from './our-product.controller';
import { OurProduct } from './entities/our-product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OurProduct])],
  controllers: [OurProductController],
  providers: [OurProductService],
})
export class OurProductModule {}
