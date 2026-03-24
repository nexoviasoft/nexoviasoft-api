import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderTrackingDto } from './dto/create-order-tracking.dto';
import { OrderTracking } from './entities/order-tracking.entity';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderTrackingService {
  constructor(
    @InjectRepository(OrderTracking)
    private readonly trackingRepository: Repository<OrderTracking>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async create(createOrderTrackingDto: CreateOrderTrackingDto) {
    const order = await this.orderRepository.findOne({
      where: { id: createOrderTrackingDto.orderId },
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${createOrderTrackingDto.orderId} not found`);
    }

    // Update order status/progress if provided
    if (createOrderTrackingDto.status !== undefined) {
      order.status = createOrderTrackingDto.status;
    }
    if (createOrderTrackingDto.progress !== undefined) {
      order.progress = createOrderTrackingDto.progress;
    }
    await this.orderRepository.save(order);

    // Create tracking record
    const tracking = this.trackingRepository.create(createOrderTrackingDto);
    const savedTracking = await this.trackingRepository.save(tracking);
    return this.formatTrackingResponse(savedTracking);
  }

  async findAll(orderId: number) {
    const trackingRecords = await this.trackingRepository.find({
      where: { orderId },
      order: { createdAt: 'DESC' },
    });

    return trackingRecords.map((tracking) => this.formatTrackingResponse(tracking));
  }

  async findOne(id: number) {
    const tracking = await this.trackingRepository.findOne({
      where: { id },
    });

    if (!tracking) {
      throw new NotFoundException(`Tracking record with ID ${id} not found`);
    }

    return this.formatTrackingResponse(tracking);
  }

  async remove(id: number) {
    const tracking = await this.trackingRepository.findOne({
      where: { id },
    });

    if (!tracking) {
      throw new NotFoundException(`Tracking record with ID ${id} not found`);
    }

    await this.trackingRepository.remove(tracking);
    return { message: `Tracking record with ID ${id} has been deleted` };
  }

  private formatTrackingResponse(tracking: OrderTracking) {
    return {
      id: tracking.id,
      orderId: tracking.orderId,
      status: tracking.status,
      progress: tracking.progress,
      note: tracking.note,
      createdBy: tracking.createdBy,
      createdByName: tracking.createdByName,
      createdAt: tracking.createdAt,
    };
  }
}
