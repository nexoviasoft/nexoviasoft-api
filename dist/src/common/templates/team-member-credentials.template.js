"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTeamMemberCredentialsTemplate = getTeamMemberCredentialsTemplate;
function getTeamMemberCredentialsTemplate(memberName, email, passwordPlain, position, contactEmail) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to the Team</title>
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
            color: #EFFC76;
            margin: 0;
            font-size: 24px;
        }
        .content {
            margin-bottom: 30px;
        }
        .content p {
            margin-bottom: 15px;
            font-size: 16px;
        }
        .credentials-card {
            background-color: #f9f9f9;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #EFFC76;
            margin: 20px 0;
        }
        .credentials-title {
            font-size: 18px;
            font-weight: bold;
            color: #333;
            margin-bottom: 15px;
        }
        .credential-row {
            display: flex;
            margin-bottom: 10px;
            padding: 8px 0;
            border-bottom: 1px solid #eee;
        }
        .credential-label {
            font-weight: bold;
            width: 120px;
            color: #666;
        }
        .credential-value {
            flex: 1;
            font-family: monospace;
            font-size: 14px;
            background: #e8e8e8;
            padding: 2px 6px;
            border-radius: 4px;
        }
        .contact-info {
            background-color: #f9f9f9;
            padding: 20px;
            border-radius: 5px;
            margin: 20px 0;
        }
        .contact-info h3 {
            margin-top: 0;
            color: #333;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            color: #666;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Welcome to NexoviaSoft!</h1>
        </div>
        
        <div class="content">
            <p>Dear ${memberName},</p>
            
            <p>Welcome to the team! An account has been created for you as a <strong>${position}</strong>. You can use the following credentials to access the system:</p>
            
            <div class="credentials-card">
                <div class="credentials-title">Your Login Credentials</div>
                
                <div class="credential-row">
                    <span class="credential-label">Email:</span>
                    <span class="credential-value">${email}</span>
                </div>
                <div class="credential-row">
                    <span class="credential-label">Password:</span>
                    <span class="credential-value">${passwordPlain}</span>
                </div>
            </div>
            
            <p>Please make sure to keep your password secure and do not share it with anyone.</p>
            
            <div class="contact-info">
                <h3>Need Help?</h3>
                <p>If you have any questions or have trouble logging in, please contact the administrator:</p>
                <ul>
                    <li>Email: ${contactEmail}</li>
                </ul>
            </div>
            
            <p>Best regards,<br>
            <strong>NexoviaSoft Team</strong></p>
        </div>
        
        <div class="footer">
            <p>This is an automated notification email. Please do not reply to this message.</p>
            <p>&copy; ${new Date().getFullYear()} NexoviaSoft. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
  `;
}
//# sourceMappingURL=team-member-credentials.template.js.map