import { HttpStatus } from '@nestjs/common';
import { EmailAlertService } from './email-alert.service';
import { CreateEmailAlertDto } from './dto/create-email-alert.dto';
import { UpdateEmailAlertDto } from './dto/update-email-alert.dto';
export declare class EmailAlertController {
    private readonly emailAlertService;
    constructor(emailAlertService: EmailAlertService);
    create(createEmailAlertDto: CreateEmailAlertDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/email-alert.entity").EmailAlert;
    }>;
    findAll(): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/email-alert.entity").EmailAlert[];
    }>;
    findOne(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/email-alert.entity").EmailAlert;
    }>;
    update(id: string, updateEmailAlertDto: UpdateEmailAlertDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/email-alert.entity").EmailAlert;
    }>;
    remove(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
    sendEmail(body: {
        to: string;
        subject: string;
        body: string;
    }): Promise<{
        statusCode: HttpStatus;
        message: string;
        success: boolean;
    }>;
}
