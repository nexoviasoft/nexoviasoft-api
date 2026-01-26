export function getScheduleAssignmentTemplate(
  teamMemberName: string,
  shifts: Array<{ time?: string; label?: string; type?: string } | null>,
  contactEmail: string,
  weekStartDate?: string,
  weekEndDate?: string,
): string {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  const shiftsList = shifts.map((shift, index) => {
    if (!shift) {
      return `<tr><td><strong>${daysOfWeek[index]}</strong></td><td>No shift assigned</td></tr>`;
    }
    return `
      <tr>
        <td><strong>${daysOfWeek[index]}</strong></td>
        <td>
          <div style="background-color: #e8f5e9; padding: 10px; border-radius: 5px; border-left: 4px solid #4CAF50;">
            <div><strong>Time:</strong> ${shift.time || 'Not specified'}</div>
            <div><strong>Label:</strong> ${shift.label || 'Not specified'}</div>
            <div><strong>Type:</strong> ${shift.type || 'Not specified'}</div>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  const weekInfo = weekStartDate && weekEndDate 
    ? `<p><strong>Week:</strong> ${new Date(weekStartDate).toLocaleDateString()} - ${new Date(weekEndDate).toLocaleDateString()}</p>`
    : '';

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Schedule Assignment</title>
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
            border-bottom: 2px solid #2196F3;
        }
        .header h1 {
            color: #2196F3;
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
        .schedule-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        .schedule-table td {
            padding: 12px;
            border-bottom: 1px solid #ddd;
            vertical-align: top;
        }
        .schedule-table td:first-child {
            width: 120px;
            color: #666;
        }
        .highlight {
            background-color: #e3f2fd;
            padding: 15px;
            border-left: 4px solid #2196F3;
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
            color: #2196F3;
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
            <h1>📅 Schedule Assignment</h1>
        </div>
        
        <div class="content">
            <p>Dear ${teamMemberName},</p>
            
            <p>You have been assigned a new schedule. Please review your shifts for the upcoming week:</p>
            
            ${weekInfo}
            
            <div class="highlight">
                <p><strong>Your Schedule:</strong></p>
                <table class="schedule-table">
                    ${shiftsList}
                </table>
            </div>
            
            <p>Please make sure to arrive on time for your assigned shifts. If you have any questions or need to request changes, please contact your supervisor.</p>
            
            <div class="contact-info">
                <h3>Need Help?</h3>
                <p>If you have any questions about your schedule, please contact us:</p>
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
