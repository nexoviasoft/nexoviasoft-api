import { OrderStatus } from '../entities/order.entity';
export declare class CreateOrderDto {
    orderId?: string;
    clientId: number;
    categoryId?: number;
    service: string;
    amount: number;
    status?: OrderStatus;
    progress?: number;
    assignedTo?: string[];
    date?: string;
}
