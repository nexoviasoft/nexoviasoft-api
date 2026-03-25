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

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private transporter: nodemailer.Transporter;


  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'innowavesolutioninfo@gmail.com',
        pass: 'eydh kgcs wplp avzv',
      },
      tls: {
        rejectUnauthorized: false,
      },
      connectionTimeout: 30000,
      greetingTimeout: 30000,
      socketTimeout: 30000,
    });
  }

  async sendServiceRequestConfirmation(
    to: string,
    clientName: string,
    serviceType: string,
  ): Promise<void> {
    const subject = 'Service Request Received - We Will Contact You Soon';
    const fromEmail = this.smtpConfig.user;
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
    const subject = 'New Schedule Assignment - SquadLog';
    const fromEmail = this.smtpConfig.user;
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
    const fromEmail = this.smtpConfig.user;
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
    const fromEmail = this.smtpConfig.user;
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
    const subject = 'Leave Request Approved - SquadLog';
    const fromEmail = this.smtpConfig.user;
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
    const subject = 'Leave Request Rejected - SquadLog';
    const fromEmail = this.smtpConfig.user;
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
    const fromEmail = this.smtpConfig.user;
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
    const subject = 'Welcome to SquadLog - Your Login Credentials';
    const fromEmail = this.smtpConfig.user;
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
    const fromEmail = this.smtpConfig.user;
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
    const fromEmail = this.smtpConfig.user;
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
    const fromEmail = this.smtpConfig.user;

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
        });
        this.logger.log(`Meeting invitation email sent to ${attendee.email}`);
      } catch (error) {
        this.logger.error(`Failed to send meeting invitation email to ${attendee.email}:`, error);
        // Don't throw: meeting can still be created even if one email fails.
      }
    }
  }
}
