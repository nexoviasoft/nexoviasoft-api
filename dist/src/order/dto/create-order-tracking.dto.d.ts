import { OrderStatus } from '../entities/order.entity';
export declare class CreateOrderTrackingDto {
    orderId: number;
    status?: OrderStatus;
    progress?: number;
    note?: string;
    createdBy?: number;
    createdByName?: string;
}
