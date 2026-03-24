"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMeetingInvitationTemplate = getMeetingInvitationTemplate;
function getMeetingInvitationTemplate(params) {
    const dt = new Date(params.dateTimeIso);
    const when = Number.isNaN(dt.getTime()) ? params.dateTimeIso : dt.toLocaleString();
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Meeting Invitation</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background: #f4f4f4; padding: 20px; }
    .container { max-width: 640px; margin: 0 auto; background: #fff; border-radius: 10px; padding: 28px; box-shadow: 0 2px 6px rgba(0,0,0,.08); }
    .title { font-size: 20px; margin: 0 0 8px; color: #111; }
    .meta { color: #666; font-size: 14px; margin: 0 0 18px; }
    .box { background: #e3f2fd; border-left: 4px solid #2196F3; padding: 14px 16px; border-radius: 8px; margin: 18px 0; }
    .btn { display: inline-block; background: #2196F3; color: #fff !important; text-decoration: none; padding: 10px 14px; border-radius: 8px; font-weight: 700; }
    .mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; font-size: 12px; color: #444; word-break: break-all; }
    .footer { margin-top: 22px; padding-top: 16px; border-top: 1px solid #eee; color: #666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <h1 class="title">You’re invited: ${params.topic}</h1>
    <p class="meta">
      <strong>When:</strong> ${when}<br/>
      <strong>Duration:</strong> ${params.durationMinutes} minutes<br/>
      ${params.organizerName ? `<strong>Organizer:</strong> ${params.organizerName}<br/>` : ``}
    </p>

    ${params.description ? `<div class="box"><strong>Agenda</strong><br/>${params.description}</div>` : ``}

    <p>
      <a class="btn" href="${params.meetingLink}" target="_blank" rel="noreferrer">Join meeting</a>
    </p>

    <p class="mono">${params.meetingLink}</p>

    <div class="footer">
      <p>This is an automated invitation from SquadLog.</p>
      <p>Need help? Contact us at ${params.contactEmail}</p>
    </div>
  </div>
</body>
</html>
`;
}
//# sourceMappingURL=meeting-invitation.template.js.map