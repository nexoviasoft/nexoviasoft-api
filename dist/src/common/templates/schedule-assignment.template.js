"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getScheduleAssignmentTemplate = getScheduleAssignmentTemplate;
const email_layout_template_1 = require("./email-layout.template");
function getScheduleAssignmentTemplate(teamMemberName, shifts, contactEmail, weekStartDate, weekEndDate) {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const scheduleRows = days
        .map((day, idx) => {
        const shift = shifts[idx];
        if (!shift) {
            return `<tr><td class="key">${day}</td><td class="value">No shift assigned</td></tr>`;
        }
        return `<tr><td class="key">${day}</td><td class="value"><strong>${(0, email_layout_template_1.escapeHtml)(shift.time || 'Time TBD')}</strong> · ${(0, email_layout_template_1.escapeHtml)(shift.label || 'Label TBD')} · ${(0, email_layout_template_1.escapeHtml)(shift.type || 'Type TBD')}</td></tr>`;
    })
        .join('');
    const range = weekStartDate && weekEndDate
        ? `${new Date(weekStartDate).toLocaleDateString()} - ${new Date(weekEndDate).toLocaleDateString()}`
        : 'Current week';
    return (0, email_layout_template_1.renderEmailLayout)({
        preheader: 'Your new weekly schedule is ready',
        eyebrow: 'Schedule',
        title: 'Weekly Assignment',
        subtitle: 'Please review your shift plan below.',
        accent: '#1769e0',
        contactEmail,
        contentHtml: `
      <p class="p">Hello ${(0, email_layout_template_1.escapeHtml)(teamMemberName)},</p>
      <p class="p">Your schedule has been assigned for <strong>${(0, email_layout_template_1.escapeHtml)(range)}</strong>.</p>

      <div class="box">
        <p class="box-title">Shift Plan</p>
        <table class="kvs">${scheduleRows}</table>
      </div>

      <p class="p">If you need a schedule adjustment, contact your supervisor as early as possible.</p>
      <p class="p">Best regards,<br><strong>NexoviaSoft Team</strong></p>
    `,
    });
}
//# sourceMappingURL=schedule-assignment.template.js.map