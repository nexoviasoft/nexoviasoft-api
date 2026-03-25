import { escapeHtml, renderEmailLayout } from './email-layout.template';

export const getProjectAssignmentTemplate = (
  teamMemberName: string,
  projectName: string,
  projectRole: string,
  contactEmail: string,
): string => {
  return renderEmailLayout({
    preheader: `You are assigned to ${projectName}`,
    eyebrow: 'Project Assignment',
    title: 'New Project Assignment',
    subtitle: 'You have been added to a new project with a defined role.',
    accent: '#5b21b6',
    contactEmail,
    contentHtml: `
      <p class="p">Hello ${escapeHtml(teamMemberName)},</p>
      <p class="p">You are now part of a new project at NexoviaSoft. Please review your assignment details:</p>

      <div class="box">
        <p class="box-title">Assignment Details</p>
        <table class="kvs">
          <tr><td class="key">Project</td><td class="value">${escapeHtml(projectName)}</td></tr>
          <tr><td class="key">Role</td><td class="value">${escapeHtml(projectRole)}</td></tr>
        </table>
      </div>

      <p class="p">Log in to your dashboard to view tasks, deadlines, and collaboration updates.</p>
      <p class="p">Best regards,<br><strong>NexoviaSoft Team</strong></p>
    `,
  });
};
