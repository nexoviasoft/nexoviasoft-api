"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExpenseApprovalTemplate = getExpenseApprovalTemplate;
const email_layout_template_1 = require("./email-layout.template");
function getExpenseApprovalTemplate(employeeName, expenseType, amount, managerName, contactEmail, invoiceId) {
    const contentHtml = `
    <p class="p">Hello <strong>${employeeName}</strong>,</p>
    <p class="p">Great news! Your expense reimbursement request for <strong>${expenseType}</strong> has been <strong>approved</strong> and is now being processed.</p>
    
    <div class="box">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
        <h3 class="box-title" style="margin: 0;">Expense Details</h3>
        <span class="badge badge-success">Approved</span>
      </div>
      <table class="kvs">
        <tr>
          <td class="key">Amount</td>
          <td class="value" style="font-size: 18px; color: #10b981;">$${amount.toLocaleString()}</td>
        </tr>
        <tr>
          <td class="key">Expense Type</td>
          <td class="value">${expenseType}</td>
        </tr>
        <tr>
          <td class="key">Approved By</td>
          <td class="value">${managerName}</td>
        </tr>
      </table>
    </div>

    ${invoiceId ? `
    <div class="box" style="background: #f8fafc; border-style: dashed; border-color: #cbd5e1;">
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
        <div style="background: #10b981; color: white; width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: bold;">
          DOC
        </div>
        <div>
          <div style="font-size: 14px; font-weight: 600; color: #0f172a;">Official Invoice Generated</div>
          <div style="font-size: 12px; color: #64748b;">Ref: EXP-${invoiceId}</div>
        </div>
      </div>
      <p style="font-size: 13px; color: #475569; margin: 0 0 16px;">An official record of this expense has been generated for your records.</p>
      <a href="${process.env.FRONTEND_URL || 'https://admin.nexoviasoft.com'}/invoice/${invoiceId}" 
         style="display: inline-block; color: #10b981; font-weight: 700; text-decoration: none; font-size: 14px; border: 1px solid #10b981; padding: 8px 16px; border-radius: 8px;">
        Download Invoice (PDF)
      </a>
    </div>
    ` : ''}

    <p class="p">You can track the status of all your reimbursements directly from your dashboard.</p>
    
    <div style="text-align: center; margin: 32px 0;">
      <a href="${process.env.FRONTEND_URL || 'https://admin.nexoviasoft.com'}/expense" class="cta">
        Go to Dashboard
      </a>
    </div>

    <div class="signature-area">
      <div class="signature-name">${managerName}</div>
      <div class="signature-label">Authorized Approval</div>
    </div>
  `;
    return (0, email_layout_template_1.renderEmailLayout)({
        title: 'Expense Request Approved',
        eyebrow: 'Expense Management',
        accent: '#10b981',
        contentHtml,
        contactEmail,
    });
}
//# sourceMappingURL=expense-approval.template.js.map