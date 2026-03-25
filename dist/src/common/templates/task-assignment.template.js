"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTaskAssignmentTemplate = getTaskAssignmentTemplate;
function getTaskAssignmentTemplate(teamMemberName, taskTitle, taskDescription, projectName, priority, dueDate, contactEmail, taskUrl) {
    const priorityColors = {
        high: { bg: '#ffebee', border: '#f44336', text: '#c62828' },
        medium: { bg: '#fff3e0', border: '#ff9800', text: '#e65100' },
        low: { bg: '#e8f5e9', border: '#4caf50', text: '#2e7d32' },
    };
    const priorityStyle = priorityColors[priority.toLowerCase()] || priorityColors.medium;
    const dueDateText = dueDate ? new Date(dueDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }) : 'Not set';
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Task Assignment</title>
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
        .task-card {
            background-color: #f9f9f9;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid ${priorityStyle.border};
            margin: 20px 0;
        }
        .task-title {
            font-size: 20px;
            font-weight: bold;
            color: #333;
            margin-bottom: 10px;
        }
        .task-details {
            margin-top: 15px;
        }
        .task-detail-row {
            display: flex;
            margin-bottom: 10px;
            padding: 8px 0;
            border-bottom: 1px solid #eee;
        }
        .task-detail-label {
            font-weight: bold;
            width: 120px;
            color: #666;
        }
        .task-detail-value {
            flex: 1;
        }
        .priority-badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 12px;
            background-color: ${priorityStyle.bg};
            color: ${priorityStyle.text};
            border: 1px solid ${priorityStyle.border};
            font-size: 12px;
            font-weight: bold;
            text-transform: uppercase;
        }
        .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #EFFC76;
            color: #000;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            margin: 20px 0;
            text-align: center;
        }
        .button:hover {
            background-color: #e0ef5f;
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
            <h1>📋 New Task Assignment</h1>
        </div>
        
        <div class="content">
            <p>Dear ${teamMemberName},</p>
            
            <p>You have been assigned a new task. Please review the details below:</p>
            
            <div class="task-card">
                <div class="task-title">${taskTitle}</div>
                ${taskDescription ? `<p style="color: #666; margin-top: 10px;">${taskDescription}</p>` : ''}
                
                <div class="task-details">
                    <div class="task-detail-row">
                        <span class="task-detail-label">Project:</span>
                        <span class="task-detail-value">${projectName}</span>
                    </div>
                    <div class="task-detail-row">
                        <span class="task-detail-label">Priority:</span>
                        <span class="task-detail-value">
                            <span class="priority-badge">${priority}</span>
                        </span>
                    </div>
                    <div class="task-detail-row">
                        <span class="task-detail-label">Due Date:</span>
                        <span class="task-detail-value">${dueDateText}</span>
                    </div>
                </div>
            </div>
            
            ${taskUrl ? `<a href="${taskUrl}" class="button">View Task Details</a>` : ''}
            
            <p>Please review the task and let us know if you have any questions. We look forward to your progress!</p>
            
            <div class="contact-info">
                <h3>Need Help?</h3>
                <p>If you have any questions about this task, please contact us:</p>
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
//# sourceMappingURL=task-assignment.template.js.map