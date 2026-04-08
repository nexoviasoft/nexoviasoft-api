"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTaskCommentNotificationTemplate = getTaskCommentNotificationTemplate;
const email_layout_template_1 = require("./email-layout.template");
function getTaskCommentNotificationTemplate(authorName, taskTitle, commentContent, projectName, taskUrl, contactEmail) {
    return (0, email_layout_template_1.renderEmailLayout)({
        preheader: `New comment from ${authorName} on task: ${taskTitle}`,
        eyebrow: 'Task Discussion',
        title: 'New Task Comment',
        subtitle: `${authorName} just posted a new update in the discussion for this task.`,
        accent: '#F58220',
        contactEmail,
        contentHtml: `
      <div style="margin-bottom: 30px;">
        <p class="p" style="font-size: 16px; color: #4b5563;">Hello,</p>
        <p class="p" style="font-size: 16px; color: #4b5563;">
          <strong>${(0, email_layout_template_1.escapeHtml)(authorName)}</strong> left a comment on the task 
          <span style="color: #F58220; font-weight: 600;">"${(0, email_layout_template_1.escapeHtml)(taskTitle)}"</span> 
          in the project <strong style="color: #111827;">${(0, email_layout_template_1.escapeHtml)(projectName)}</strong>.
        </p>
      </div>

      <div style="background-color: #f8fafc; border-radius: 12px; padding: 24px; border: 1px solid #e2e8f0; margin-bottom: 32px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
        <div style="display: flex; align-items: start; margin-bottom: 12px;">
          <div style="background-color: #F58220; width: 4px; height: 24px; border-radius: 2px; margin-right: 12px;"></div>
          <p style="margin: 0; font-size: 14px; font-weight: 700; color: #1e293b; text-transform: uppercase; letter-spacing: 0.05em;">New Message</p>
        </div>
        <div style="font-family: inherit; font-size: 16px; line-height: 1.6; color: #334155; font-style: italic;">
          "${(0, email_layout_template_1.escapeHtml)(commentContent)}"
        </div>
      </div>

      <div style="text-align: center; margin-bottom: 32px;">
        <a href="${taskUrl}" style="display: inline-block; background: linear-gradient(135deg, #F58220 0%, #ff9a44 100%); color: #ffffff; font-weight: 700; font-size: 16px; padding: 16px 32px; text-decoration: none; border-radius: 8px; box-shadow: 0 10px 15px -3px rgba(245, 130, 32, 0.3); transition: all 0.2s ease;">
          View Discussion & Reply
        </a>
      </div>

      <div style="border-top: 1px solid #e2e8f0; padding-top: 24px; margin-top: 8px;">
        <p class="p" style="font-size: 14px; color: #64748b; margin-bottom: 4px;">
          Quick Tip: You can manage your notification preferences in your profile settings.
        </p>
        <p class="p" style="font-size: 14px; font-weight: 600; color: #334155; margin-top: 16px;">
          Best regards,<br>
          <span style="color: #F58220;">NexoviaSoft Team</span>
        </p>
      </div>
    `,
    });
}
//# sourceMappingURL=task-comment-notification.template.js.map