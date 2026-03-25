import { escapeHtml, nl2br, renderEmailLayout } from './email-layout.template';

export function getDocumentEmailTemplate(
  clientName: string,
  subject: string,
  message: string,
  documentType: string,
  documentNumber: string,
  contactEmail: string,
): string {
  const documentTypeLabel = documentType === 'invoice' ? 'Invoice' : 'Official Letter';

  return renderEmailLayout({
    preheader: `${documentTypeLabel} ${documentNumber}`,
    eyebrow: 'Document Delivery',
    title: documentTypeLabel,
    subtitle: 'A document has been prepared and shared with you.',
    accent: '#0f172a',
    contactEmail,
    contentHtml: `
      <p class="p">Hello ${escapeHtml(clientName)},</p>
      <p class="p">${escapeHtml(subject)}</p>

      <div class="box">
        <p class="box-title">Document Details</p>
        <table class="kvs">
          <tr><td class="key">Document Type</td><td class="value">${escapeHtml(documentTypeLabel)}</td></tr>
          <tr><td class="key">Document No.</td><td class="value">${escapeHtml(documentNumber)}</td></tr>
        </table>
      </div>

      <div class="box">
        <p class="box-title">Message</p>
        ${nl2br(message)}
      </div>

      <div class="note"><strong>Note:</strong> Please review the attached/embedded document and keep it for your records.</div>
      <p class="p">Best regards,<br><strong>NexoviaSoft Team</strong></p>
    `,
  });
}
