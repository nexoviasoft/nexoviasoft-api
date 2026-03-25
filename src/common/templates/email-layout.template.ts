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
    body {
      margin: 0;
      padding: 0;
      background: #eef2f8;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
      color: #0f172a;
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
      padding: 24px 12px;
    }
    .card {
      max-width: 680px;
      margin: 0 auto;
      background: #ffffff;
      border: 1px solid #dbe3ef;
      border-radius: 18px;
      overflow: hidden;
      box-shadow: 0 14px 38px rgba(15, 23, 42, 0.09);
    }
    .hero {
      background: linear-gradient(135deg, ${accent}, #0f172a);
      padding: 30px 28px;
      color: #ffffff;
    }
    .eyebrow {
      display: inline-block;
      background: rgba(255, 255, 255, 0.17);
      border: 1px solid rgba(255, 255, 255, 0.34);
      padding: 6px 10px;
      border-radius: 999px;
      font-size: 12px;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      font-weight: 700;
      margin-bottom: 12px;
    }
    .hero h1 {
      margin: 0;
      font-size: 30px;
      line-height: 1.2;
      letter-spacing: -0.02em;
    }
    .hero p {
      margin: 10px 0 0;
      color: rgba(255, 255, 255, 0.92);
      font-size: 15px;
      line-height: 1.6;
    }
    .body {
      padding: 26px;
      background: #ffffff;
    }
    .p {
      margin: 0 0 12px;
      font-size: 15px;
      line-height: 1.65;
      color: #1e293b;
    }
    .box {
      border: 1px solid #dbe3ef;
      background: #f8fbff;
      border-radius: 12px;
      padding: 16px;
      margin: 16px 0;
    }
    .box-title {
      margin: 0 0 10px;
      font-size: 14px;
      letter-spacing: 0.02em;
      text-transform: uppercase;
      color: #334155;
      font-weight: 700;
    }
    .kvs {
      width: 100%;
      border-collapse: collapse;
      margin: 4px 0 0;
    }
    .kvs td {
      padding: 9px 0;
      vertical-align: top;
      border-bottom: 1px solid #e8eef7;
      font-size: 14px;
    }
    .kvs tr:last-child td {
      border-bottom: 0;
    }
    .key {
      width: 150px;
      color: #475569;
      font-weight: 600;
    }
    .value {
      color: #0f172a;
      font-weight: 500;
    }
    .badge {
      display: inline-block;
      padding: 4px 10px;
      border-radius: 999px;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.02em;
      border: 1px solid #c9d7ea;
      background: #edf4ff;
      color: #0f3f7f;
      text-transform: uppercase;
    }
    .cta {
      display: inline-block;
      margin: 12px 0 4px;
      text-decoration: none;
      background: ${accent};
      color: #ffffff !important;
      border-radius: 10px;
      padding: 11px 16px;
      font-size: 14px;
      font-weight: 700;
      border: 1px solid rgba(0, 0, 0, 0.08);
    }
    .note {
      margin-top: 16px;
      background: #fff8e8;
      border: 1px solid #f7d9a2;
      border-radius: 10px;
      padding: 12px;
      font-size: 13px;
      color: #8a5b10;
      line-height: 1.6;
    }
    .footer {
      background: #f8fafc;
      border-top: 1px solid #dbe3ef;
      padding: 18px 26px;
      color: #64748b;
      font-size: 12px;
      line-height: 1.7;
    }
    .footer a {
      color: #1f7ae0;
      text-decoration: none;
      font-weight: 600;
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
        <div>${footerNote || 'This is an automated email from NexoviaSoft. Please do not reply to this message.'}</div>
        ${contactEmail ? `<div>Support: <a href="mailto:${contactEmail}">${contactEmail}</a></div>` : ''}
        <div>&copy; ${new Date().getFullYear()} NexoviaSoft. All rights reserved.</div>
      </div>
    </div>
  </div>
</body>
</html>
`;
}
