import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmailAlertDto } from './dto/create-email-alert.dto';
import { UpdateEmailAlertDto } from './dto/update-email-alert.dto';
import { EmailAlert } from './entities/email-alert.entity';
import { EmailService } from '../common/services/email.service';

@Injectable()
export class EmailAlertService {
  private readonly logger = new Logger(EmailAlertService.name);

  constructor(
    @InjectRepository(EmailAlert)
    private readonly emailAlertRepository: Repository<EmailAlert>,
    private readonly emailService: EmailService,
  ) {}

  async create(createEmailAlertDto: CreateEmailAlertDto) {
    const emailAlert = this.emailAlertRepository.create(createEmailAlertDto);
    return await this.emailAlertRepository.save(emailAlert);
  }

  async findAll() {
    return await this.emailAlertRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  private async findOneEntity(id: number): Promise<EmailAlert> {
    const emailAlert = await this.emailAlertRepository.findOne({
      where: { id },
    });
    
    if (!emailAlert) {
      throw new NotFoundException(`Email alert with ID ${id} not found`);
    }
    
    return emailAlert;
  }

  async findOne(id: number) {
    return await this.findOneEntity(id);
  }

  async update(id: number, updateEmailAlertDto: UpdateEmailAlertDto) {
    const emailAlert = await this.findOneEntity(id);
    Object.assign(emailAlert, updateEmailAlertDto);
    return await this.emailAlertRepository.save(emailAlert);
  }

  async remove(id: number) {
    const emailAlert = await this.findOneEntity(id);
    return await this.emailAlertRepository.remove(emailAlert);
  }

  async sendEmail(to: string, subject: string, body: string) {
    try {
      // Convert body to HTML if it's plain text
      const htmlBody = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${subject}</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px;">
            ${body.replace(/\n/g, '<br>')}
          </div>
        </body>
        </html>
      `;
      
      // Support comma-separated emails
      const recipients = to.split(',').map((email: string) => email.trim());
      
      await this.emailService.sendGenericEmail(recipients, subject, htmlBody);

      this.logger.log(`Email sent successfully to ${to}`);
      
      return {
        success: true,
        message: `Email sent successfully to ${to}`,
      };
    } catch (error) {
      this.logger.error(`Failed to send email to ${to}:`, error);
      throw error;
    }
  }
}
