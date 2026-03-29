import { Injectable, NotFoundException, ConflictException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order, OrderStatus } from './entities/order.entity';
import { EmailService } from '../common/services/email.service';

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);

  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly emailService: EmailService,
  ) { }

  async create(createOrderDto: CreateOrderDto) {
    // Generate orderId if not provided
    let orderId = createOrderDto.orderId;
    if (!orderId) {
      orderId = await this.generateUniqueOrderId();
    } else {
      // Check if provided orderId already exists
      const existingOrder = await this.orderRepository.findOne({
        where: { orderId },
      });

      if (existingOrder) {
        throw new ConflictException({
          statusCode: HttpStatus.CONFLICT,
          message: `Order with ID ${orderId} already exists`,
        });
      }
    }

    const order = this.orderRepository.create({
      ...createOrderDto,
      orderId,
      date: createOrderDto.date ? new Date(createOrderDto.date) : new Date(),
    });

    const savedOrder = await this.orderRepository.save(order);

    // Load client relation to get email
    const orderWithClient = await this.orderRepository.findOne({
      where: { id: savedOrder.id },
      relations: ['client'],
    });

    // Send confirmation email to client if email exists
    if (orderWithClient?.client?.email) {
      try {
        // Handle date formatting - date might be a Date object or string
        let orderDate: string;
        if (orderWithClient.date) {
          const dateObj = orderWithClient.date instanceof Date
            ? orderWithClient.date
            : new Date(orderWithClient.date);

          if (!isNaN(dateObj.getTime())) {
            orderDate = dateObj.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            });
          } else {
            orderDate = new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            });
          }
        } else {
          orderDate = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          });
        }

        const frontendUrl = process.env.FRONTEND_URL || 'https://admin.nexoviasoft.com';
        const orderUrl = `${frontendUrl}/admin/orders/${savedOrder.id}`;

        await this.emailService.sendOrderConfirmation(
          orderWithClient.client.email,
          orderWithClient.client.name || 'Valued Client',
          orderId,
          orderWithClient.service,
          Number(orderWithClient.amount),
          orderDate,
          orderUrl,
        );
        this.logger.log(
          `Order confirmation email sent to ${orderWithClient.client.email} for order ${orderId}`,
        );
      } catch (error) {
        this.logger.error(
          `Failed to send order confirmation email for order ${orderId}:`,
          error,
        );
        // Don't throw error - order is already created
      }
    } else {
      this.logger.warn(
        `No client email found for order ${orderId}, skipping email notification`,
      );
    }

    return savedOrder;
  }

  private async generateUniqueOrderId(): Promise<string> {
    let orderId: string;
    let isUnique = false;
    let attempts = 0;
    const maxAttempts = 10;

    while (!isUnique && attempts < maxAttempts) {
      const randomNum = Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, '0');
      orderId = `ORD-${randomNum}`;

      const existingOrder = await this.orderRepository.findOne({
        where: { orderId },
      });

      if (!existingOrder) {
        isUnique = true;
      }
      attempts++;
    }

    if (!isUnique) {
      // Fallback: use timestamp-based ID
      const timestamp = Date.now().toString().slice(-6);
      orderId = `ORD-${timestamp}`;
    }

    return orderId!;
  }

  async findAll() {
    return this.orderRepository.find({
      relations: ['client', 'category'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number) {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['client', 'category'],
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return order;
  }

  async findByOrderId(orderId: string) {
    const order = await this.orderRepository.findOne({
      where: { orderId },
      relations: ['client', 'category'],
    });

    if (!order) {
      throw new NotFoundException(`Order with orderId ${orderId} not found`);
    }

    return order;
  }

  async getStats() {
    const [total, inProgress, completed, allOrders] = await Promise.all([
      this.orderRepository.count(),
      this.orderRepository.count({ where: { status: OrderStatus.IN_PROGRESS } }),
      this.orderRepository.count({ where: { status: OrderStatus.COMPLETED } }),
      this.orderRepository.find({ select: ['amount'] }),
    ]);

    const totalRevenue = allOrders.reduce((sum, order) => sum + Number(order.amount || 0), 0);

    return {
      total,
      inProgress,
      completed,
      totalRevenue,
    };
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.findOne(id);

    // Check if orderId is being updated and if it already exists
    if (updateOrderDto.orderId && updateOrderDto.orderId !== order.orderId) {
      const existingOrder = await this.orderRepository.findOne({
        where: { orderId: updateOrderDto.orderId },
      });

      if (existingOrder) {
        throw new ConflictException({
          statusCode: HttpStatus.CONFLICT,
          message: `Order with ID ${updateOrderDto.orderId} already exists`,
        });
      }
    }

    // Convert date string to Date if provided
    const updateData: any = { ...updateOrderDto };
    if (updateOrderDto.date) {
      updateData.date = new Date(updateOrderDto.date);
    }

    Object.assign(order, updateData);
    return this.orderRepository.save(order);
  }

  async remove(id: number) {
    const order = await this.findOne(id);
    return this.orderRepository.remove(order);
  }
}
