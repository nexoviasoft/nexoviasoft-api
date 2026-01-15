import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceRequestService } from './service-request.service';
import { ServiceRequestController } from './service-request.controller';
import { ServiceRequest } from './entities/service-request.entity';
import { OurClient } from '../our-client/entities/our-client.entity';
import { PricePackage } from '../home/price-package/entities/price-package.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceRequest, OurClient, PricePackage])],
  controllers: [ServiceRequestController],
  providers: [ServiceRequestService],
  exports: [ServiceRequestService],
})
export class ServiceRequestModule {}
