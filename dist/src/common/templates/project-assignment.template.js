"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjectAssignmentTemplate = void 0;
const email_layout_template_1 = require("./email-layout.template");
const getProjectAssignmentTemplate = (teamMemberName, projectName, projectRole, contactEmail) => {
    return (0, email_layout_template_1.renderEmailLayout)({
        preheader: `You've been added to ${projectName}`,
        eyebrow: 'Project Assignment',
        title: 'New Project Assignment',
        subtitle: `Welcome aboard! You have been assigned a new role in ${projectName}.`,
        accent: '#F58220',
        contactEmail,
        contentHtml: `
      <div style="margin-bottom: 24px;">
        <p class="p" style="font-size: 16px; color: #4b5563;">Hello ${(0, email_layout_template_1.escapeHtml)(teamMemberName)},</p>
        <p class="p" style="font-size: 16px; color: #4b5563;">
          You have been added to a new project. We're excited to have you on the team.
        </p>
      </div>

      <div style="background-color: #f8fafc; border-radius: 12px; padding: 24px; border: 1px solid #e2e8f0; margin-bottom: 32px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding-bottom: 16px;">
              <span style="font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 4px;">Project Name</span>
              <span style="font-size: 18px; font-weight: 700; color: #1e293b;">${(0, email_layout_template_1.escapeHtml)(projectName)}</span>
            </td>
          </tr>
          <tr>
            <td>
              <span style="font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 4px;">Your Role</span>
              <span style="display: inline-block; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: 700; background-color: #F5822020; color: #F58220; border: 1px solid #F5822040;">
                ${(0, email_layout_template_1.escapeHtml)(projectRole.toUpperCase())}
              </span>
            </td>
          </tr>
        </table>
      </div>

      <div style="text-align: center; margin-bottom: 32px;">
        <p class="p" style="font-size: 15px; color: #475569; margin-bottom: 24px;">
          Log in to your dashboard to view the project roadmap, tasks, and start collaborating with your team.
        </p>
        <a href="${process.env.FRONTEND_URL || 'https://admin.nexoviasoft.com'}/admin/projects" style="display: inline-block; background: linear-gradient(135deg, #F58220 0%, #ff9a44 100%); color: #ffffff; font-weight: 700; font-size: 16px; padding: 16px 32px; text-decoration: none; border-radius: 8px; box-shadow: 0 10px 15px -3px rgba(245, 130, 32, 0.3); transition: all 0.2s ease;">
          Go to Dashboard
        </a>
      </div>

      <p class="p" style="font-size: 14px; font-weight: 600; color: #334155; margin-top: 32px; border-top: 1px solid #e2e8f0; padding-top: 24px;">
        Best regards,<br>
        <span style="color: #F58220;">NexoviaSoft Team</span>
      </p>
    `,
    });
};
exports.getProjectAssignmentTemplate = getProjectAssignmentTemplate;
//# sourceMappingURL=project-assignment.template.js.map