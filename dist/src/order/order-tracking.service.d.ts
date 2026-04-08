import { Repository } from 'typeorm';
import { CreateOrderTrackingDto } from './dto/create-order-tracking.dto';
import { OrderTracking } from './entities/order-tracking.entity';
import { Order } from './entities/order.entity';
export declare class OrderTrackingService {
    private readonly trackingRepository;
    private readonly orderRepository;
    constructor(trackingRepository: Repository<OrderTracking>, orderRepository: Repository<Order>);
    create(createOrderTrackingDto: CreateOrderTrackingDto): Promise<{
        id: number;
        orderId: number;
        status: import("./entities/order.entity").OrderStatus;
        progress: number;
        note: string;
        createdBy: number;
        createdByName: string;
        createdAt: Date;
    }>;
    findAll(orderId: number): Promise<{
        id: number;
        orderId: number;
        status: import("./entities/order.entity").OrderStatus;
        progress: number;
        note: string;
        createdBy: number;
        createdByName: string;
        createdAt: Date;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        orderId: number;
        status: import("./entities/order.entity").OrderStatus;
        progress: number;
        note: string;
        createdBy: number;
        createdByName: string;
        createdAt: Date;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
    private formatTrackingResponse;
}
