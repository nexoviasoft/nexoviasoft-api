import { Repository } from 'typeorm';
import { CreateEmailAlertDto } from './dto/create-email-alert.dto';
import { UpdateEmailAlertDto } from './dto/update-email-alert.dto';
import { EmailAlert } from './entities/email-alert.entity';
import { EmailService } from '../common/services/email.service';
export declare class EmailAlertService {
    private readonly emailAlertRepository;
    private readonly emailService;
    private readonly logger;
    constructor(emailAlertRepository: Repository<EmailAlert>, emailService: EmailService);
    create(createEmailAlertDto: CreateEmailAlertDto): Promise<EmailAlert>;
    findAll(): Promise<EmailAlert[]>;
    private findOneEntity;
    findOne(id: number): Promise<EmailAlert>;
    update(id: number, updateEmailAlertDto: UpdateEmailAlertDto): Promise<EmailAlert>;
    remove(id: number): Promise<EmailAlert>;
    sendEmail(to: string, subject: string, body: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
