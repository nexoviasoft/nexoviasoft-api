import { Order, OrderStatus } from './order.entity';
export declare class OrderTracking {
    id: number;
    order: Order;
    orderId: number;
    status: OrderStatus;
    progress: number;
    note: string;
    createdBy: number;
    createdByName: string;
    createdAt: Date;
}
