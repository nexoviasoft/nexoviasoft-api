import { escapeHtml, renderEmailLayout } from './email-layout.template';

export function getScheduleAssignmentTemplate(
  teamMemberName: string,
  shifts: Array<{ time?: string; label?: string; type?: string } | null>,
  contactEmail: string,
  weekStartDate?: string,
  weekEndDate?: string,
): string {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const scheduleRows = days
    .map((day, idx) => {
      const shift = shifts[idx];
      if (!shift) {
        return `<tr><td class="key">${day}</td><td class="value">No shift assigned</td></tr>`;
      }
      return `<tr><td class="key">${day}</td><td class="value"><strong>${escapeHtml(shift.time || 'Time TBD')}</strong> · ${escapeHtml(shift.label || 'Label TBD')} · ${escapeHtml(shift.type || 'Type TBD')}</td></tr>`;
    })
    .join('');

  const range =
    weekStartDate && weekEndDate
      ? `${new Date(weekStartDate).toLocaleDateString()} - ${new Date(weekEndDate).toLocaleDateString()}`
      : 'Current week';

  return renderEmailLayout({
    preheader: 'Your new weekly schedule is ready',
    eyebrow: 'Schedule',
    title: 'Weekly Assignment',
    subtitle: 'Please review your shift plan below.',
    accent: '#1769e0',
    contactEmail,
    contentHtml: `
      <p class="p">Hello ${escapeHtml(teamMemberName)},</p>
      <p class="p">Your schedule has been assigned for <strong>${escapeHtml(range)}</strong>.</p>

      <div class="box">
        <p class="box-title">Shift Plan</p>
        <table class="kvs">${scheduleRows}</table>
      </div>

      <p class="p">If you need a schedule adjustment, contact your supervisor as early as possible.</p>
      <p class="p">Best regards,<br><strong>NexoviaSoft Team</strong></p>
    `,
  });
}
