"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTaskAssignmentTemplate = getTaskAssignmentTemplate;
const email_layout_template_1 = require("./email-layout.template");
function getTaskAssignmentTemplate(teamMemberName, taskTitle, taskDescription, projectName, priority, dueDate, contactEmail, taskUrl) {
    const priorityLower = priority.toLowerCase();
    const priorityAccent = priorityLower === 'high' ? '#dc2626' : priorityLower === 'low' ? '#15803d' : '#d97706';
    const dueDateText = dueDate
        ? new Date(dueDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
        : 'Not set';
    return (0, email_layout_template_1.renderEmailLayout)({
        preheader: `New task: ${taskTitle}`,
        eyebrow: 'Task Assignment',
        title: 'New Task Assigned',
        subtitle: 'A new task has been assigned to you. Review the details and next deadline.',
        accent: '#0b1f46',
        contactEmail,
        contentHtml: `
      <p class="p">Hello ${(0, email_layout_template_1.escapeHtml)(teamMemberName)},</p>
      <p class="p">You have a new task in <strong>${(0, email_layout_template_1.escapeHtml)(projectName)}</strong>.</p>

      <div class="box" style="border-left: 4px solid ${priorityAccent};">
        <p class="box-title">Task Details</p>
        <table class="kvs">
          <tr><td class="key">Title</td><td class="value">${(0, email_layout_template_1.escapeHtml)(taskTitle)}</td></tr>
          <tr><td class="key">Project</td><td class="value">${(0, email_layout_template_1.escapeHtml)(projectName)}</td></tr>
          <tr><td class="key">Priority</td><td class="value"><span class="badge" style="border-color:${priorityAccent}; color:${priorityAccent};">${(0, email_layout_template_1.escapeHtml)(priority)}</span></td></tr>
          <tr><td class="key">Due Date</td><td class="value">${(0, email_layout_template_1.escapeHtml)(dueDateText)}</td></tr>
        </table>
      </div>

      ${taskDescription ? `<div class="box"><p class="box-title">Description</p><p class="p">${(0, email_layout_template_1.escapeHtml)(taskDescription)}</p></div>` : ''}
      ${taskUrl ? `<a class="cta" href="${taskUrl}" target="_blank" rel="noreferrer">Open Task</a>` : ''}

      <p class="p">Please start this task as soon as possible and update status regularly.</p>
      <p class="p">Best regards,<br><strong>NexoviaSoft Team</strong></p>
    `,
    });
}
//# sourceMappingURL=task-assignment.template.js.map