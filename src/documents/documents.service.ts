import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { Document } from './entities/document.entity';
import { EmailService } from '../common/services/email.service';

@Injectable()
export class DocumentsService {
  private readonly logger = new Logger(DocumentsService.name);

  constructor(
    @InjectRepository(Document)
    private documentRepository: Repository<Document>,
    private emailService: EmailService,
  ) { }

  async create(createDocumentDto: CreateDocumentDto): Promise<Document> {
    try {
      this.logger.log(`Creating document with type: ${createDocumentDto.type}`);
      this.logger.log(`Document data: ${JSON.stringify(createDocumentDto, null, 2)}`);

      // Ensure data is a valid object
      if (!createDocumentDto.data || typeof createDocumentDto.data !== 'object') {
        throw new Error('Document data must be a valid object');
      }

      // Clean up empty strings to null for optional fields
      const cleanedDto: any = {
        type: createDocumentDto.type,
        template: createDocumentDto.template || null,
        data: createDocumentDto.data,
        documentNumber: createDocumentDto.documentNumber || null,
        status: createDocumentDto.status || 'draft',
      };

      // Only add client fields if they exist and are not empty
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

      // TypeORM save() can return Document | Document[], but when saving a single entity it returns Document
      const result = Array.isArray(savedDocument) ? savedDocument[0] : savedDocument;

      this.logger.log(`Document created successfully with ID: ${result.id}`);
      return result;
    } catch (error) {
      this.logger.error(`Error creating document: ${error.message}`, error.stack);
      this.logger.error(`Error details: ${JSON.stringify(error)}`);
      throw error;
    }
  }

  async findAll(): Promise<Document[]> {
    return await this.documentRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Document> {
    const document = await this.documentRepository.findOne({ where: { id } });
    if (!document) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }
    return document;
  }

  async update(id: number, updateDocumentDto: UpdateDocumentDto): Promise<Document> {
    const document = await this.findOne(id);
    Object.assign(document, updateDocumentDto);
    return await this.documentRepository.save(document);
  }

  async remove(id: number): Promise<void> {
    const document = await this.findOne(id);
    await this.documentRepository.remove(document);
  }

  async sendByEmail(
    id: number,
    recipientEmail?: string,
    subject?: string,
    message?: string,
  ): Promise<{ success: boolean; message: string }> {
    const document = await this.findOne(id);

    if (!document.clientEmail && !recipientEmail) {
      throw new Error('Recipient email is required');
    }

    const emailTo = recipientEmail || document.clientEmail;
    const documentSubject = subject || this.getDefaultSubject(document);
    const emailMessage = message || this.getDefaultMessage(document);

    try {
      // Generate PDF HTML content
      const pdfHtml = this.generatePdfHtml(document);

      // Send email with PDF attachment (as HTML for now, can be enhanced with actual PDF generation)
      await this.emailService.sendDocumentEmail(
        emailTo,
        document.clientName || 'Valued Client',
        documentSubject,
        emailMessage,
        pdfHtml,
        document.type,
        document.documentNumber || `DOC-${document.id}`,
      );

      // Update document status
      document.status = 'sent';
      await this.documentRepository.save(document);

      this.logger.log(`Document ${id} sent successfully to ${emailTo}`);
      return {
        success: true,
        message: `Document sent successfully to ${emailTo}`,
      };
    } catch (error) {
      this.logger.error(`Failed to send document ${id} to ${emailTo}:`, error);
      throw error;
    }
  }

  private getDefaultSubject(document: Document): string {
    if (document.type === 'invoice') {
      return `Invoice ${document.documentNumber || document.id}`;
    } else if (document.type === 'letter') {
      return `Official Letter - ${document.documentNumber || 'Reference'}`;
    }
    return `Document ${document.documentNumber || document.id}`;
  }

