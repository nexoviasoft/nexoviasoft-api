import { escapeHtml, renderEmailLayout } from './email-layout.template';

export function getServiceRequestConfirmationTemplate(
  clientName: string,
  serviceType: string,
  contactEmail: string,
): string {
  const safeClientName = escapeHtml(clientName);
  const safeServiceType = escapeHtml(serviceType);

  return renderEmailLayout({
    preheader: `We received your ${serviceType} request`,
    eyebrow: 'Service Request',
    title: 'Request Received',
    subtitle: 'Our team is reviewing your request and will contact you shortly.',
    accent: '#0f9d58',
    contactEmail,
    contentHtml: `
      <p class="p">Hello ${safeClientName},</p>
      <p class="p">Thank you for choosing NexoviaSoft. We successfully received your request for <strong>${safeServiceType}</strong>.</p>

      <div class="box">
        <p class="box-title">What Happens Next</p>
        <table class="kvs">
          <tr><td class="key">Review</td><td class="value">We check your requirements and scope.</td></tr>
          <tr><td class="key">Contact</td><td class="value">We follow up by email/WhatsApp for details.</td></tr>
          <tr><td class="key">Proposal</td><td class="value">You receive timeline and execution plan.</td></tr>
        </table>
      </div>

      <p class="p">If your request is urgent, contact us directly and we will prioritize it.</p>
      <p class="p">Best regards,<br><strong>NexoviaSoft Team</strong></p>
    `,
  });
}
