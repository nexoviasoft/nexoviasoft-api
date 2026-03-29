import { escapeHtml, renderEmailLayout } from './email-layout.template';

export function getTaskAssignmentTemplate(
  teamMemberName: string,
  taskTitle: string,
  taskDescription: string,
  projectName: string,
  priority: string,
  dueDate: string | null,
  contactEmail: string,
  taskUrl?: string,
): string {
  const priorityLower = priority.toLowerCase();
  const priorityAccent =
    priorityLower === 'high' ? '#dc2626' : priorityLower === 'low' ? '#15803d' : '#F58220';

  const dueDateText = dueDate
    ? new Date(dueDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Not set';

  return renderEmailLayout({
    preheader: `New task assigned: ${taskTitle}`,
    eyebrow: 'Task Assignment',
    title: 'New Task for You',
    subtitle: `You've been assigned a new task in ${projectName}. Here are the details.`,
    accent: '#F58220',
    contactEmail,
    contentHtml: `
      <div style="margin-bottom: 24px;">
        <p class="p" style="font-size: 16px; color: #4b5563;">Hello ${escapeHtml(teamMemberName)},</p>
        <p class="p" style="font-size: 16px; color: #4b5563;">
          A new task has been assigned to you. Please review the requirements and start when ready.
        </p>
      </div>

      <div style="background-color: #f8fafc; border-radius: 12px; padding: 24px; border: 1px solid #e2e8f0; margin-bottom: 32px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding-bottom: 16px;">
              <span style="font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 4px;">Task Title</span>
              <span style="font-size: 18px; font-weight: 700; color: #1e293b;">${escapeHtml(taskTitle)}</span>
            </td>
          </tr>
          <tr>
            <td style="padding-bottom: 16px;">
              <span style="font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 4px;">Project</span>
              <span style="font-size: 16px; color: #334155;">${escapeHtml(projectName)}</span>
            </td>
          </tr>
          <tr>
            <td>
              <table style="width: 100%;">
                <tr>
                  <td style="width: 50%;">
                    <span style="font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 4px;">Priority</span>
                    <span style="display: inline-block; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: 700; background-color: ${priorityAccent}20; color: ${priorityAccent}; border: 1px solid ${priorityAccent}40;">
                      ${escapeHtml(priority.toUpperCase())}
                    </span>
                  </td>
                  <td style="width: 50%;">
                    <span style="font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 4px;">Due Date</span>
                    <span style="font-size: 14px; font-weight: 600; color: #ef4444;">${escapeHtml(dueDateText)}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>

      ${taskDescription ? `
      <div style="margin-bottom: 32px;">
        <p style="font-size: 14px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px;">Description</p>
        <div style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; font-size: 15px; color: #475569; line-height: 1.6;">
          ${escapeHtml(taskDescription)}
        </div>
      </div>
      ` : ''}

      ${taskUrl ? `
      <div style="text-align: center; margin-bottom: 32px;">
        <a href="${taskUrl}" style="display: inline-block; background: linear-gradient(135deg, #F58220 0%, #ff9a44 100%); color: #ffffff; font-weight: 700; font-size: 16px; padding: 16px 32px; text-decoration: none; border-radius: 8px; box-shadow: 0 10px 15px -3px rgba(245, 130, 32, 0.3); transition: all 0.2s ease;">
          Open Task in Board
        </a>
      </div>
      ` : ''}

      <p class="p" style="font-size: 14px; color: #64748b; text-align: center;">
        Please update the task status as you make progress.
      </p>

      <p class="p" style="font-size: 14px; font-weight: 600; color: #334155; margin-top: 32px; border-top: 1px solid #e2e8f0; padding-top: 24px;">
        Best regards,<br>
        <span style="color: #F58220;">NexoviaSoft Team</span>
      </p>
    `,
  });
}
