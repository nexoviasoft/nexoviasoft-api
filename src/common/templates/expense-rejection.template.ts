import { renderEmailLayout, nl2br } from './email-layout.template';

export function getExpenseRejectionTemplate(
  employeeName: string,
  expenseType: string,
  amount: number,
  rejectionReason: string | null,
  managerName: string,
  contactEmail: string,
): string {
  const contentHtml = `
    <p class="p">Dear <strong>${employeeName}</strong>,</p>
    <p class="p">We are writing to inform you that your expense request for <strong>${expenseType}</strong> has been <strong>rejected</strong>.</p>
    
    <div class="box" style="background-color: #fef2f2; border-color: #fecaca;">
      <h3 class="box-title" style="color: #991b1b;">Rejection Details</h3>
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
          <td class="key">Rejected By</td>
          <td class="value">${managerName}</td>
        </tr>
      </table>
    </div>

    ${rejectionReason ? `
      <div class="note">
        <strong>Reason for Rejection:</strong><br/>
        ${rejectionReason}
      </div>
    ` : ''}

    <p class="p">If you have any questions or would like to provide additional information, please discuss this with your manager.</p>

    <div style="margin-top: 20px; text-align: center;">
      <div style="font-family: 'Brush Script MT', cursive; font-size: 20px; color: #1e293b;">${managerName}</div>
      <div style="font-size: 12px; font-weight: bold; color: #64748b; border-top: 1px solid #e2e8f0; display: inline-block; padding-top: 4px; min-width: 150px;">Authorized Signature</div>
    </div>
  `;

  return renderEmailLayout({
    title: 'Expense Request Rejected',
    eyebrow: 'Expense Management',
    accent: '#ef4444', // Red-500
    contentHtml,
    contactEmail,
  });
}
