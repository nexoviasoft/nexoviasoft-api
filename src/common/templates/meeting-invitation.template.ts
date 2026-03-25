import { escapeHtml, renderEmailLayout } from './email-layout.template';

export function getMeetingInvitationTemplate(params: {
  attendeeName: string;
  topic: string;
  description?: string | null;
  dateTimeIso: string;
  durationMinutes: number;
  meetingLink: string;
  organizerName?: string | null;
  contactEmail: string;
}): string {
  const dt = new Date(params.dateTimeIso);
  const when = Number.isNaN(dt.getTime()) ? params.dateTimeIso : dt.toLocaleString();

  return renderEmailLayout({
    preheader: `Meeting invitation: ${params.topic}`,
    eyebrow: 'Meeting Invitation',
    title: 'You Are Invited',
    subtitle: 'Please review the meeting details and join from the secure link.',
    accent: '#1d4ed8',
    contactEmail: params.contactEmail,
    contentHtml: `
      <p class="p">Hello ${escapeHtml(params.attendeeName)},</p>
      <p class="p">You are invited to <strong>${escapeHtml(params.topic)}</strong>.</p>

      <div class="box">
        <p class="box-title">Meeting Details</p>
        <table class="kvs">
          <tr><td class="key">Topic</td><td class="value">${escapeHtml(params.topic)}</td></tr>
          <tr><td class="key">When</td><td class="value">${escapeHtml(when)}</td></tr>
          <tr><td class="key">Duration</td><td class="value">${params.durationMinutes} minutes</td></tr>
          ${params.organizerName ? `<tr><td class="key">Organizer</td><td class="value">${escapeHtml(params.organizerName)}</td></tr>` : ''}
        </table>
      </div>

      ${params.description ? `<div class="box"><p class="box-title">Agenda</p><p class="p">${escapeHtml(params.description)}</p></div>` : ''}
      <a class="cta" href="${params.meetingLink}" target="_blank" rel="noreferrer">Join Meeting</a>
      <p class="p" style="word-break:break-all; font-size:13px; color:#475569;">${escapeHtml(params.meetingLink)}</p>
      <p class="p">Best regards,<br><strong>NexoviaSoft Team</strong></p>
    `,
  });
}
