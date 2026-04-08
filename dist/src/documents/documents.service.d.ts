import { Repository } from 'typeorm';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { Document } from './entities/document.entity';
import { EmailService } from '../common/services/email.service';
export declare class DocumentsService {
    private documentRepository;
    private emailService;
    private readonly logger;
    constructor(documentRepository: Repository<Document>, emailService: EmailService);
    create(createDocumentDto: CreateDocumentDto): Promise<Document>;
    findAll(): Promise<Document[]>;
    findOne(id: number): Promise<Document>;
    update(id: number, updateDocumentDto: UpdateDocumentDto): Promise<Document>;
    remove(id: number): Promise<void>;
    sendByEmail(id: number, recipientEmail?: string, subject?: string, message?: string): Promise<{
        success: boolean;
        message: string;
    }>;
    private getDefaultSubject;
    private getDefaultMessage;
    private generatePdfHtml;
    generateInvoiceHtml(data: any): string;
    private generateLetterHtml;
}
