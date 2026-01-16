import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { getServiceRequestConfirmationTemplate } from '../templates/service-request-confirmation.template';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private transporter: nodemailer.Transporter;
  private readonly smtpConfig = {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    user: 'khataxinfo@gmail.com',
    password: 'jkqw gwbu ibip zrga',
  };

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: this.smtpConfig.host,
      port: this.smtpConfig.port,
      secure: this.smtpConfig.secure,
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
}
