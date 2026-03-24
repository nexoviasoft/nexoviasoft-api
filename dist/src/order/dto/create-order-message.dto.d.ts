import { MessageSenderType } from '../entities/order-message.entity';
export declare class CreateOrderMessageDto {
    orderId: number;
    senderType: MessageSenderType;
    senderId?: number;
    senderName?: string;
    senderAvatar?: string;
    message: string;
    attachments?: string[];
}
