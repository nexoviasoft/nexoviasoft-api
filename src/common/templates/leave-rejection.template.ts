import { escapeHtml, renderEmailLayout } from './email-layout.template';

export function getLeaveRejectionTemplate(
  employeeName: string,
  leaveType: string,
  startDate: string,
  endDate: string,
  days: number,
  reason: string | null,
  contactEmail: string,
  rejectionReason?: string,
): string {
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

  return renderEmailLayout({
    preheader: 'Your leave request status was updated',
    eyebrow: 'Leave Update',
    title: 'Leave Request Rejected',
    subtitle: 'Your requested leave could not be approved at this time.',
    accent: '#b91c1c',
    contactEmail,
    contentHtml: `
      <p class="p">Hello ${escapeHtml(employeeName)},</p>
      <p class="p">After review, your leave request has been rejected.</p>

      <div class="box" style="border-left: 4px solid #b91c1c; background:#fff7f7;">
        <p class="box-title">Leave Details</p>
        <table class="kvs">
          <tr><td class="key">Type</td><td class="value">${escapeHtml(leaveType)}</td></tr>
          <tr><td class="key">Start Date</td><td class="value">${escapeHtml(startDateFormatted)}</td></tr>
          <tr><td class="key">End Date</td><td class="value">${escapeHtml(endDateFormatted)}</td></tr>
          <tr><td class="key">Duration</td><td class="value">${days} ${days === 1 ? 'day' : 'days'}</td></tr>
          ${reason ? `<tr><td class="key">Reason</td><td class="value">${escapeHtml(reason)}</td></tr>` : ''}
          <tr><td class="key">Status</td><td class="value"><span class="badge" style="color:#b91c1c;border-color:#fecaca;background:#fff1f2;">Rejected</span></td></tr>
        </table>
      </div>

      ${rejectionReason ? `<div class="note"><strong>Reason:</strong> ${escapeHtml(rejectionReason)}</div>` : ''}
      <p class="p">If needed, discuss alternatives with your manager.</p>
      <p class="p">Best regards,<br><strong>NexoviaSoft Team</strong></p>
    `,
  });
}
