"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLeaveRejectionTemplate = getLeaveRejectionTemplate;
const email_layout_template_1 = require("./email-layout.template");
function getLeaveRejectionTemplate(employeeName, leaveType, startDate, endDate, days, reason, contactEmail, rejectionReason) {
    const startDateFormatted = new Date(startDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    const endDateFormatted = new Date(endDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    return (0, email_layout_template_1.renderEmailLayout)({
        preheader: 'Your leave request status was updated',
        eyebrow: 'Leave Update',
        title: 'Leave Request Rejected',
        subtitle: 'Your requested leave could not be approved at this time.',
        accent: '#b91c1c',
        contactEmail,
        contentHtml: `
      <p class="p">Hello ${(0, email_layout_template_1.escapeHtml)(employeeName)},</p>
      <p class="p">After review, your leave request has been rejected.</p>

      <div class="box" style="border-left: 4px solid #b91c1c; background:#fff7f7;">
        <p class="box-title">Leave Details</p>
        <table class="kvs">
          <tr><td class="key">Type</td><td class="value">${(0, email_layout_template_1.escapeHtml)(leaveType)}</td></tr>
          <tr><td class="key">Start Date</td><td class="value">${(0, email_layout_template_1.escapeHtml)(startDateFormatted)}</td></tr>
          <tr><td class="key">End Date</td><td class="value">${(0, email_layout_template_1.escapeHtml)(endDateFormatted)}</td></tr>
          <tr><td class="key">Duration</td><td class="value">${days} ${days === 1 ? 'day' : 'days'}</td></tr>
          ${reason ? `<tr><td class="key">Reason</td><td class="value">${(0, email_layout_template_1.escapeHtml)(reason)}</td></tr>` : ''}
          <tr><td class="key">Status</td><td class="value"><span class="badge" style="color:#b91c1c;border-color:#fecaca;background:#fff1f2;">Rejected</span></td></tr>
        </table>
      </div>

      ${rejectionReason ? `<div class="note"><strong>Reason:</strong> ${(0, email_layout_template_1.escapeHtml)(rejectionReason)}</div>` : ''}
      <p class="p">If needed, discuss alternatives with your manager.</p>
      <p class="p">Best regards,<br><strong>NexoviaSoft Team</strong></p>
    `,
    });
}
//# sourceMappingURL=leave-rejection.template.js.map