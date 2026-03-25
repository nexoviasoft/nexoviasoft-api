import { escapeHtml, renderEmailLayout } from './email-layout.template';

export function getOrderConfirmationTemplate(
  clientName: string,
  orderId: string,
  service: string,
  amount: number,
  orderDate: string,
  contactEmail: string,
  orderUrl?: string,
): string {
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);

  return renderEmailLayout({
    preheader: `Order ${orderId} confirmed`,
    eyebrow: 'Order Confirmation',
    title: 'Order Confirmed',
    subtitle: 'Your order is now in our delivery pipeline.',
    accent: '#0f172a',
    contactEmail,
    contentHtml: `
      <p class="p">Hello ${escapeHtml(clientName)},</p>
      <p class="p">Thank you for your order. We are excited to work with you.</p>

      <div class="box">
        <p class="box-title">Order Summary</p>
        <table class="kvs">
          <tr><td class="key">Order ID</td><td class="value">${escapeHtml(orderId)}</td></tr>
          <tr><td class="key">Service</td><td class="value">${escapeHtml(service)}</td></tr>
          <tr><td class="key">Date</td><td class="value">${escapeHtml(orderDate)}</td></tr>
          <tr><td class="key">Amount</td><td class="value"><strong>${escapeHtml(formattedAmount)}</strong></td></tr>
        </table>
      </div>

      ${orderUrl ? `<a class="cta" href="${orderUrl}" target="_blank" rel="noreferrer">View Order</a>` : ''}

      <div class="note"><strong>Next step:</strong> Our team will contact you with milestone updates and delivery timeline.</div>
      <p class="p">Best regards,<br><strong>NexoviaSoft Team</strong></p>
    `,
  });
}
