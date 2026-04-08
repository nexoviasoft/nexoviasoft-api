import { HttpStatus } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
export declare class DocumentsController {
    private readonly documentsService;
    constructor(documentsService: DocumentsService);
    create(createDocumentDto: CreateDocumentDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/document.entity").Document;
    }>;
    findAll(): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/document.entity").Document[];
    }>;
    findOne(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/document.entity").Document;
    }>;
    update(id: string, updateDocumentDto: UpdateDocumentDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/document.entity").Document;
    }>;
    remove(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
    sendByEmail(id: string, body: {
        recipientEmail?: string;
        subject?: string;
        message?: string;
    }): Promise<{
        statusCode: HttpStatus;
        message: string;
        success: boolean;
    }>;
}
