"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getServiceRequestConfirmationTemplate = getServiceRequestConfirmationTemplate;
function getServiceRequestConfirmationTemplate(clientName, serviceType, contactEmail) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Service Request Confirmation</title>
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
            border-bottom: 2px solid #4CAF50;
        }
        .header h1 {
            color: #4CAF50;
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
        .highlight {
            background-color: #e8f5e9;
            padding: 15px;
            border-left: 4px solid #4CAF50;
            margin: 20px 0;
        }
        .contact-info {
            background-color: #f9f9f9;
            padding: 20px;
            border-radius: 5px;
            margin: 20px 0;
        }
        .contact-info h3 {
            margin-top: 0;
            color: #4CAF50;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            color: #666;
            font-size: 14px;
        }
        .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #4CAF50;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
            margin: 10px 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Service Request Received</h1>
        </div>
        
        <div class="content">
            <p>Dear ${clientName},</p>
            
            <p>Thank you for submitting your service request for <strong>${serviceType}</strong>. We have successfully received your request and our team is reviewing it.</p>
            
            <div class="highlight">
                <p><strong>What happens next?</strong></p>
                <p>Our team will contact you soon via WhatsApp and email to discuss your requirements in detail. We appreciate your patience and look forward to assisting you.</p>
            </div>
            
            <div class="contact-info">
                <h3>Stay Connected</h3>
                <p>If you have any urgent questions or need immediate assistance, please don't hesitate to reach out to us through:</p>
                <ul>
                    <li>Email: ${contactEmail}</li>
                    <li>We will contact you via WhatsApp shortly</li>
                </ul>
            </div>
            
            <p>We are committed to providing you with the best service and will ensure all your requirements are met.</p>
            
            <p>Best regards,<br>
            <strong>SquadLog Team</strong></p>
        </div>
        
        <div class="footer">
            <p>This is an automated confirmation email. Please do not reply to this message.</p>
            <p>&copy; ${new Date().getFullYear()} SquadLog. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
  `;
}
//# sourceMappingURL=service-request-confirmation.template.js.map