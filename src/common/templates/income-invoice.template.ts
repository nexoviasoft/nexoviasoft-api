import { escapeHtml, renderEmailLayout } from './email-layout.template';

export function getIncomeInvoiceTemplate(
  clientName: string,
  amount: number,
  orderId: string,
  date: string,
  contactEmail: string,
  balanceValue: number,
  totalPaidSoFar: number,
): string {
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);

  const formattedBalance = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(balanceValue);

  const formattedTotalPaid = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(totalPaidSoFar);

  return renderEmailLayout({
    preheader: `Payment Received - Order #${orderId}`,
    eyebrow: 'Payment Receipt',
    title: 'Payment Received',
    subtitle: 'Thank you for your payment!',
    accent: '#10b981',
    contactEmail,
    contentHtml: `
      <p class="p">Hello ${escapeHtml(clientName)},</p>
      <p class="p">We have received your payment for the following order. A summary of the transaction is provided below.</p>

      <div class="box">
        <p class="box-title">Payment Summary</p>
        <table class="kvs">
          <tr><td class="key">Order ID</td><td class="value">#${escapeHtml(orderId)}</td></tr>
          <tr><td class="key">Received Amount</td><td class="value"><span style="color: #10b981;">${escapeHtml(formattedAmount)}</span></td></tr>
          <tr><td class="key">Total Paid So Far</td><td class="value">${escapeHtml(formattedTotalPaid)}</td></tr>
          <tr><td class="key">Payment Date</td><td class="value">${escapeHtml(date)}</td></tr>
          <tr><td class="key">Remaining Balance</td><td class="value"><strong style="color: ${balanceValue > 0 ? '#ef4444' : '#10b981'};">${escapeHtml(formattedBalance)}</strong></td></tr>
        </table>
      </div>

      <div class="signature-area">
        <div class="signature-name">NexoviaSoft Team</div>
        <div class="signature-label">Finance Department</div>
      </div>
    `,
  });
}
