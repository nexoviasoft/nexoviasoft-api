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
        const total = items.reduce((sum, item) => sum + (Number(item.quantity) * Number(item.rate)), 0);
        const companyName = data.companyName || 'NexoviaSoft INC.';
        const companyAddress = data.companyAddress || '123 Tech Park, San Francisco, CA\\nwww.nexoviasoft.com';
        const note = data.note || 'Thank you for your business! Please process the payment within the agreed timeline.';
        return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 50px; color: #334155; background-color: #f8fafc; margin: 0; }
          .invoice-box { max-width: 800px; margin: auto; padding: 40px; background: #ffffff; border-radius: 12px; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05); }
          .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px; border-bottom: 2px solid #f1f5f9; padding-bottom: 30px; }
          .invoice-number-wrapper { color: #64748b; font-size: 14px; margin-top: 8px;}
          .invoice-title { font-size: 42px; font-weight: 800; color: #0f172a; margin: 0; letter-spacing: -1px; }
          .company-info { text-align: right; }
          .company-name { font-weight: 800; font-size: 24px; color: #f58220; margin-bottom: 8px; }
          .company-address { font-size: 14px; color: #64748b; line-height: 1.5; white-space: pre-wrap; }
          .meta-info { display: flex; justify-content: space-between; margin-bottom: 40px; background: #f8fafc; padding: 20px; border-radius: 8px; }
          .meta-item { display: flex; flex-direction: column; gap: 4px; }
          .meta-label { font-size: 12px; text-transform: uppercase; font-weight: 600; color: #94a3b8; letter-spacing: 0.5px; }
          .meta-value { font-size: 15px; font-weight: 600; color: #334155; }
          .bill-to { text-align: right; }
          .items-table { width: 100%; border-collapse: separate; border-spacing: 0; margin: 30px 0; }
          .items-table th { background: #f1f5f9; color: #475569; padding: 16px; text-align: left; font-weight: 600; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; }
          .items-table th:first-child { border-top-left-radius: 8px; border-bottom-left-radius: 8px; }
          .items-table th:last-child { border-top-right-radius: 8px; border-bottom-right-radius: 8px; }
          .items-table td { padding: 16px; border-bottom: 1px solid #f1f5f9; font-size: 15px; }
          .total-section { display: flex; justify-content: flex-end; margin-top: 30px; }
          .total-box { width: 300px; background: #f8fafc; padding: 24px; border-radius: 8px; }
          .total-row { display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 15px; color: #475569; }
          .grand-total { display: flex; justify-content: space-between; font-size: 20px; font-weight: 800; color: #0f172a; margin-top: 16px; padding-top: 16px; border-top: 2px solid #e2e8f0; }
          .footer { margin-top: 60px; display: flex; justify-content: space-between; align-items: flex-end; }
          .note-section { max-width: 400px; background: #fffbeb; border-left: 4px solid #f59e0b; padding: 16px; border-radius: 4px; }
          .note-label { font-size: 12px; font-weight: 700; color: #d97706; text-transform: uppercase; margin-bottom: 6px; }
          .note-content { font-size: 14px; color: #78350f; line-height: 1.5; }
          .signature-section { text-align: center; min-width: 200px; }
          .signature-name { font-family: 'Brush Script MT', 'Cedarville Cursive', cursive; font-size: 32px; color: #0f172a; padding-bottom: 8px; border-bottom: 2px solid #cbd5e1; margin-bottom: 12px; height: 40px; display: flex; align-items: flex-end; justify-content: center; }
          .signature-role { font-size: 13px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 1px; }
          .signature-title { font-size: 12px; color: #94a3b8; margin-top: 4px; }
        </style>
      </head>
      <body>
        <div class="invoice-box">
          <div class="header">
            <div>
              <h1 class="invoice-title">INVOICE</h1>
              <div class="invoice-number-wrapper">Invoice Number: <span style="font-weight: 600; color: #334155;">#${data.invoiceNumber || 'N/A'}</span></div>
            </div>
            <div class="company-info">
              <div class="company-name">${companyName}</div>
              <div class="company-address">${companyAddress}</div>
            </div>
          </div>
          
          <div class="meta-info">
            <div style="display: flex; gap: 40px;">
              <div class="meta-item">
                <span class="meta-label">Invoice Date</span>
                <span class="meta-value">${data.date || new Date().toLocaleDateString()}</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">Due Date</span>
                <span class="meta-value">${data.dueDate || data.date || new Date().toLocaleDateString()}</span>
              </div>
            </div>
            <div class="bill-to meta-item">
              <span class="meta-label">Billed To</span>
              <span class="meta-value" style="font-size: 18px; color: #f58220;">${data.clientName || 'Valued Client'}</span>
              <span style="font-size: 14px; color: #64748b; white-space: pre-wrap; margin-top: 4px;">${data.clientAddress || 'N/A'}</span>
            </div>
          </div>
          
          <table class="items-table">
            <thead>
              <tr>
                <th>Description</th>
                <th style="text-align: center; width: 10%;">Qty</th>
                <th style="text-align: right; width: 20%;">Price</th>
                <th style="text-align: right; width: 20%;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${items.map((item) => `
                <tr>
                  <td style="font-weight: 500; color: #1e293b;">${item.description || '—'}</td>
                  <td style="text-align: center; color: #64748b;">${item.quantity || 0}</td>
                  <td style="text-align: right; color: #64748b;">$${item.rate || 0}</td>
                  <td style="text-align: right; font-weight: 600; color: #0f172a;">$${(Number(item.quantity) * Number(item.rate)).toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          
          <div class="total-section">
            <div class="total-box">
              <div class="total-row">
                <span>Subtotal</span>
                <span style="font-weight: 600;">$${total.toFixed(2)}</span>
              </div>
              <div class="total-row">
                <span>Sales Tax (0%)</span>
                <span style="font-weight: 600;">$0.00</span>
              </div>
              <div class="grand-total">
                <span>Total Due</span>
                <span style="color: #f58220;">$${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <div class="footer">
            <div class="note-section">
              <div class="note-label">Note</div>
              <div class="note-content">${note}</div>
            </div>
            
            <div class="signature-section">
              <div class="signature-name">${data.managerName || 'Manager'}</div>
              <div class="signature-role">Manager</div>
              <div class="signature-title">Authorized Signature</div>
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