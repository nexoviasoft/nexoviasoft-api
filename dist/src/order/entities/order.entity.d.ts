import { Category } from '../../setting/category/entities/category.entity';
import { OurClient } from '../../setting/our-client/entities/our-client.entity';
export declare enum OrderStatus {
    PENDING = "Pending",
    IN_PROGRESS = "In Progress",
    REVIEW = "Review",
    COMPLETED = "Completed"
}
export declare class Order {
    id: number;
    orderId: string;
    client: OurClient;
    clientId: number;
    category: Category;
    categoryId: number;
    service: string;
    amount: number;
    status: OrderStatus;
    progress: number;
    assignedTo: string[];
    date: Date;
    createdAt: Date;
    updatedAt: Date;
}
