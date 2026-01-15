import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OurServiceService } from './our-service.service';
import { OurServiceController } from './our-service.controller';
import { OurService } from './entities/our-service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OurService])],
  controllers: [OurServiceController],
  providers: [OurServiceService],
})
export class OurServiceModule {}
