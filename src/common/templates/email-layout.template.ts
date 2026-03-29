export type EmailLayoutParams = {
  preheader?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  accent?: string;
  contentHtml: string;
  contactEmail?: string;
  footerNote?: string;
};

export const defaultAccent = '#1f7ae0';

export const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&#39;');

export const nl2br = (value: string): string =>
  escapeHtml(value)
    .split('\n')
    .map((line) => (line.trim() ? `<p class=\"p\">${line}</p>` : '<div style=\"height:10px;\"></div>'))
    .join('');

export function renderEmailLayout(params: EmailLayoutParams): string {
  const {
    preheader,
    eyebrow,
    title,
    subtitle,
    accent = defaultAccent,
    contentHtml,
    contactEmail,
    footerNote,
  } = params;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

    body {
      margin: 0;
      padding: 0;
      background-color: #f8fafc;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
      color: #1e293b;
      -webkit-font-smoothing: antialiased;
    }
    .preheader {
      display: none;
      max-height: 0;
      max-width: 0;
      opacity: 0;
      overflow: hidden;
      mso-hide: all;
    }
    .wrap {
      width: 100%;
      padding: 40px 15px;
      box-sizing: border-box;
    }
    .card {
      max-width: 600px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 24px;
      overflow: hidden;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      border: 1px solid #e2e8f0;
    }
    .hero {
      background: linear-gradient(135deg, ${accent} 0%, #1e293b 100%);
      padding: 48px 40px;
      color: #ffffff;
      text-align: center;
    }
    .eyebrow {
      display: inline-block;
      background: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(4px);
      padding: 6px 14px;
      border-radius: 999px;
      font-size: 12px;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      font-weight: 700;
      margin-bottom: 20px;
      color: #ffffff;
      border: 1px solid rgba(255, 255, 255, 0.3);
    }
    .hero h1 {
      margin: 0;
      font-size: 32px;
      line-height: 1.2;
      font-weight: 800;
      letter-spacing: -0.025em;
    }
    .hero p {
      margin: 16px 0 0;
      color: rgba(255, 255, 255, 0.85);
      font-size: 16px;
      line-height: 1.6;
      font-weight: 500;
      max-width: 400px;
      margin-left: auto;
      margin-right: auto;
    }
    .body {
      padding: 40px;
      background: #ffffff;
    }
    .p {
      margin: 0 0 1.25rem;
      font-size: 16px;
      line-height: 1.625;
      color: #334155;
    }
    .box {
      border: 1px solid #e2e8f0;
      background: #fbfcfe;
      border-radius: 16px;
      padding: 24px;
      margin: 24px 0;
    }
    .box-title {
      margin: 0 0 16px;
      font-size: 13px;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: #64748b;
      font-weight: 700;
    }
    .kvs {
      width: 100%;
      border-collapse: collapse;
    }
    .kvs td {
      padding: 12px 0;
      vertical-align: top;
      border-bottom: 1px solid #f1f5f9;
      font-size: 15px;
    }
    .kvs tr:last-child td {
      border-bottom: 0;
    }
    .key {
      width: 140px;
      color: #64748b;
      font-weight: 500;
    }
    .value {
      color: #0f172a;
      font-weight: 600;
      text-align: right;
    }
    .badge {
      display: inline-flex;
      align-items: center;
      padding: 6px 12px;
      border-radius: 999px;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.025em;
      text-transform: uppercase;
    }
    .badge-success {
      background-color: #dcfce7;
      color: #166534;
    }
    .badge-error {
      background-color: #fee2e2;
      color: #991b1b;
    }
    .cta {
      display: inline-block;
      margin-top: 24px;
      text-decoration: none;
      background: ${accent};
      color: #ffffff !important;
      border-radius: 12px;
      padding: 14px 28px;
      font-size: 16px;
      font-weight: 600;
      text-align: center;
      transition: all 0.2s ease;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
    .note {
      margin-top: 24px;
      background: #fffbeb;
      border: 1px solid #fef3c7;
      border-radius: 12px;
      padding: 16px;
      font-size: 14px;
      color: #92400e;
      line-height: 1.6;
    }
    .footer {
      background: #f8fafc;
      border-top: 1px solid #e2e8f0;
      padding: 32px 40px;
      color: #64748b;
      font-size: 13px;
      line-height: 1.7;
      text-align: center;
    }
    .footer a {
      color: ${accent};
      text-decoration: none;
      font-weight: 600;
    }
    .signature-area {
      margin-top: 32px;
      text-align: center;
    }
    .signature-name {
      font-family: 'Brush Script MT', cursive;
      font-size: 24px;
      color: #1e293b;
      margin-bottom: 4px;
    }
    .signature-label {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      font-weight: 800;
      color: #94a3b8;
      border-top: 1px solid #e2e8f0;
      display: inline-block;
      padding-top: 8px;
      min-width: 180px;
    }
  </style>
</head>
<body>
  ${preheader ? `<div class="preheader">${preheader}</div>` : ''}
  <div class="wrap">
    <div class="card">
      <div class="hero">
        ${eyebrow ? `<span class="eyebrow">${eyebrow}</span>` : ''}
        <h1>${title}</h1>
        ${subtitle ? `<p>${subtitle}</p>` : ''}
      </div>
      <div class="body">
        ${contentHtml}
      </div>
      <div class="footer">
        <div style="margin-bottom: 12px;">${footerNote || 'This is an automated email from NexoviaSoft. Please do not reply to this message.'}</div>
        ${contactEmail ? `<div style="margin-bottom: 12px;">Need help? <a href="mailto:${contactEmail}">Contact Support</a></div>` : ''}
        <div style="font-size: 12px; color: #94a3b8;">&copy; ${new Date().getFullYear()} NexoviaSoft. All rights reserved.</div>
      </div>
    </div>
  </div>
</body>
</html>
`;
}
