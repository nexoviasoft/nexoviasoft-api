import { Repository } from 'typeorm';
import { CreateOrderMessageDto } from './dto/create-order-message.dto';
import { OrderMessage } from './entities/order-message.entity';
import { Order } from './entities/order.entity';
export declare class OrderMessagesService {
    private readonly messageRepository;
    private readonly orderRepository;
    constructor(messageRepository: Repository<OrderMessage>, orderRepository: Repository<Order>);
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
    findAll(orderId: number): Promise<{
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
    findOne(id: number): Promise<{
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
    remove(id: number): Promise<{
        message: string;
    }>;
    private formatMessageResponse;
}
