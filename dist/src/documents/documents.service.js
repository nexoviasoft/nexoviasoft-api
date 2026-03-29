"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var DocumentsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const document_entity_1 = require("./entities/document.entity");
const email_service_1 = require("../common/services/email.service");
let DocumentsService = DocumentsService_1 = class DocumentsService {
    constructor(documentRepository, emailService) {
        this.documentRepository = documentRepository;
        this.emailService = emailService;
        this.logger = new common_1.Logger(DocumentsService_1.name);
    }
    async create(createDocumentDto) {
        try {
            this.logger.log(`Creating document with type: ${createDocumentDto.type}`);
            this.logger.log(`Document data: ${JSON.stringify(createDocumentDto, null, 2)}`);
            if (!createDocumentDto.data || typeof createDocumentDto.data !== 'object') {
                throw new Error('Document data must be a valid object');
            }
            const cleanedDto = {
                type: createDocumentDto.type,
                template: createDocumentDto.template || null,
                data: createDocumentDto.data,
                documentNumber: createDocumentDto.documentNumber || null,
                status: createDocumentDto.status || 'draft',
            };
            if (createDocumentDto.clientName && createDocumentDto.clientName.trim() !== '') {
                cleanedDto.clientName = createDocumentDto.clientName.trim();
            }
            if (createDocumentDto.clientEmail && createDocumentDto.clientEmail.trim() !== '') {
                cleanedDto.clientEmail = createDocumentDto.clientEmail.trim();
            }
            if (createDocumentDto.clientAddress && createDocumentDto.clientAddress.trim() !== '') {
                cleanedDto.clientAddress = createDocumentDto.clientAddress.trim();
            }
            this.logger.log(`Cleaned DTO: ${JSON.stringify(cleanedDto, null, 2)}`);
            const document = this.documentRepository.create(cleanedDto);
            const savedDocument = await this.documentRepository.save(document);
            const result = Array.isArray(savedDocument) ? savedDocument[0] : savedDocument;
            this.logger.log(`Document created successfully with ID: ${result.id}`);
            return result;
        }
        catch (error) {
            this.logger.error(`Error creating document: ${error.message}`, error.stack);
            this.logger.error(`Error details: ${JSON.stringify(error)}`);
            throw error;
        }
    }
    async findAll() {
        return await this.documentRepository.find({
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const document = await this.documentRepository.findOne({ where: { id } });
        if (!document) {
            throw new common_1.NotFoundException(`Document with ID ${id} not found`);
        }
        return document;
    }
    async update(id, updateDocumentDto) {
        const document = await this.findOne(id);
        Object.assign(document, updateDocumentDto);
        return await this.documentRepository.save(document);
    }
    async remove(id) {
        const document = await this.findOne(id);
        await this.documentRepository.remove(document);
    }
    async sendByEmail(id, recipientEmail, subject, message) {
        const document = await this.findOne(id);
        if (!document.clientEmail && !recipientEmail) {
            throw new Error('Recipient email is required');
        }
        const emailTo = recipientEmail || document.clientEmail;
        const documentSubject = subject || this.getDefaultSubject(document);
        const emailMessage = message || this.getDefaultMessage(document);
        try {
            const pdfHtml = this.generatePdfHtml(document);
            await this.emailService.sendDocumentEmail(emailTo, document.clientName || 'Valued Client', documentSubject, emailMessage, pdfHtml, document.type, document.documentNumber || `DOC-${document.id}`);
            document.status = 'sent';
            await this.documentRepository.save(document);
            this.logger.log(`Document ${id} sent successfully to ${emailTo}`);
            return {
                success: true,
                message: `Document sent successfully to ${emailTo}`,
            };
        }
        catch (error) {
            this.logger.error(`Failed to send document ${id} to ${emailTo}:`, error);
            throw error;
        }
    }
    getDefaultSubject(document) {
        if (document.type === 'invoice') {
            return `Invoice ${document.documentNumber || document.id}`;
        }
        else if (document.type === 'letter') {
            return `Official Letter - ${document.documentNumber || 'Reference'}`;
        }
        return `Document ${document.documentNumber || document.id}`;
    }
    getDefaultMessage(document) {
        if (document.type === 'invoice') {
            return `Dear ${document.clientName || 'Valued Client'},\n\nPlease find attached your invoice.\n\nThank you for your business.`;
        }
        else if (document.type === 'letter') {
            return `Dear ${document.clientName || 'Recipient'},\n\nPlease find attached the official letter.\n\nBest regards,\nNexoviaSoft Team`;
        }
        return `Please find attached the requested document.`;
    }
    generatePdfHtml(document) {
        if (document.type === 'invoice') {
            return this.generateInvoiceHtml(document.data);
        }
        else if (document.type === 'letter') {
            return this.generateLetterHtml(document.data, document.template);
        }
        return '<html><body><p>Document content</p></body></html>';
    }
    generateInvoiceHtml(data) {
        const items = data.items || [];
        const total = items.reduce((sum, item) => {
            return sum + (Number(item.quantity) * Number(item.rate));
        }, 0);
        return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; color: #333; }
          .header { display: flex; justify-content: space-between; margin-bottom: 40px; }
          .invoice-title { font-size: 36px; font-weight: bold; margin-bottom: 10px; }
          .company-info { text-align: right; }
          .meta-info { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-bottom: 30px; }
          .bill-to { text-align: right; }
          .items-table { width: 100%; border-collapse: collapse; margin: 30px 0; }
          .items-table th { background: #EFFC76; color: #000; padding: 12px; text-align: left; }
          .items-table td { padding: 12px; border-bottom: 1px solid #ddd; }
          .total-section { text-align: right; margin-top: 30px; }
          .grand-total { font-size: 24px; font-weight: bold; color: #EFFC76; }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <h1 class="invoice-title">INVOICE</h1>
            <div>Invoice No: #${data.invoiceNumber || 'N/A'}</div>
          </div>
          <div class="company-info">
            <div style="font-weight: bold; font-size: 18px; color: #EFFC76; margin-bottom: 10px;">MD SAMSUDDOHA SOJIB</div>
            <div style="font-size: 12px; color: #666;">
              Full Stack Developer<br/>
              www.fiverr.com<br/>
              Rangpur City, Bangladesh
            </div>
          </div>
        </div>
        
        <div class="meta-info">
          <div>
            <div>Date: ${data.date || 'N/A'}</div>
            <div>Due Date: ${data.date || 'N/A'}</div>
          </div>
          <div class="bill-to">
            <div style="font-weight: bold; margin-bottom: 10px;">Bill To:</div>
            <div style="font-weight: bold; font-size: 16px;">${data.clientName || 'N/A'}</div>
            <div style="color: #666; white-space: pre-wrap;">${data.clientAddress || 'N/A'}</div>
          </div>
        </div>
        
        <table class="items-table">
          <thead>
            <tr>
              <th>Description</th>
              <th style="text-align: center;">Qty</th>
              <th style="text-align: center;">Price</th>
              <th style="text-align: center;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${items.map((item) => `
              <tr>
                <td>${item.description || '—'}</td>
                <td style="text-align: center;">${item.quantity || 0}</td>
                <td style="text-align: center;">$${item.rate || 0}</td>
                <td style="text-align: center; font-weight: bold;">$${(Number(item.quantity) * Number(item.rate)).toFixed(2)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        
        <div class="total-section">
          <div style="margin-bottom: 10px;">
            <span>Subtotal: </span>
            <span style="font-weight: bold;">$${total.toFixed(2)}</span>
          </div>
          <div style="margin-bottom: 10px;">
            <span>Sales Tax (free): </span>
            <span style="font-weight: bold;">$0.00</span>
          </div>
          <div class="grand-total">
            Grand Total: $${total.toFixed(2)}
          </div>
        </div>
        
        <div style="margin-top: 50px; display: flex; justify-content: flex-end;">
          <div style="text-align: center; border-top: 1px solid #333; min-width: 200px; padding-top: 10px;">
            <div style="font-family: 'Brush Script MT', cursive; font-size: 24px; color: #1e293b; margin-bottom: 5px;">
              ${data.managerName || 'Manager'}
            </div>
            <div style="font-size: 14px; font-weight: bold; color: #666; text-transform: uppercase; letter-spacing: 1px;">
              Authorized Signature
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
    }
    generateLetterHtml(data, template) {
        const getLetterTitle = () => {
            if (template === 'offer-letter')
                return 'JOB OFFER LETTER';
            if (template === 'appointment-letter')
                return 'LETTER OF APPOINTMENT';
            return 'OFFICIAL LETTER';
        };
        return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: 'Times New Roman', serif; padding: 60px; line-height: 1.6; color: #333; }
          .header { text-align: center; border-bottom: 1px solid #ddd; padding-bottom: 20px; margin-bottom: 30px; }
          .company-name { font-size: 24px; font-weight: bold; color: #EFFC76; margin-bottom: 10px; }
          .date { margin-bottom: 20px; }
          .recipient { margin-bottom: 20px; }
          .letter-title { text-align: center; font-weight: bold; text-decoration: underline; margin: 30px 0; color: #EFFC76; }
          .content { text-align: justify; margin-bottom: 40px; }
          .signatures { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-top: 60px; }
          .signature-line { border-top: 1px solid #333; padding-top: 10px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="company-name">NexoviaSoft INC.</div>
          <div style="font-size: 12px; color: #666;">123 Tech Park • San Francisco, CA • www.NexoviaSoft.com</div>
        </div>
        
        <div class="date">${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
        
        <div class="recipient">
          <div>To,</div>
          <div style="font-weight: bold;">${data.candidateName || '[Candidate Name]'}</div>
          <div>[Address Line 1]</div>
          <div>[City, State, Zip]</div>
        </div>
        
        <div class="letter-title">${getLetterTitle()}</div>
        
        <div class="content">
          <p>Dear <strong>${data.candidateName || '[Candidate Name]'}</strong>,</p>
          
          ${template === 'offer-letter' ? `
            <p>We are pleased to extend an offer for you to join <strong>NexoviaSoft Inc.</strong> in the position of <strong>${data.role || '[Role]'}</strong>. 
            We were impressed with your skills and experience and believe you will be a valuable asset to our team.</p>
            <p>Your starting annual salary will be <strong>${data.salary || '[Salary]'}</strong>, along with our standard benefits package. 
            You will be reporting to <strong>${data.manager || '[Manager Name]'}</strong>.</p>
          ` : template === 'appointment-letter' ? `
            <p>Further to our recent discussions and your acceptance of our offer, we are delighted to confirm your appointment as <strong>${data.role || '[Role]'}</strong> at <strong>NexoviaSoft Inc.</strong>, effective from <strong>${data.startDate}</strong>.</p>
            <p>Your annual compensation package is fixed at <strong>${data.salary || '[Salary]'}</strong>. 
            The terms and conditions of your employment are outlined in the attached Employee Handbook.</p>
          ` : '<p>Official letter content...</p>'}
          
          <p>We look forward to welcoming you to the NexoviaSoft family. Please sign and return a copy of this letter to acknowledge your acceptance.</p>
        </div>
        
        <div class="signatures">
          <div>
            <div class="signature-line">
              <strong>Authorized Signatory</strong><br/>
              NexoviaSoft Inc.
            </div>
          </div>
          <div>
            <div class="signature-line">
              <strong>Employee Signature</strong><br/>
              Date: _________________
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
    }
};
exports.DocumentsService = DocumentsService;
exports.DocumentsService = DocumentsService = DocumentsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(document_entity_1.Document)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        email_service_1.EmailService])
], DocumentsService);
//# sourceMappingURL=documents.service.js.map