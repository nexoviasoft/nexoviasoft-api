export declare class GoogleCalendarService {
    private readonly logger;
    private readonly clientEmail;
    private readonly privateKey;
    private getAuth;
    createMeetEvent(data: {
        summary: string;
        description?: string;
        start: string;
        end: string;
        attendees?: {
            email: string;
        }[];
    }): Promise<{
        eventId?: string;
        meetLink?: string;
    }>;
}
