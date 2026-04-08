"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getServiceRequestConfirmationTemplate = getServiceRequestConfirmationTemplate;
const email_layout_template_1 = require("./email-layout.template");
function getServiceRequestConfirmationTemplate(clientName, serviceType, contactEmail) {
    const safeClientName = (0, email_layout_template_1.escapeHtml)(clientName);
    const safeServiceType = (0, email_layout_template_1.escapeHtml)(serviceType);
    return (0, email_layout_template_1.renderEmailLayout)({
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
//# sourceMappingURL=service-request-confirmation.template.js.map