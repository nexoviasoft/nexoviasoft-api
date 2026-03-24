import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderMessageDto } from './dto/create-order-message.dto';
import { OrderMessage } from './entities/order-message.entity';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderMessagesService {
  constructor(
    @InjectRepository(OrderMessage)
    private readonly messageRepository: Repository<OrderMessage>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async create(createOrderMessageDto: CreateOrderMessageDto) {
    const order = await this.orderRepository.findOne({
      where: { id: createOrderMessageDto.orderId },
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${createOrderMessageDto.orderId} not found`);
    }

    const message = this.messageRepository.create(createOrderMessageDto);
    const savedMessage = await this.messageRepository.save(message);
    return this.formatMessageResponse(savedMessage);
  }

  async findAll(orderId: number) {
    const messages = await this.messageRepository.find({
      where: { orderId },
      order: { createdAt: 'ASC' },
    });

    return messages.map((message) => this.formatMessageResponse(message));
  }

  async findOne(id: number) {
    const message = await this.messageRepository.findOne({
      where: { id },
    });

    if (!message) {
      throw new NotFoundException(`Message with ID ${id} not found`);
    }

    return this.formatMessageResponse(message);
  }

  async remove(id: number) {
    const message = await this.messageRepository.findOne({
      where: { id },
    });

    if (!message) {
      throw new NotFoundException(`Message with ID ${id} not found`);
    }

    await this.messageRepository.remove(message);
    return { message: `Message with ID ${id} has been deleted` };
  }

  private formatMessageResponse(message: OrderMessage) {
    return {
      id: message.id,
      orderId: message.orderId,
      senderType: message.senderType,
      senderId: message.senderId,
      senderName: message.senderName,
      senderAvatar: message.senderAvatar,
      message: message.message,
      attachments: message.attachments || [],
      createdAt: message.createdAt,
    };
  }
}
