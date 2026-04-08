import { CreateBroadcastDto } from './dto/create-broadcast.dto';
import { UpdateBroadcastDto } from './dto/update-broadcast.dto';
export declare class BroadcastService {
    private nextId;
    private broadcasts;
    create(createBroadcastDto: CreateBroadcastDto): {
        id: number;
        sender: {
            name: string;
            role: string;
            avatar: any;
        };
        subject: string;
        content: string;
        createdAt: string;
        scheduledAt: string;
        readRate: number;
        attachments: number;
        comments: number;
        likes: number;
        tag: string;
    };
    findAll(): {
        id: number;
        sender: {
            name: string;
            role: string;
            avatar?: string;
        };
        subject: string;
        content: string;
        createdAt: string;
        scheduledAt?: string;
        readRate: number;
        attachments: number;
        comments: number;
        likes: number;
        tag: string;
    }[];
    getDashboard(): {
        stats: {
            label: string;
            value: string;
            subtext: string;
            trend: string;
        }[];
        recent: {
            id: number;
            sender: {
                name: string;
                role: string;
                avatar?: string;
            };
            subject: string;
            content: string;
            createdAt: string;
            scheduledAt?: string;
            readRate: number;
            attachments: number;
            comments: number;
            likes: number;
            tag: string;
        }[];
    };
    getStats(): {
        label: string;
        value: string;
        subtext: string;
        trend: string;
    }[];
    findOne(id: number): {
        id: number;
        sender: {
            name: string;
            role: string;
            avatar?: string;
        };
        subject: string;
        content: string;
        createdAt: string;
        scheduledAt?: string;
        readRate: number;
        attachments: number;
        comments: number;
        likes: number;
        tag: string;
    };
    update(id: number, updateBroadcastDto: UpdateBroadcastDto): {
        subject: string;
        content: string;
        tag: string;
        scheduledAt: string;
        id: number;
        sender: {
            name: string;
            role: string;
            avatar?: string;
        };
        createdAt: string;
        readRate: number;
        attachments: number;
        comments: number;
        likes: number;
    };
    remove(id: number): {
        ok: boolean;
    };
}
