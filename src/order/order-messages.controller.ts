import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { OrderMessagesService } from './order-messages.service';
import { CreateOrderMessageDto } from './dto/create-order-message.dto';

@Controller('order-messages')
export class OrderMessagesController {
  constructor(private readonly orderMessagesService: OrderMessagesService) {}

  @Post()
  create(@Body() createOrderMessageDto: CreateOrderMessageDto) {
    return this.orderMessagesService.create(createOrderMessageDto);
  }

  @Get('order/:orderId')
  findAllByOrder(@Param('orderId') orderId: string) {
    return this.orderMessagesService.findAll(+orderId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderMessagesService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderMessagesService.remove(+id);
  }
}
