import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { getServiceRequestConfirmationTemplate } from '../templates/service-request-confirmation.template';
import { getScheduleAssignmentTemplate } from '../templates/schedule-assignment.template';
import { getTaskAssignmentTemplate } from '../templates/task-assignment.template';
import { getOrderConfirmationTemplate } from '../templates/order-confirmation.template';
import { getLeaveApprovalTemplate } from '../templates/leave-approval.template';
import { getLeaveRejectionTemplate } from '../templates/leave-rejection.template';
import { getDocumentEmailTemplate } from '../templates/document-email.template';
import { getMeetingInvitationTemplate } from '../templates/meeting-invitation.template';
import { getTeamMemberCredentialsTemplate } from '../templates/team-member-credentials.template';
import { getProjectAssignmentTemplate } from '../templates/project-assignment.template';
import { getExpenseApprovalTemplate } from '../templates/expense-approval.template';
import { getExpenseRejectionTemplate } from '../templates/expense-rejection.template';
import { getTaskCommentNotificationTemplate } from '../templates/task-comment-notification.template';
import { getInterviewInvitationTemplate } from '../templates/interview-invitation.template';
import { getIncomeInvoiceTemplate } from '../templates/income-invoice.template';


@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private transporter: nodemailer.Transporter;
  private readonly smtpConfig = {
    host: 'smtp.gmail.com',
    user: 'ashikurovi2003@gmail.com',
    pass: 'crmk glfv cgtl rgfo',
    from: 'ashikurovi2003@gmail.com',
  };

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: this.smtpConfig.host,

    
      auth: {
        user: this.smtpConfig.user,
        pass: this.smtpConfig.pass,
      },
    });

    // Surface SMTP misconfiguration early instead of failing silently on first send.
    this.transporter
      .verify()
      .then(() => this.logger.log('SMTP connection verified'))
      .catch((error) =>
        this.logger.error('SMTP verification failed. Check SMTP_* environment variables.', error),
      );
  }

  async sendServiceRequestConfirmation(
    to: string,
    clientName: string,
    serviceType: string,
  ): Promise<void> {
    const subject = 'Service Request Received - We Will Contact You Soon';
    const fromEmail = this.smtpConfig.from || this.smtpConfig.user;
    const html = getServiceRequestConfirmationTemplate(clientName, serviceType, fromEmail);

    try {
      await this.transporter.sendMail({
        from: fromEmail,
        to,
        subject,
        html,
      });
      this.logger.log(`Service request confirmation email sent to ${to}`);
    } catch (error) {
      this.logger.error(`Failed to send email to ${to}:`, error);
      throw error;
    }
  }

  async sendScheduleAssignment(
    to: string,
    teamMemberName: string,
    shifts: Array<{ time?: string; label?: string; type?: string } | null>,
    weekStartDate?: string,
    weekEndDate?: string,
  ): Promise<void> {
    const subject = 'New Schedule Assignment - NexoviaSoft';
    const fromEmail = this.smtpConfig.from || this.smtpConfig.user;
    const html = getScheduleAssignmentTemplate(
      teamMemberName,
      shifts,
      fromEmail,
      weekStartDate,
      weekEndDate,
    );

    try {
      await this.transporter.sendMail({
        from: fromEmail,
        to,
        subject,
        html,
      });
      this.logger.log(`Schedule assignment email sent to ${to}`);
    } catch (error) {
      this.logger.error(`Failed to send schedule assignment email to ${to}:`, error);
      throw error;
    }
  }

  async sendTaskAssignment(
    to: string,
    teamMemberName: string,
    taskTitle: string,
    taskDescription: string,
    projectName: string,
    priority: string,
    dueDate: string | null,
    taskUrl?: string,
  ): Promise<void> {
    const subject = `New Task Assignment: ${taskTitle}`;
    const fromEmail = this.smtpConfig.from || this.smtpConfig.user;
    const html = getTaskAssignmentTemplate(
      teamMemberName,
      taskTitle,
      taskDescription,
      projectName,
      priority,
      dueDate,
      fromEmail,
      taskUrl,
    );

    try {
      await this.transporter.sendMail({
        from: fromEmail,
        to,
        subject,
        html,
      });
      this.logger.log(`Task assignment email sent to ${to} for task: ${taskTitle}`);
    } catch (error) {
      this.logger.error(`Failed to send task assignment email to ${to}:`, error);
      throw error;
    }
  }

  async sendOrderConfirmation(
    to: string,
    clientName: string,
    orderId: string,
    service: string,
    amount: number,
    orderDate: string,
    orderUrl?: string,
  ): Promise<void> {
    const subject = `Order Confirmation - ${orderId}`;
    const fromEmail = this.smtpConfig.from || this.smtpConfig.user;
    const html = getOrderConfirmationTemplate(
      clientName,
      orderId,
      service,
      amount,
      orderDate,
      fromEmail,
      orderUrl,
    );

    try {
      await this.transporter.sendMail({
        from: fromEmail,
        to,
        subject,
        html,
      });
      this.logger.log(`Order confirmation email sent to ${to} for order: ${orderId}`);
    } catch (error) {
      this.logger.error(`Failed to send order confirmation email to ${to}:`, error);
      throw error;
    }
  }

  async sendLeaveApproval(
    to: string,
    employeeName: string,
    leaveType: string,
    startDate: string,
    endDate: string,
    days: number,
    reason: string | null,
  ): Promise<void> {
    const subject = 'Leave Request Approved - NexoviaSoft';
    const fromEmail = this.smtpConfig.from || this.smtpConfig.user;
    const html = getLeaveApprovalTemplate(
      employeeName,
      leaveType,
      startDate,
      endDate,
      days,
      reason,
      fromEmail,
    );

    try {
      await this.transporter.sendMail({
        from: fromEmail,
        to,
        subject,
        html,
      });
      this.logger.log(`Leave approval email sent to ${to} for ${employeeName}`);
    } catch (error) {
      this.logger.error(`Failed to send leave approval email to ${to}:`, error);
      throw error;
    }
  }

  async sendLeaveRejection(
    to: string,
    employeeName: string,
    leaveType: string,
    startDate: string,
    endDate: string,
    days: number,
    reason: string | null,
    rejectionReason?: string,
  ): Promise<void> {
    const subject = 'Leave Request Rejected - NexoviaSoft';
    const fromEmail = this.smtpConfig.from || this.smtpConfig.user;
    const html = getLeaveRejectionTemplate(
      employeeName,
      leaveType,
      startDate,
      endDate,
      days,
      reason,
      fromEmail,
      rejectionReason,
    );

    try {
      await this.transporter.sendMail({
        from: fromEmail,
        to,
        subject,
        html,
      });
      this.logger.log(`Leave rejection email sent to ${to} for ${employeeName}`);
    } catch (error) {
      this.logger.error(`Failed to send leave rejection email to ${to}:`, error);
      throw error;
    }
  }

  async sendDocumentEmail(
    to: string,
    clientName: string,
    subject: string,
    message: string,
    pdfHtml: string,
    documentType: string,
    documentNumber: string,
  ): Promise<void> {
    const fromEmail = this.smtpConfig.from || this.smtpConfig.user;
    const html = getDocumentEmailTemplate(
      clientName,
      subject,
      message,
      documentType,
      documentNumber,
      fromEmail,
    );

    try {
      // For now, we'll embed the PDF HTML in the email
      // In production, you might want to generate an actual PDF file and attach it
      const emailHtml = html + `
        <div style="margin-top: 30px; padding: 20px; background-color: #f9f9f9; border-radius: 5px;">
          <h3 style="margin-top: 0;">Document Preview:</h3>
          <div style="border: 1px solid #ddd; padding: 20px; background-color: white;">
            ${pdfHtml}
          </div>
        </div>
      `;

      await this.transporter.sendMail({
        from: fromEmail,
        to,
        subject,
        html: emailHtml,
        // Note: To attach actual PDF files, you would use:
        // attachments: [{ filename: 'document.pdf', content: pdfBuffer }]
      });
      this.logger.log(`Document email sent to ${to} for ${documentType} ${documentNumber}`);
    } catch (error) {
      this.logger.error(`Failed to send document email to ${to}:`, error);
      throw error;
    }
  }

  async sendTeamMemberCredentials(
    to: string,
    memberName: string,
    passwordPlain: string,
    position: string,
  ): Promise<void> {
    const subject = 'Welcome to NexoviaSoft - Your Login Credentials';
    const fromEmail = this.smtpConfig.from || this.smtpConfig.user;
    const html = getTeamMemberCredentialsTemplate(
      memberName,
      to,
      passwordPlain,
      position,
      fromEmail,
    );

    try {
      await this.transporter.sendMail({
        from: fromEmail,
        to,
        subject,
        html,
      });
      this.logger.log(`Team member credentials email sent to ${to}`);
    } catch (error) {
      this.logger.error(`Failed to send team member credentials email to ${to}:`, error);
      throw error;
    }
  }

  async sendProjectAssignment(
    to: string,
    memberName: string,
    projectName: string,
    projectRole: string,
  ): Promise<void> {
    const subject = `New Project Assignment: ${projectName}`;
    const fromEmail = this.smtpConfig.from || this.smtpConfig.user;
    const html = getProjectAssignmentTemplate(
      memberName,
      projectName,
      projectRole,
      fromEmail,
    );

    try {
      await this.transporter.sendMail({
        from: fromEmail,
        to,
        subject,
        html,
      });
      this.logger.log(`Project assignment email sent to ${to} for project: ${projectName}`);
    } catch (error) {
      this.logger.error(`Failed to send project assignment email to ${to}:`, error);
      throw error;
    }
  }

  async sendGenericEmail(
    to: string | string[],
    subject: string,
    htmlBody: string,
  ): Promise<void> {
    const fromEmail = this.smtpConfig.from || this.smtpConfig.user;
    const recipients = Array.isArray(to) ? to : [to];

    try {
      await this.transporter.sendMail({
        from: fromEmail,
        to: recipients.join(', '),
        subject,
        html: htmlBody,
      });
      this.logger.log(`Generic email sent to ${recipients.join(', ')}`);
    } catch (error) {
      this.logger.error(`Failed to send generic email to ${recipients.join(', ')}:`, error);
      throw error;
    }
  }

  async sendMeetingInvitations(params: {
    to: string[];
    attendees: Array<{ email: string; name: string }>;
    topic: string;
    description?: string | null;
    dateTimeIso: string;
    durationMinutes: number;
    meetingLink: string;
    organizerName?: string | null;
  }): Promise<void> {
    const subject = `Meeting Invitation: ${params.topic}`;
    const fromEmail = this.smtpConfig.from || this.smtpConfig.user;

    const start = new Date(params.dateTimeIso);
    const end = new Date(start.getTime() + params.durationMinutes * 60000);

    const formatIcsDate = (d: Date) =>
      d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

    const icsStart = formatIcsDate(start);
    const icsEnd = formatIcsDate(end);
    const uid = `${Date.now()}-${Math.random().toString(36).slice(2)}@nexoviasoft.com`;
    const allAttendeeLines = params.attendees
      .map((a) => `ATTENDEE;CN=${a.name};RSVP=TRUE:mailto:${a.email}`)
      .join('\r\n');

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//NexoviaSoft//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:REQUEST',
      'BEGIN:VEVENT',
      `UID:${uid}`,
      `DTSTAMP:${formatIcsDate(new Date())}`,
      `DTSTART:${icsStart}`,
      `DTEND:${icsEnd}`,
      `SUMMARY:${params.topic}`,
      `DESCRIPTION:${(params.description || '').replace(/\n/g, '\\n')}\\n\\nJoin meeting: ${params.meetingLink}`,
      `LOCATION:${params.meetingLink}`,
      `ORGANIZER;CN=${params.organizerName || 'NexoviaSoft'}:mailto:${fromEmail}`,
      allAttendeeLines,
      'STATUS:CONFIRMED',
      'SEQUENCE:0',
      'BEGIN:VALARM',
      'TRIGGER:-PT15M',
      'ACTION:DISPLAY',
      'DESCRIPTION:Meeting starting in 15 minutes',
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    // Send individually so each recipient sees their own name.
    for (const attendee of params.attendees) {
      const html = getMeetingInvitationTemplate({
        attendeeName: attendee.name,
        topic: params.topic,
        description: params.description,
        dateTimeIso: params.dateTimeIso,
        durationMinutes: params.durationMinutes,
        meetingLink: params.meetingLink,
        organizerName: params.organizerName,
        contactEmail: fromEmail,
      });

      try {
        await this.transporter.sendMail({
          from: fromEmail,
          to: attendee.email,
          subject,
          html,
          // ICS attachment — Gmail will show "Add to Calendar" inline
          alternatives: [
            {
              contentType: 'text/calendar; charset=utf-8; method=REQUEST',
              content: icsContent,
            },
          ],
          attachments: [
            {
              filename: 'invite.ics',
              content: icsContent,
              contentType: 'text/calendar; charset=utf-8; method=REQUEST',
            },
          ],
        });
        this.logger.log(`Meeting invitation (with ICS) sent to ${attendee.email}`);
      } catch (error) {
        this.logger.error(`Failed to send meeting invitation email to ${attendee.email}:`, error);
        // Don't throw: meeting can still be created even if one email fails.
      }
    }
  }

  async sendExpenseApproval(
    to: string,
    employeeName: string,
    expenseType: string,
    amount: number,
    managerName: string,
    invoiceId?: number,
    invoiceHtml?: string,
  ): Promise<void> {
    const subject = `Expense Request Approved - ${expenseType}`;
    const fromEmail = this.smtpConfig.from || this.smtpConfig.user;
    const html = getExpenseApprovalTemplate(
      employeeName,
      expenseType,
      amount,
      managerName,
      fromEmail,
      invoiceId,
    );

    try {
      await this.transporter.sendMail({
        from: fromEmail,
        to,
        subject,
        html,
        attachments: invoiceHtml ? [
          {
            filename: 'invoice.html',
            content: invoiceHtml,
          }
        ] : [],
      });
      this.logger.log(`Expense approval email sent to ${to} for ${employeeName}`);
    } catch (error) {
      this.logger.error(`Failed to send expense approval email to ${to}:`, error);
      throw error;
    }
  }

  async sendExpenseRejection(
    to: string,
    employeeName: string,
    expenseType: string,
    amount: number,
    rejectionReason: string | null,
    managerName: string,
  ): Promise<void> {
    const subject = `Expense Request Rejected - ${expenseType}`;
    const fromEmail = this.smtpConfig.from || this.smtpConfig.user;
    const html = getExpenseRejectionTemplate(
      employeeName,
      expenseType,
      amount,
      rejectionReason,
      managerName,
      fromEmail,
    );

    try {
      await this.transporter.sendMail({
        from: fromEmail,
        to,
        subject,
        html,
      });
      this.logger.log(`Expense rejection email sent to ${to} for ${employeeName}`);
    } catch (error) {
      this.logger.error(`Failed to send expense rejection email to ${to}:`, error);
      throw error;
    }
  }

  async sendTaskCommentNotification(
    to: string,
    authorName: string,
    taskTitle: string,
    commentContent: string,
    projectName: string,
    taskUrl: string,
  ): Promise<void> {
    const subject = `New Comment on Task: ${taskTitle}`;
    const fromEmail = this.smtpConfig.from || this.smtpConfig.user;
    const html = getTaskCommentNotificationTemplate(
      authorName,
      taskTitle,
      commentContent,
      projectName,
      taskUrl,
      fromEmail,
    );

    try {
      await this.transporter.sendMail({
        from: fromEmail,
        to,
        subject,
        html,
      });
      this.logger.log(`Task comment notification email sent to ${to} for task: ${taskTitle}`);
    } catch (error) {
      this.logger.error(`Failed to send task comment notification email to ${to}:`, error);
      // Don't throw - continue with other recipients
    }
  }

  async sendInterviewInvitation(params: {
    to: string;
    candidateName: string;
    position: string;
    type: string;
    date: string;
    time: string;
    interviewer: string;
    meetLink?: string;
  }): Promise<void> {
    const subject = `Interview Invitation: ${params.position} at NexoviaSoft`;
    const fromEmail = this.smtpConfig.from || this.smtpConfig.user;
    const html = getInterviewInvitationTemplate(
      params.candidateName,
      params.position,
      params.type,
      params.date,
      params.time,
      params.interviewer,
      params.meetLink,
      fromEmail,
    );

    try {
      await this.transporter.sendMail({
        from: fromEmail,
        to: params.to,
        subject,
        html,
      });
      this.logger.log(`Interview invitation email sent to ${params.to}`);
    } catch (error) {
      this.logger.error(`Failed to send interview invitation email to ${params.to}:`, error);
      throw error;
    }
  }

  async sendIncomeInvoice(
    to: string,
    clientName: string,
    amount: number,
    orderId: string,
    date: string,
    balanceValue: number,
    totalPaidSoFar: number,
  ): Promise<void> {
    const subject = `Payment Received - Order #${orderId}`;
    const fromEmail = this.smtpConfig.from || this.smtpConfig.user;
    const html = getIncomeInvoiceTemplate(
      clientName,
      amount,
      orderId,
      date,
      fromEmail,
      balanceValue,
      totalPaidSoFar,
    );

    try {
      await this.transporter.sendMail({
        from: fromEmail,
        to,
        subject,
        html,
        attachments: [
          {
            filename: `invoice-${orderId}.html`,
            content: html,
          }
        ]
      });
      this.logger.log(`Income invoice email sent to ${to} for order: ${orderId}`);
    } catch (error) {
      this.logger.error(`Failed to send income invoice email to ${to}:`, error);
      throw error;
    }
  }
}