  private getDefaultMessage(document: Document): string {
    if (document.type === 'invoice') {
      return `Dear ${document.clientName || 'Valued Client'},\n\nPlease find attached your invoice.\n\nThank you for your business.`;
    } else if (document.type === 'letter') {
      return `Dear ${document.clientName || 'Recipient'},\n\nPlease find attached the official letter.\n\nBest regards,\nNexoviaSoft Team`;
    }
    return `Please find attached the requested document.`;
  }

  private generatePdfHtml(document: Document): string {
    if (document.type === 'invoice') {
      return this.generateInvoiceHtml(document.data);
    } else if (document.type === 'letter') {
      return this.generateLetterHtml(document.data, document.template);
    }
    return '<html><body><p>Document content</p></body></html>';
  }

  public generateInvoiceHtml(data: any): string {
    const items = data.items || [];
    const total = items.reduce((sum: number, item: any) => sum + (Number(item.quantity) * Number(item.rate)), 0);
    const companyName = data.companyName || 'NexoviaSoft INC.';
    const companyAddress = data.companyAddress || 'Rangpur, Bangladesh\\nwww.nexoviasoft.com';
    const note = data.note || 'Thank you for your business! Please process the payment within the agreed timeline.';
    const managerName = data.managerName || 'Afrin Jahan';
    const invoiceNumber = data.invoiceNumber || 'INV-2026-001';
    const invoiceDate = data.date || new Date().toLocaleDateString();
    const dueDate = data.dueDate || data.date || new Date().toLocaleDateString();

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
          body { font-family: 'Inter', sans-serif; padding: 40px; color: #1e293b; background-color: #ffffff; margin: 0; }
          .invoice-box { max-width: 850px; margin: auto; background: #ffffff; }
          .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 50px; }
          .logo-text { font-size: 32px; font-weight: 800; color: #F58220; letter-spacing: -1px; margin-bottom: 8px;}
          .company-details { font-size: 14px; color: #64748b; line-height: 1.6; white-space: pre-wrap; font-weight: 500; }
          .invoice-title { font-size: 48px; font-weight: 800; color: #0f172a; margin: 0; line-height: 1; text-align: right; letter-spacing: -2px;}
          .invoice-number { font-size: 16px; color: #64748b; font-weight: 600; text-align: right; margin-top: 8px; }
          
          .info-section { display: flex; justify-content: space-between; margin-bottom: 50px; }
          .bill-to { max-width: 50%; }
          .bill-to-label { font-size: 12px; text-transform: uppercase; font-weight: 700; color: #94a3b8; letter-spacing: 1px; margin-bottom: 12px; }
          .client-name { font-size: 20px; font-weight: 700; color: #1e293b; margin-bottom: 4px; }
          .client-address { font-size: 14px; color: #64748b; line-height: 1.6; white-space: pre-wrap; font-weight: 500; }
          
          .meta-info { display: flex; gap: 40px; text-align: right; justify-content: flex-end; }
          .meta-item { display: flex; flex-direction: column; }
          .meta-label { font-size: 12px; text-transform: uppercase; font-weight: 700; color: #94a3b8; letter-spacing: 1px; margin-bottom: 8px; }
          .meta-value { font-size: 15px; font-weight: 600; color: #1e293b; }
          
          .table-container { border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; margin-bottom: 40px; }
          .items-table { width: 100%; border-collapse: collapse; }
          .items-table th { background: #f8fafc; color: #475569; padding: 16px 20px; text-align: left; font-weight: 700; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid #e2e8f0; }
          .items-table td { padding: 20px; border-bottom: 1px solid #f1f5f9; font-size: 15px; color: #334155; }
          .items-table tr:last-child td { border-bottom: none; }
          .items-table th.right, .items-table td.right { text-align: right; }
          .items-table th.center, .items-table td.center { text-align: center; }
          
          .summary-section { display: flex; justify-content: flex-end; margin-bottom: 50px; }
          .summary-box { width: 350px; }
          .summary-row { display: flex; justify-content: space-between; padding: 16px 0; font-size: 15px; color: #475569; border-bottom: 1px solid #f1f5f9; font-weight: 500;}
          .grand-total { display: flex; justify-content: space-between; align-items: center; padding: 24px 0 8px 0; font-size: 20px; font-weight: 700; color: #0f172a; }
          .total-amount { font-size: 36px; color: #F58220; font-weight: 800; letter-spacing: -1px; }
          
          .footer-section { display: flex; justify-content: space-between; align-items: flex-end; margin-top: 40px; padding-top: 40px; border-top: 1px solid #e2e8f0; }
          .note-box { max-width: 400px; background: #fffcf0; padding: 24px; border-radius: 12px; border-left: 4px solid #F58220; }
          .note-label { font-size: 12px; font-weight: 700; color: #d97706; text-transform: uppercase; margin-bottom: 8px; letter-spacing: 1px; }
          .note-text { font-size: 14px; color: #78350f; line-height: 1.6; font-weight: 500; }
          
          .signature-box { text-align: center; min-width: 250px; }
          .signature { font-family: 'Brush Script MT', 'Cedarville Cursive', cursive, serif; font-size: 48px; color: #0f172a; padding-bottom: 10px; border-bottom: 2px solid #e2e8f0; margin-bottom: 12px; height: 60px; display: flex; align-items: flex-end; justify-content: center; }
          .manager-name { font-size: 16px; font-weight: 700; color: #1e293b; margin-bottom: 4px; }
          .manager-title { font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 1px; }
        </style>
      </head>
      <body>
        <div class="invoice-box">
          <div class="header">
            <div>
              <div class="logo-text">${companyName}</div>
              <div class="company-details">${companyAddress}</div>
            </div>
            <div>
              <div class="invoice-title">INVOICE</div>
              <div class="invoice-number">#${invoiceNumber}</div>
            </div>
          </div>
          
          <div class="info-section">
            <div class="bill-to">
              <div class="bill-to-label">Billed To</div>
              <div class="client-name">${data.clientName || 'Valued Client'}</div>
              <div class="client-address">${data.clientAddress || 'N/A'}</div>
            </div>
            <div class="meta-info">
              <div class="meta-item">
                <span class="meta-label">Date Issued</span>
                <span class="meta-value">${invoiceDate}</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">Due Date</span>
                <span class="meta-value">${dueDate}</span>
              </div>
            </div>
          </div>
          
          <div class="table-container">
            <table class="items-table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th class="center" style="width: 15%;">Qty</th>
                  <th class="right" style="width: 20%;">Rate</th>
                  <th class="right" style="width: 20%;">Amount</th>
                </tr>
              </thead>
              <tbody>
                ${items.map((item: any) => `
                  <tr>
                    <td style="font-weight: 600; color: #0f172a;">${item.description || '—'}</td>
                    <td class="center">${item.quantity || 0}</td>
                    <td class="right">$${item.rate || 0}</td>
                    <td class="right" style="font-weight: 700; color: #0f172a;">$${(Number(item.quantity) * Number(item.rate)).toFixed(2)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
          
          <div class="summary-section">
            <div class="summary-box">
              <div class="summary-row">
                <span>Subtotal</span>
                <span style="font-weight: 700; color: #0f172a;">$${total.toFixed(2)}</span>
              </div>
              <div class="summary-row">
                <span>Tax (0%)</span>
                <span style="font-weight: 700; color: #0f172a;">$0.00</span>
              </div>
              <div class="grand-total">
                <span>Total Due</span>
                <span class="total-amount">$${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <div class="footer-section">
            <div class="note-box">
              <div class="note-label">Payment Notes</div>
              <div class="note-text">${note}</div>
            </div>
            
            <div class="signature-box">
              <div class="signature">${managerName}</div>
              <div class="manager-name">${managerName}</div>
              <div class="manager-title">Authorized Signature</div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  private generateLetterHtml(data: any, template?: string): string {
    const getLetterTitle = () => {
      if (template === 'offer-letter') return 'JOB OFFER LETTER';
      if (template === 'appointment-letter') return 'LETTER OF APPOINTMENT';
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
}
