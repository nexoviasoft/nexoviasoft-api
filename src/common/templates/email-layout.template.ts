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
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

    body {
      margin: 0;
      padding: 0;
      background-color: #f3f4f6;
      font-family: 'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
      color: #111827;
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
      border-radius: 32px;
      overflow: hidden;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 20px 25px -5px rgba(0, 0, 0, 0.1);
      border: 1px solid rgba(229, 231, 235, 0.5);
    }
    .hero {
      background: linear-gradient(135deg, ${accent} 0%, #1e293b 100%);
      padding: 60px 40px;
      color: #ffffff;
      text-align: center;
      position: relative;
    }
    .hero::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(circle at top right, rgba(255,255,255,0.1) 0%, transparent 60%);
    }
    .logo-container {
      margin-bottom: 32px;
      position: relative;
    }
    .logo-box {
      background: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(8px);
      width: 64px;
      height: 64px;
      border-radius: 20px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border: 1px solid rgba(255, 255, 255, 0.3);
      font-weight: 800;
      font-size: 24px;
      color: white;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);
    }
    .eyebrow {
      display: inline-block;
      background: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(4px);
      padding: 8px 16px;
      border-radius: 999px;
      font-size: 11px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      font-weight: 800;
      margin-bottom: 24px;
      color: #ffffff;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    .hero h1 {
      margin: 0;
      font-size: 36px;
      line-height: 1.1;
      font-weight: 800;
      letter-spacing: -0.04em;
      position: relative;
    }
    .hero p {
      margin: 20px 0 0;
      color: rgba(255, 255, 255, 0.9);
      font-size: 18px;
      line-height: 1.6;
      font-weight: 500;
      max-width: 440px;
      margin-left: auto;
      margin-right: auto;
      position: relative;
    }
    .body {
      padding: 48px 40px;
      background: #ffffff;
    }
    .p {
      margin: 0 0 1.5rem;
      font-size: 16px;
      line-height: 1.7;
      color: #374151;
    }
    .box {
      border: 1px solid #f3f4f6;
      background: #f9fafb;
      border-radius: 24px;
      padding: 32px;
      margin: 32px 0;
      transition: all 0.3s ease;
    }
    .box-title {
      margin: 0 0 20px;
      font-size: 12px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #6b7280;
      font-weight: 800;
    }
    .kvs {
      width: 100%;
      border-collapse: collapse;
    }
    .kvs td {
      padding: 14px 0;
      vertical-align: middle;
      border-bottom: 1px solid #f3f4f6;
      font-size: 15px;
    }
    .kvs tr:last-child td {
      border-bottom: 0;
    }
    .key {
      width: 40%;
      color: #6b7280;
      font-weight: 600;
    }
    .value {
      color: #111827;
      font-weight: 700;
      text-align: right;
    }
    .badge {
      display: inline-flex;
      align-items: center;
      padding: 6px 14px;
      border-radius: 999px;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }
    .badge-success {
      background-color: #ecfdf5;
      color: #059669;
    }
    .badge-error {
      background-color: #fef2f2;
      color: #dc2626;
    }
    .cta {
      display: inline-block;
      margin-top: 32px;
      text-decoration: none !important;
      background: linear-gradient(135deg, ${accent} 0%, #000000 100%);
      color: #ffffff !important;
      border-radius: 16px;
      padding: 18px 36px;
      font-size: 16px;
      font-weight: 700;
      text-align: center;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }
    .footer {
      background: #ffffff;
      border-top: 1px solid #f3f4f6;
      padding: 40px;
      color: #9ca3af;
      font-size: 13px;
      line-height: 1.8;
      text-align: center;
    }
    .footer a {
      color: ${accent};
      text-decoration: none;
      font-weight: 700;
    }
    .social-links {
      margin-top: 24px;
      margin-bottom: 24px;
    }
    .social-icon {
      display: inline-block;
      margin: 0 8px;
      width: 32px;
      height: 32px;
      background: #f3f4f6;
      border-radius: 10px;
      line-height: 32px;
      color: #4b5563;
      text-decoration: none;
      font-size: 14px;
    }
    .signature-area {
      margin-top: 48px;
      text-align: left;
      border-left: 2px solid ${accent};
      padding-left: 20px;
    }
    .signature-name {
      font-size: 18px;
      font-weight: 800;
      color: #111827;
      margin-bottom: 2px;
    }
    .signature-label {
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      font-weight: 600;
      color: #6b7280;
    }
  </style>
</head>
<body>
  ${preheader ? `<div class="preheader">${preheader}</div>` : ''}
  <div class="wrap">
    <div class="card">
      <div class="hero">
        <div class="logo-container">
          <div class="logo-box">NS</div>
        </div>
        ${eyebrow ? `<span class="eyebrow">${eyebrow}</span>` : ''}
        <h1>${title}</h1>
        ${subtitle ? `<p>${subtitle}</p>` : ''}
      </div>
      <div class="body">
        ${contentHtml}
      </div>
      <div class="footer">
        <div style="margin-bottom: 20px;">
          <img src="https://nexoviasoft.com/logo.png" alt="NexoviaSoft Logo" width="120" style="opacity: 0.5;" onerror="this.style.display='none'"/>
        </div>
        <div style="margin-bottom: 12px;">${footerNote || 'This is an automated notification from NexoviaSoft. Please do not reply directly to this email.'}</div>
        ${contactEmail ? `<div style="margin-bottom: 12px;">Questions? Reach us at <a href="mailto:${contactEmail}">${contactEmail}</a></div>` : ''}
        <div style="font-size: 12px; color: #d1d5db; margin-top: 20px;">&copy; ${new Date().getFullYear()} NexoviaSoft. 123 Tech Avenue, Innovation City. All rights reserved.</div>
      </div>
    </div>
  </div>
</body>
</html>
`;
}
