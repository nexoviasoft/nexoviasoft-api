import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { EmailService } from '../common/services/email.service';
export declare class OrderService {
    private readonly orderRepository;
    private readonly emailService;
    private readonly logger;
    constructor(orderRepository: Repository<Order>, emailService: EmailService);
    private isMissingClientIdColumnError;
    create(createOrderDto: CreateOrderDto): Promise<Order>;
    private generateUniqueOrderId;
    findAll(): Promise<Order[]>;
    findOne(id: number): Promise<Order>;
    findByOrderId(orderId: string): Promise<Order>;
    getStats(): Promise<{
        total: number;
        inProgress: number;
        completed: number;
        totalRevenue: number;
    }>;
    update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order>;
    remove(id: number): Promise<Order>;
}
