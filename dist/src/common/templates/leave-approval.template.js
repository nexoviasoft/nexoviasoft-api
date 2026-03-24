"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLeaveApprovalTemplate = getLeaveApprovalTemplate;
function getLeaveApprovalTemplate(employeeName, leaveType, startDate, endDate, days, reason, contactEmail) {
    const startDateFormatted = new Date(startDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    const endDateFormatted = new Date(endDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Leave Request Approved</title>
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
            border-bottom: 2px solid #10b981;
        }
        .header h1 {
            color: #10b981;
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
        .leave-card {
            background-color: #f0fdf4;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #10b981;
            margin: 20px 0;
        }
        .leave-title {
            font-size: 20px;
            font-weight: bold;
            color: #333;
            margin-bottom: 10px;
        }
        .leave-details {
            margin-top: 15px;
        }
        .leave-detail-row {
            display: flex;
            margin-bottom: 10px;
            padding: 8px 0;
            border-bottom: 1px solid #d1fae5;
        }
        .leave-detail-label {
            font-weight: bold;
            width: 120px;
            color: #666;
        }
        .leave-detail-value {
            flex: 1;
        }
        .status-badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 12px;
            background-color: #d1fae5;
            color: #065f46;
            border: 1px solid #10b981;
            font-size: 12px;
            font-weight: bold;
            text-transform: uppercase;
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
            <h1>✅ Leave Request Approved</h1>
        </div>
        
        <div class="content">
            <p>Dear ${employeeName},</p>
            
            <p>We are pleased to inform you that your leave request has been <strong>approved</strong>.</p>
            
            <div class="leave-card">
                <div class="leave-title">Leave Details</div>
                
                <div class="leave-details">
                    <div class="leave-detail-row">
                        <span class="leave-detail-label">Leave Type:</span>
                        <span class="leave-detail-value">${leaveType}</span>
                    </div>
                    <div class="leave-detail-row">
                        <span class="leave-detail-label">Start Date:</span>
                        <span class="leave-detail-value">${startDateFormatted}</span>
                    </div>
                    <div class="leave-detail-row">
                        <span class="leave-detail-label">End Date:</span>
                        <span class="leave-detail-value">${endDateFormatted}</span>
                    </div>
                    <div class="leave-detail-row">
                        <span class="leave-detail-label">Duration:</span>
                        <span class="leave-detail-value">${days} ${days === 1 ? 'day' : 'days'}</span>
                    </div>
                    ${reason ? `
                    <div class="leave-detail-row">
                        <span class="leave-detail-label">Reason:</span>
                        <span class="leave-detail-value">${reason}</span>
                    </div>
                    ` : ''}
                    <div class="leave-detail-row">
                        <span class="leave-detail-label">Status:</span>
                        <span class="leave-detail-value">
                            <span class="status-badge">Approved</span>
                        </span>
                    </div>
                </div>
            </div>
            
            <p>Please ensure that your work is properly handed over before your leave begins. We hope you have a restful time off!</p>
            
            <div class="contact-info">
                <h3>Need Help?</h3>
                <p>If you have any questions about your leave, please contact us:</p>
                <ul>
                    <li>Email: ${contactEmail}</li>
                </ul>
            </div>
            
            <p>Best regards,<br>
            <strong>SquadLog Team</strong></p>
        </div>
        
        <div class="footer">
            <p>This is an automated notification email. Please do not reply to this message.</p>
            <p>&copy; ${new Date().getFullYear()} SquadLog. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
  `;
}
//# sourceMappingURL=leave-approval.template.js.map