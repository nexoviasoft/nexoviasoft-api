"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderConfirmationTemplate = getOrderConfirmationTemplate;
const email_layout_template_1 = require("./email-layout.template");
function getOrderConfirmationTemplate(clientName, orderId, service, amount, orderDate, contactEmail, orderUrl) {
    const formattedAmount = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
    return (0, email_layout_template_1.renderEmailLayout)({
        preheader: `Order ${orderId} confirmed`,
        eyebrow: 'Order Confirmation',
        title: 'Order Confirmed',
        subtitle: 'Your order is now in our delivery pipeline.',
        accent: '#0f172a',
        contactEmail,
        contentHtml: `
      <p class="p">Hello ${(0, email_layout_template_1.escapeHtml)(clientName)},</p>
      <p class="p">Thank you for your order. We are excited to work with you.</p>

      <div class="box">
        <p class="box-title">Order Summary</p>
        <table class="kvs">
          <tr><td class="key">Order ID</td><td class="value">${(0, email_layout_template_1.escapeHtml)(orderId)}</td></tr>
          <tr><td class="key">Service</td><td class="value">${(0, email_layout_template_1.escapeHtml)(service)}</td></tr>
          <tr><td class="key">Date</td><td class="value">${(0, email_layout_template_1.escapeHtml)(orderDate)}</td></tr>
          <tr><td class="key">Amount</td><td class="value"><strong>${(0, email_layout_template_1.escapeHtml)(formattedAmount)}</strong></td></tr>
        </table>
      </div>

      ${orderUrl ? `<a class="cta" href="${orderUrl}" target="_blank" rel="noreferrer">View Order</a>` : ''}

      <div class="note"><strong>Next step:</strong> Our team will contact you with milestone updates and delivery timeline.</div>
      <p class="p">Best regards,<br><strong>NexoviaSoft Team</strong></p>
    `,
    });
}
//# sourceMappingURL=order-confirmation.template.js.map