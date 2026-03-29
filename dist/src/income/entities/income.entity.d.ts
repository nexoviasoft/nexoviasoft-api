import { Order } from '../../order/entities/order.entity';
import { OurClient } from '../../setting/our-client/entities/our-client.entity';
export declare class Income {
    id: number;
    order: Order;
    orderId: number;
    client: OurClient;
    clientId: number;
    amount: number;
    description: string;
    date: Date;
    receiptNo: string;
    createdAt: Date;
    updatedAt: Date;
}
