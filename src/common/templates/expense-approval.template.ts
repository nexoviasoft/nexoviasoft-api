import { renderEmailLayout, nl2br } from './email-layout.template';

export function getExpenseApprovalTemplate(
  employeeName: string,
  expenseType: string,
  amount: number,
  managerName: string,
  contactEmail: string,
): string {
  const contentHtml = `
    <p class="p">Dear <strong>${employeeName}</strong>,</p>
    <p class="p">We are pleased to inform you that your expense request for <strong>${expenseType}</strong> has been <strong>approved</strong>.</p>
    
    <div class="box">
      <h3 class="box-title">Expense Details</h3>
      <table class="kvs">
        <tr>
          <td class="key">Amount</td>
          <td class="value">$${amount.toLocaleString()}</td>
        </tr>
        <tr>
          <td class="key">Type</td>
          <td class="value">${expenseType}</td>
        </tr>
        <tr>
          <td class="key">Approved By</td>
          <td class="value">${managerName}</td>
        </tr>
      </table>
    </div>

    <p class="p">An official invoice has been generated for this expense. You can find the document attached or previewed below.</p>
    
    <div style="margin-top: 20px; text-align: center;">
      <div style="font-family: 'Brush Script MT', cursive; font-size: 20px; color: #1e293b;">${managerName}</div>
      <div style="font-size: 12px; font-weight: bold; color: #64748b; border-top: 1px solid #e2e8f0; display: inline-block; padding-top: 4px; min-width: 150px;">Authorized Signature</div>
    </div>
  `;

  return renderEmailLayout({
    title: 'Expense Request Approved',
    eyebrow: 'Expense Management',
    accent: '#10b981', // Emerald-500
    contentHtml,
    contactEmail,
  });
}
