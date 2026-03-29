"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExpenseRejectionTemplate = getExpenseRejectionTemplate;
const email_layout_template_1 = require("./email-layout.template");
function getExpenseRejectionTemplate(employeeName, expenseType, amount, rejectionReason, managerName, contactEmail) {
    const contentHtml = `
    <p class="p">Hello <strong>${employeeName}</strong>,</p>
    <p class="p">We are writing to inform you that your expense request for <strong>${expenseType}</strong> has been <strong>rejected</strong> by management.</p>
    
    <div class="box" style="background-color: #fff1f2; border-color: #fecdd3;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
        <h3 class="box-title" style="margin: 0; color: #9f1239;">Rejection Details</h3>
        <span class="badge badge-error">Rejected</span>
      </div>
      <table class="kvs">
        <tr>
          <td class="key">Amount</td>
          <td class="value" style="color: #be123c;">$${amount.toLocaleString()}</td>
        </tr>
        <tr>
          <td class="key">Expense Type</td>
          <td class="value">${expenseType}</td>
        </tr>
        <tr>
          <td class="key">Rejected By</td>
          <td class="value">${managerName}</td>
        </tr>
      </table>
    </div>

    ${rejectionReason ? `
      <div class="note" style="background-color: #fff1f2; border-color: #fecdd3; color: #9f1239;">
        <strong style="display: block; margin-bottom: 4px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Reason for Rejection</strong>
        ${rejectionReason}
      </div>
    ` : ''}

    <p class="p">If you have any questions or would like to provide additional information for a follow-up, please reach out to your reporting manager.</p>

    <div style="text-align: center; margin: 32px 0;">
      <a href="${process.env.FRONTEND_URL || 'https://admin.nexoviasoft.com'}/expense" class="cta">
        Review My Expenses
      </a>
    </div>

    <div class="signature-area">
      <div class="signature-name">${managerName}</div>
      <div class="signature-label">Authorized Signature</div>
    </div>
  `;
    return (0, email_layout_template_1.renderEmailLayout)({
        title: 'Expense Request Rejected',
        eyebrow: 'Expense Management',
        accent: '#ef4444',
        contentHtml,
        contactEmail,
    });
}
//# sourceMappingURL=expense-rejection.template.js.map