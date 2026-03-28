import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderMessagesService } from './order-messages.service';
import { OrderMessagesController } from './order-messages.controller';
import { OrderTrackingService } from './order-tracking.service';
import { OrderTrackingController } from './order-tracking.controller';
import { Order } from './entities/order.entity';
import { OrderMessage } from './entities/order-message.entity';
import { OrderTracking } from './entities/order-tracking.entity';
import { OurClient } from '../setting/our-client/entities/our-client.entity';
import { Category } from '../setting/category/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderMessage, OrderTracking, OurClient, Category])],
  controllers: [OrderController, OrderMessagesController, OrderTrackingController],
  providers: [OrderService, OrderMessagesService, OrderTrackingService],
  exports: [OrderService, OrderMessagesService, OrderTrackingService],
})
export class OrderModule {}
