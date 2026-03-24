import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { OrderTrackingService } from './order-tracking.service';
import { CreateOrderTrackingDto } from './dto/create-order-tracking.dto';

@Controller('order-tracking')
export class OrderTrackingController {
  constructor(private readonly orderTrackingService: OrderTrackingService) {}

  @Post()
  create(@Body() createOrderTrackingDto: CreateOrderTrackingDto) {
    return this.orderTrackingService.create(createOrderTrackingDto);
  }

  @Get('order/:orderId')
  findAllByOrder(@Param('orderId') orderId: string) {
    return this.orderTrackingService.findAll(+orderId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderTrackingService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderTrackingService.remove(+id);
  }
}
