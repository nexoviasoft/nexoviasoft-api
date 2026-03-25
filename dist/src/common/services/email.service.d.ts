export declare class EmailService {
    private readonly logger;
    private transporter;
    private readonly smtpConfig;
    constructor();
    sendServiceRequestConfirmation(to: string, clientName: string, serviceType: string): Promise<void>;
    sendScheduleAssignment(to: string, teamMemberName: string, shifts: Array<{
        time?: string;
        label?: string;
        type?: string;
    } | null>, weekStartDate?: string, weekEndDate?: string): Promise<void>;
    sendTaskAssignment(to: string, teamMemberName: string, taskTitle: string, taskDescription: string, projectName: string, priority: string, dueDate: string | null, taskUrl?: string): Promise<void>;
    sendOrderConfirmation(to: string, clientName: string, orderId: string, service: string, amount: number, orderDate: string, orderUrl?: string): Promise<void>;
    sendLeaveApproval(to: string, employeeName: string, leaveType: string, startDate: string, endDate: string, days: number, reason: string | null): Promise<void>;
    sendLeaveRejection(to: string, employeeName: string, leaveType: string, startDate: string, endDate: string, days: number, reason: string | null, rejectionReason?: string): Promise<void>;
    sendDocumentEmail(to: string, clientName: string, subject: string, message: string, pdfHtml: string, documentType: string, documentNumber: string): Promise<void>;
    sendTeamMemberCredentials(to: string, memberName: string, passwordPlain: string, position: string): Promise<void>;
    sendProjectAssignment(to: string, memberName: string, projectName: string, projectRole: string): Promise<void>;
    sendGenericEmail(to: string | string[], subject: string, htmlBody: string): Promise<void>;
    sendMeetingInvitations(params: {
        to: string[];
        attendees: Array<{
            email: string;
            name: string;
        }>;
        topic: string;
        description?: string | null;
        dateTimeIso: string;
        durationMinutes: number;
        meetingLink: string;
        organizerName?: string | null;
    }): Promise<void>;
}
