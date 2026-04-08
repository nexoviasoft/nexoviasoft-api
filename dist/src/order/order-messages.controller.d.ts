import { OrderMessagesService } from './order-messages.service';
import { CreateOrderMessageDto } from './dto/create-order-message.dto';
export declare class OrderMessagesController {
    private readonly orderMessagesService;
    constructor(orderMessagesService: OrderMessagesService);
    create(createOrderMessageDto: CreateOrderMessageDto): Promise<{
        id: number;
        orderId: number;
        senderType: import("./entities/order-message.entity").MessageSenderType;
        senderId: number;
        senderName: string;
        senderAvatar: string;
        message: string;
        attachments: string[];
        createdAt: Date;
    }>;
    findAllByOrder(orderId: string): Promise<{
        id: number;
        orderId: number;
        senderType: import("./entities/order-message.entity").MessageSenderType;
        senderId: number;
        senderName: string;
        senderAvatar: string;
        message: string;
        attachments: string[];
        createdAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: number;
        orderId: number;
        senderType: import("./entities/order-message.entity").MessageSenderType;
        senderId: number;
        senderName: string;
        senderAvatar: string;
        message: string;
        attachments: string[];
        createdAt: Date;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
