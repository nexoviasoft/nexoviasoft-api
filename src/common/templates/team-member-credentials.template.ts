import { escapeHtml, renderEmailLayout } from './email-layout.template';

export function getTeamMemberCredentialsTemplate(
  memberName: string,
  email: string,
  passwordPlain: string,
  position: string,
  contactEmail: string,
): string {
  return renderEmailLayout({
    preheader: 'Welcome to NexoviaSoft - your account is ready',
    eyebrow: 'Welcome',
    title: 'Your Account Credentials',
    subtitle: 'Use these credentials to access the system for the first time.',
    accent: '#0b7285',
    contactEmail,
    contentHtml: `
      <p class="p">Hello ${escapeHtml(memberName)},</p>
      <p class="p">Welcome to NexoviaSoft. Your account has been created for the role <strong>${escapeHtml(position)}</strong>.</p>

      <div class="box" style="border-left: 4px solid #0b7285;">
        <p class="box-title">Login Credentials</p>
        <table class="kvs">
          <tr><td class="key">Email</td><td class="value"><code>${escapeHtml(email)}</code></td></tr>
          <tr><td class="key">Password</td><td class="value"><code>${escapeHtml(passwordPlain)}</code></td></tr>
        </table>
      </div>

      <div class="note"><strong>Security notice:</strong> Change your password immediately after first login and do not share your credentials.</div>
      <p class="p">Best regards,<br><strong>NexoviaSoft Team</strong></p>
    `,
  });
}
