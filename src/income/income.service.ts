import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Income } from './entities/income.entity';
import { CreateIncomeDto, UpdateIncomeDto } from './dto/create-income.dto';
import { Order, OrderStatus } from '../order/entities/order.entity';
import { EmailService } from '../common/services/email.service';
import { OurClient } from '../setting/our-client/entities/our-client.entity';

@Injectable()
export class IncomeService {
  constructor(
    @InjectRepository(Income)
    private readonly incomeRepository: Repository<Income>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OurClient)
    private readonly clientRepository: Repository<OurClient>,
    private readonly emailService: EmailService,
  ) {}

  async create(createIncomeDto: CreateIncomeDto) {
    const income = this.incomeRepository.create(createIncomeDto);
    const savedIncome = await this.incomeRepository.save(income);

    if (createIncomeDto.orderId) {
      const order = await this.orderRepository.findOne({
        where: { id: createIncomeDto.orderId },
        relations: ['client'],
      });

      if (order) {
        order.paidAmount = Number(order.paidAmount || 0) + Number(createIncomeDto.amount);
        
        // Update status to COMPLETED if fully paid
        if (order.paidAmount >= order.amount) {
          order.status = OrderStatus.COMPLETED;
          order.progress = 100;
        }
        
        await this.orderRepository.save(order);

        // Send email with invoice
        if (order.client && order.client.email) {
          try {
            await this.emailService.sendIncomeInvoice(
              order.client.email,
              order.client.name,
              createIncomeDto.amount,
              order.orderId,
              new Date().toLocaleDateString(),
              order.amount - order.paidAmount,
              order.paidAmount
            );
          } catch (error) {
            console.error('Failed to send income invoice email:', error);
          }
        }
      }
    }

    return savedIncome;
  }

  async findAll() {
    return this.incomeRepository.find({
      relations: ['order', 'client'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number) {
    const income = await this.incomeRepository.findOne({
      where: { id },
      relations: ['order', 'client'],
    });
    if (!income) throw new NotFoundException(`Income with ID ${id} not found`);
    return income;
  }

  async update(id: number, updateIncomeDto: UpdateIncomeDto) {
    const income = await this.findOne(id);
    const oldAmount = Number(income.amount);
    const oldOrderId = income.orderId;

    Object.assign(income, updateIncomeDto);
    const updatedIncome = await this.incomeRepository.save(income);

    // Revert old order paidAmount if order changed or amount changed
    if (oldOrderId) {
      const oldOrder = await this.orderRepository.findOne({ where: { id: oldOrderId } });
      if (oldOrder) {
        oldOrder.paidAmount = Number(oldOrder.paidAmount) - oldAmount;
        await this.orderRepository.save(oldOrder);
      }
    }

    // Apply new order paidAmount
    if (updatedIncome.orderId) {
      const newOrder = await this.orderRepository.findOne({ where: { id: updatedIncome.orderId } });
      if (newOrder) {
        newOrder.paidAmount = Number(newOrder.paidAmount) + Number(updatedIncome.amount);
        if (newOrder.paidAmount >= newOrder.amount) {
          newOrder.status = OrderStatus.COMPLETED;
          newOrder.progress = 100;
        }
        await this.orderRepository.save(newOrder);
      }
    }

    return updatedIncome;
  }

  async remove(id: number) {
    const income = await this.findOne(id);
    
    if (income.orderId) {
      const order = await this.orderRepository.findOne({ where: { id: income.orderId } });
      if (order) {
        order.paidAmount = Number(order.paidAmount) - Number(income.amount);
        // We probably shouldn't automatically revert status to PENDING/IN_PROGRESS 
        // unless explicitly requested, but let's keep it consistent.
        if (order.paidAmount < order.amount && order.status === OrderStatus.COMPLETED) {
           order.status = OrderStatus.IN_PROGRESS;
        }
        await this.orderRepository.save(order);
      }
    }

    return this.incomeRepository.remove(income);
  }
}
