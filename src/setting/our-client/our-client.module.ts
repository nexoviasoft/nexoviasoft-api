import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OurClientService } from './our-client.service';
import { OurClientController } from './our-client.controller';
import { OurClient } from './entities/our-client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OurClient])],
  controllers: [OurClientController],
  providers: [OurClientService],
  exports: [OurClientService],
})
export class OurClientModule {}
