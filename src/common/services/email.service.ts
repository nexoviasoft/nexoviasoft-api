import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { getServiceRequestConfirmationTemplate } from '../templates/service-request-confirmation.template';
import { getScheduleAssignmentTemplate } from '../templates/schedule-assignment.template';
import { getTaskAssignmentTemplate } from '../templates/task-assignment.template';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private transporter: nodemailer.Transporter;
  private readonly smtpConfig = {
    host: 'smtp.gmail.com',
    user: 'khataxinfo@gmail.com',
    password: 'jkqw gwbu ibip zrga',
  };

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: this.smtpConfig.host,
      auth: {
        user: this.smtpConfig.user,
        pass: this.smtpConfig.password,
      },
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
}
