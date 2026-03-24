export declare class CreateMeetingDto {
    topic: string;
    description?: string;
    dateTime: string;
    durationMinutes: number;
    attendeeIds: number[];
    organizerName?: string;
}
