"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BroadcastService = void 0;
const common_1 = require("@nestjs/common");
let BroadcastService = class BroadcastService {
    constructor() {
        this.nextId = 4;
        this.broadcasts = [
            {
                id: 1,
                sender: { name: 'Dipa Inhouse', role: 'Admin', avatar: '/avatars/01.png' },
                subject: 'Q1 Town Hall Meeting Summary',
                content: "Hi Team, thanks for attending today's town hall. Here is the summary of what we discussed regarding the new product roadmap and quarterly goals...",
                createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
                readRate: 94,
                attachments: 2,
                comments: 12,
                likes: 45,
                tag: 'Important',
            },
            {
                id: 2,
                sender: { name: 'Jane Cooper', role: 'HR Manager', avatar: '/avatars/02.png' },
                subject: 'Upcoming Holiday Schedule',
                content: 'Please note that the office will be closed next Monday for the national holiday. Ensure you have consolidated your timesheets by Friday...',
                createdAt: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(),
                readRate: 88,
                attachments: 0,
                comments: 5,
                likes: 32,
                tag: 'HR',
            },
            {
                id: 3,
                sender: { name: 'Cody Fisher', role: 'IT Support', avatar: '/avatars/06.png' },
                subject: 'System Maintenance Notification',
                content: 'We will be performing scheduled maintenance on the main server this Saturday from 10 PM to 2 AM. Services may be intermittent...',
                createdAt: new Date('2026-01-12T10:00:00.000Z').toISOString(),
                readRate: 76,
                attachments: 0,
                comments: 2,
                likes: 15,
                tag: 'System',
            },
        ];
    }
    create(createBroadcastDto) {
        const nowIso = new Date().toISOString();
        const item = {
            id: this.nextId++,
            sender: {
                name: createBroadcastDto.senderName || 'Admin',
                role: createBroadcastDto.senderRole || 'Admin',
                avatar: undefined,
            },
            subject: createBroadcastDto.subject,
            content: createBroadcastDto.content,
            createdAt: nowIso,
            scheduledAt: createBroadcastDto.scheduledAt,
            readRate: 0,
            attachments: createBroadcastDto.attachments ?? 0,
            comments: 0,
            likes: 0,
            tag: createBroadcastDto.tag || 'Announcement',
        };
        this.broadcasts = [item, ...this.broadcasts];
        return item;
    }
    findAll() {
        return this.broadcasts;
    }
    getDashboard() {
        const totalSent = this.broadcasts.length;
        const scheduled = this.broadcasts.filter((b) => !!b.scheduledAt).length;
        const avgOpenRate = this.broadcasts.length > 0
            ? Math.round(this.broadcasts.reduce((sum, b) => sum + (b.readRate || 0), 0) / this.broadcasts.length)
            : 0;
        const avgComments = this.broadcasts.length > 0
            ? Math.round((this.broadcasts.reduce((sum, b) => sum + (b.comments || 0), 0) / this.broadcasts.length) * 10) /
                10
            : 0;
        return {
            stats: [
                {
                    label: 'Total Sent',
                    value: String(totalSent),
                    subtext: 'All time',
                    trend: 'neutral',
                },
                {
                    label: 'Avg. Open Rate',
                    value: `${avgOpenRate}%`,
                    subtext: 'Across all announcements',
                    trend: 'neutral',
                },
                {
                    label: 'Scheduled',
                    value: String(scheduled),
                    subtext: 'Upcoming',
                    trend: 'neutral',
                },
                {
                    label: 'Engagement',
                    value: String(avgComments),
                    subtext: 'Avg. comments per post',
                    trend: 'neutral',
                },
            ],
            recent: this.broadcasts.slice(0, 20),
        };
    }
    getStats() {
        return this.getDashboard().stats;
    }
    findOne(id) {
        const item = this.broadcasts.find((b) => b.id === id);
        if (!item)
            throw new common_1.NotFoundException(`Broadcast ${id} not found`);
        return item;
    }
    update(id, updateBroadcastDto) {
        const idx = this.broadcasts.findIndex((b) => b.id === id);
        if (idx === -1)
            throw new common_1.NotFoundException(`Broadcast ${id} not found`);
        const current = this.broadcasts[idx];
        const next = {
            ...current,
            subject: updateBroadcastDto.subject ?? current.subject,
            content: updateBroadcastDto.content ?? current.content,
            tag: updateBroadcastDto.tag ?? current.tag,
            scheduledAt: updateBroadcastDto.scheduledAt ?? current.scheduledAt,
        };
        this.broadcasts = [
            ...this.broadcasts.slice(0, idx),
            next,
            ...this.broadcasts.slice(idx + 1),
        ];
        return next;
    }
    remove(id) {
        const before = this.broadcasts.length;
        this.broadcasts = this.broadcasts.filter((b) => b.id !== id);
        if (this.broadcasts.length === before)
            throw new common_1.NotFoundException(`Broadcast ${id} not found`);
        return { ok: true };
    }
};
exports.BroadcastService = BroadcastService;
exports.BroadcastService = BroadcastService = __decorate([
    (0, common_1.Injectable)()
], BroadcastService);
//# sourceMappingURL=broadcast.service.js.map