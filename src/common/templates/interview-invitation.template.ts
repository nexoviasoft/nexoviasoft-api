import { renderEmailLayout } from './email-layout.template';

export function getInterviewInvitationTemplate(
  candidateName: string,
  position: string,
  type: string,
  date: string,
  time: string,
  interviewer: string,
  meetLink?: string,
  contactEmail?: string,
): string {
  const contentHtml = `
    <p class="p">Dear <strong>${candidateName}</strong>,</p>
    <p class="p">We are excited to invite you for an interview for the <strong>${position}</strong> position at NexoviaSoft. We were impressed with your background and skills, and we'd like to learn more about you.</p>
    
    <div class="box">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
        <h3 class="box-title" style="margin: 0;">Interview Schedule</h3>
        <span class="badge badge-success">Confirmed</span>
      </div>
      <table class="kvs">
        <tr>
          <td class="key">Position</td>
          <td class="value">${position}</td>
        </tr>
        <tr>
          <td class="key">Category</td>
          <td class="value">${type}</td>
        </tr>
        <tr>
          <td class="key">Date</td>
          <td class="value">${date}</td>
        </tr>
        <tr>
          <td class="key">Time</td>
          <td class="value">${time}</td>
        </tr>
        <tr>
          <td class="key">Interviewer</td>
          <td class="value">${interviewer}</td>
        </tr>
      </table>
    </div>

    ${meetLink ? `
    <div class="box" style="background: linear-gradient(to right, #f0f9ff, #ffffff); border-left: 4px solid #0ea5e9;">
      <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 16px;">
        <div style="background: #0ea5e9; color: white; width: 40px; height: 40px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 18px; box-shadow: 0 4px 6px -1px rgba(14, 165, 233, 0.3);">
          L
        </div>
        <div>
          <div style="font-size: 15px; font-weight: 700; color: #0f172a;">Virtual Meeting Room</div>
          <div style="font-size: 12px; color: #64748b;">Join via your browser or app</div>
        </div>
      </div>
      <a href="${meetLink}" class="cta" style="margin-top: 8px; width: 100%; box-sizing: border-box; display: block; background: #0ea5e9;">
        Join Interview Room
      </a>
      <div style="margin-top: 16px; font-size: 11px; color: #94a3b8; word-break: break-all; opacity: 0.7;">
        Backup Link: <span style="text-decoration: underline;">${meetLink}</span>
      </div>
    </div>
    ` : ''}

    <p class="p" style="margin-top: 32px; font-weight: 500;">Please confirm your availability by replying to this email. We look forward to meeting with you!</p>
    
    <div class="signature-area">
      <div class="signature-name">NexoviaSoft Team</div>
      <div class="signature-label">Recruitment Department</div>
    </div>
  `;

  return renderEmailLayout({
    title: 'Interview Invitation',
    eyebrow: 'Recruitment',
    accent: '#f58220', // NexoviaSoft Orange
    contentHtml,
    contactEmail,
  });
}
