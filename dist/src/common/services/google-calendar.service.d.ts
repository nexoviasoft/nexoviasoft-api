export declare class GoogleCalendarService {
    private readonly logger;
    private readonly calendar;
    private readonly calendarId;
    private lastRequestTime;
    private requestQueue;
    constructor();
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
    private scheduleRequest;
    private executeWithBackoff;
}
