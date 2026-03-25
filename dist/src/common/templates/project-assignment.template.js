"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjectAssignmentTemplate = void 0;
const email_layout_template_1 = require("./email-layout.template");
const getProjectAssignmentTemplate = (teamMemberName, projectName, projectRole, contactEmail) => {
    return (0, email_layout_template_1.renderEmailLayout)({
        preheader: `You are assigned to ${projectName}`,
        eyebrow: 'Project Assignment',
        title: 'New Project Assignment',
        subtitle: 'You have been added to a new project with a defined role.',
        accent: '#5b21b6',
        contactEmail,
        contentHtml: `
      <p class="p">Hello ${(0, email_layout_template_1.escapeHtml)(teamMemberName)},</p>
      <p class="p">You are now part of a new project at NexoviaSoft. Please review your assignment details:</p>

      <div class="box">
        <p class="box-title">Assignment Details</p>
        <table class="kvs">
          <tr><td class="key">Project</td><td class="value">${(0, email_layout_template_1.escapeHtml)(projectName)}</td></tr>
          <tr><td class="key">Role</td><td class="value">${(0, email_layout_template_1.escapeHtml)(projectRole)}</td></tr>
        </table>
      </div>

      <p class="p">Log in to your dashboard to view tasks, deadlines, and collaboration updates.</p>
      <p class="p">Best regards,<br><strong>NexoviaSoft Team</strong></p>
    `,
    });
};
exports.getProjectAssignmentTemplate = getProjectAssignmentTemplate;
//# sourceMappingURL=project-assignment.template.js.map