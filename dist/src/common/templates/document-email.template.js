"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDocumentEmailTemplate = getDocumentEmailTemplate;
function getDocumentEmailTemplate(clientName, subject, message, documentType, documentNumber, contactEmail) {
    const documentTypeLabel = documentType === 'invoice' ? 'Invoice' : 'Official Letter';
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${documentTypeLabel}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
        }
        .container {
            background-color: #ffffff;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #EFFC76;
        }
        .header h1 {
            color: #333;
            margin: 0;
            font-size: 24px;
        }
        .document-number {
            background-color: #EFFC76;
            color: #000;
            padding: 10px 20px;
            border-radius: 5px;
            font-weight: bold;
            font-size: 18px;
            display: inline-block;
            margin: 10px 0;
        }
        .content {
            margin-bottom: 30px;
        }
        .content p {
            margin-bottom: 15px;
            font-size: 16px;
            white-space: pre-wrap;
        }
        .message-box {
            background-color: #f9f9f9;
            padding: 20px;
            border-radius: 5px;
            margin: 20px 0;
            border-left: 4px solid #EFFC76;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            color: #666;
            font-size: 14px;
        }
        .note {
            background-color: #fff9e6;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
            border-left: 4px solid #EFFC76;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>${documentTypeLabel}</h1>
            <div class="document-number">${documentNumber}</div>
        </div>
        
        <div class="content">
            <p>Dear ${clientName},</p>
            
            <div class="message-box">
                ${message.split('\n').map(line => `<p style="margin: 5px 0;">${line}</p>`).join('')}
            </div>
            
            <div class="note">
                <strong>Note:</strong> Please find the ${documentTypeLabel.toLowerCase()} attached to this email. You can view and download it for your records.
            </div>
            
            <p>If you have any questions or need clarification, please don't hesitate to contact us.</p>
            
            <p>Best regards,<br>
            <strong>NexoviaSoft Team</strong></p>
        </div>
        
        <div class="footer">
            <p>This is an automated email. Please do not reply to this message.</p>
            <p>For inquiries, contact: ${contactEmail}</p>
            <p>&copy; ${new Date().getFullYear()} NexoviaSoft. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
  `;
}
//# sourceMappingURL=document-email.template.js.map