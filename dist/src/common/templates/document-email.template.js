"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDocumentEmailTemplate = getDocumentEmailTemplate;
const email_layout_template_1 = require("./email-layout.template");
function getDocumentEmailTemplate(clientName, subject, message, documentType, documentNumber, contactEmail) {
    const documentTypeLabel = documentType === 'invoice' ? 'Invoice' : 'Official Letter';
    return (0, email_layout_template_1.renderEmailLayout)({
        preheader: `${documentTypeLabel} ${documentNumber}`,
        eyebrow: 'Document Delivery',
        title: documentTypeLabel,
        subtitle: 'A document has been prepared and shared with you.',
        accent: '#0f172a',
        contactEmail,
        contentHtml: `
      <p class="p">Hello ${(0, email_layout_template_1.escapeHtml)(clientName)},</p>
      <p class="p">${(0, email_layout_template_1.escapeHtml)(subject)}</p>

      <div class="box">
        <p class="box-title">Document Details</p>
        <table class="kvs">
          <tr><td class="key">Document Type</td><td class="value">${(0, email_layout_template_1.escapeHtml)(documentTypeLabel)}</td></tr>
          <tr><td class="key">Document No.</td><td class="value">${(0, email_layout_template_1.escapeHtml)(documentNumber)}</td></tr>
        </table>
      </div>

      <div class="box">
        <p class="box-title">Message</p>
        ${(0, email_layout_template_1.nl2br)(message)}
      </div>

      <div class="note"><strong>Note:</strong> Please review the attached/embedded document and keep it for your records.</div>
      <p class="p">Best regards,<br><strong>NexoviaSoft Team</strong></p>
    `,
    });
}
//# sourceMappingURL=document-email.template.js.map