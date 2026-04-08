import { Order } from './order.entity';
export declare enum MessageSenderType {
    CLIENT = "client",
    TEAM = "team"
}
export declare class OrderMessage {
    id: number;
    order: Order;
    orderId: number;
    senderType: MessageSenderType;
    senderId: number;
    senderName: string;
    senderAvatar: string;
    message: string;
    attachments: string[];
    createdAt: Date;
}
