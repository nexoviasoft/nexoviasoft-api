"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderConfirmationTemplate = getOrderConfirmationTemplate;
function getOrderConfirmationTemplate(clientName, orderId, service, amount, orderDate, contactEmail, orderUrl) {
    const formattedAmount = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmation</title>
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
        .order-id {
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
        }
        .order-details {
            background-color: #f9f9f9;
            padding: 20px;
            border-radius: 5px;
            margin: 20px 0;
            border-left: 4px solid #EFFC76;
        }
        .order-details h3 {
            margin-top: 0;
            color: #333;
        }
        .detail-row {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid #eee;
        }
        .detail-row:last-child {
            border-bottom: none;
        }
        .detail-label {
            font-weight: bold;
            color: #666;
        }
        .detail-value {
            color: #333;
        }
        .amount {
            font-size: 24px;
            font-weight: bold;
            color: #EFFC76;
            background-color: #000;
            padding: 15px;
            border-radius: 5px;
            text-align: center;
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
        .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #EFFC76;
            color: #000;
            text-decoration: none;
            border-radius: 5px;
            margin: 10px 5px;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Order Confirmation</h1>
            <div class="order-id">${orderId}</div>
        </div>
        
        <div class="content">
            <p>Dear ${clientName},</p>
            
            <p>Thank you for your order! We are excited to work with you on this project.</p>
            
            <div class="order-details">
                <h3>Order Details</h3>
                <div class="detail-row">
                    <span class="detail-label">Order ID:</span>
                    <span class="detail-value">${orderId}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Service:</span>
                    <span class="detail-value">${service}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Order Date:</span>
                    <span class="detail-value">${orderDate}</span>
                </div>
            </div>
            
            <div class="amount">
                Total Amount: ${formattedAmount}
            </div>
            
            <p><strong>What happens next?</strong></p>
            <p>Our team has been notified and will begin working on your order. You will receive regular updates on the progress of your project. You can track your order status and communicate with our team through your order dashboard.</p>
            
            ${orderUrl ? `
            <div style="text-align: center; margin: 20px 0;">
                <a href="${orderUrl}" class="button">View Order Details</a>
            </div>
            ` : ''}
            
            <div class="contact-info">
                <h3>Need Help?</h3>
                <p>If you have any questions or need to make changes to your order, please don't hesitate to reach out:</p>
                <ul>
                    <li>Email: ${contactEmail}</li>
                    <li>We will contact you via WhatsApp for project updates</li>
                </ul>
            </div>
            
            <p>We appreciate your business and look forward to delivering exceptional results for you.</p>
            
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
//# sourceMappingURL=order-confirmation.template.js.map