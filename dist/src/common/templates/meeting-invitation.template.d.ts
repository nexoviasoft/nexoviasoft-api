export declare function getMeetingInvitationTemplate(params: {
    attendeeName: string;
    topic: string;
    description?: string | null;
    dateTimeIso: string;
    durationMinutes: number;
    meetingLink: string;
    organizerName?: string | null;
    contactEmail: string;
}): string;
