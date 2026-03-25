import { escapeHtml, renderEmailLayout } from './email-layout.template';

export function getLeaveApprovalTemplate(
  employeeName: string,
  leaveType: string,
  startDate: string,
  endDate: string,
  days: number,
  reason: string | null,
  contactEmail: string,
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
    preheader: 'Your leave request is approved',
    eyebrow: 'Leave Update',
    title: 'Leave Request Approved',
    subtitle: 'Your requested leave has been approved by management.',
    accent: '#15803d',
    contactEmail,
    contentHtml: `
      <p class="p">Hello ${escapeHtml(employeeName)},</p>
      <p class="p">Your leave request has been approved.</p>

      <div class="box" style="border-left: 4px solid #15803d;">
        <p class="box-title">Leave Details</p>
        <table class="kvs">
          <tr><td class="key">Type</td><td class="value">${escapeHtml(leaveType)}</td></tr>
          <tr><td class="key">Start Date</td><td class="value">${escapeHtml(startDateFormatted)}</td></tr>
          <tr><td class="key">End Date</td><td class="value">${escapeHtml(endDateFormatted)}</td></tr>
          <tr><td class="key">Duration</td><td class="value">${days} ${days === 1 ? 'day' : 'days'}</td></tr>
          ${reason ? `<tr><td class="key">Reason</td><td class="value">${escapeHtml(reason)}</td></tr>` : ''}
          <tr><td class="key">Status</td><td class="value"><span class="badge" style="color:#15803d;border-color:#86efac;">Approved</span></td></tr>
        </table>
      </div>

      <p class="p">Please complete handover before your leave starts.</p>
      <p class="p">Best regards,<br><strong>NexoviaSoft Team</strong></p>
    `,
  });
}
