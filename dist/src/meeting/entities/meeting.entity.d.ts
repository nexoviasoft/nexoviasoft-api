export declare class Meeting {
    id: number;
    meetingId: string;
    meetingLink: string;
    topic: string;
    description?: string | null;
    dateTime: Date;
    durationMinutes: number;
    attendeeIds: number[];
    organizerName: string | null;
    status: 'upcoming' | 'completed' | 'cancelled';
    createdAt: Date;
    updatedAt: Date;
}
