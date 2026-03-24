import { BroadcastService } from './broadcast.service';
import { CreateBroadcastDto } from './dto/create-broadcast.dto';
import { UpdateBroadcastDto } from './dto/update-broadcast.dto';
export declare class BroadcastController {
    private readonly broadcastService;
    constructor(broadcastService: BroadcastService);
    stats(): {
        label: string;
        value: string;
        subtext: string;
        trend: string;
    }[];
    dashboard(): {
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
    findOne(id: string): {
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
    update(id: string, updateBroadcastDto: UpdateBroadcastDto): {
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
    remove(id: string): {
        ok: boolean;
    };
}
