import { OrderTrackingService } from './order-tracking.service';
import { CreateOrderTrackingDto } from './dto/create-order-tracking.dto';
export declare class OrderTrackingController {
    private readonly orderTrackingService;
    constructor(orderTrackingService: OrderTrackingService);
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
    findAllByOrder(orderId: string): Promise<{
        id: number;
        orderId: number;
        status: import("./entities/order.entity").OrderStatus;
        progress: number;
        note: string;
        createdBy: number;
        createdByName: string;
        createdAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: number;
        orderId: number;
        status: import("./entities/order.entity").OrderStatus;
        progress: number;
        note: string;
        createdBy: number;
        createdByName: string;
        createdAt: Date;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
