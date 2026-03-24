export const getProjectAssignmentTemplate = (
  teamMemberName: string,
  projectName: string,
  projectRole: string,
  contactEmail: string,
): string => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Project Assignment - SquadLog</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333333;
      margin: 0;
      padding: 0;
      background-color: #f4f7f6;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    }
    .header {
      background-color: #4f46e5;
      padding: 30px 40px;
      text-align: center;
    }
    .header h1 {
      color: #ffffff;
      margin: 0;
      font-size: 24px;
      font-weight: 600;
    }
    .content {
      padding: 40px;
      background-color: #ffffff;
    }
    .greeting {
      font-size: 18px;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 20px;
    }
    .message {
      font-size: 16px;
      color: #4b5563;
      margin-bottom: 30px;
    }
    .details-box {
      background-color: #f8fafc;
      border-left: 4px solid #4f46e5;
      padding: 20px;
      border-radius: 4px;
      margin-bottom: 30px;
    }
    .details-row {
      margin-bottom: 15px;
    }
    .details-row:last-child {
      margin-bottom: 0;
    }
    .details-label {
      font-weight: 600;
      color: #374151;
      display: inline-block;
      width: 120px;
    }
    .details-value {
      color: #1f2937;
    }
    .action-button {
      display: inline-block;
      background-color: #4f46e5;
      color: #ffffff !important;
      text-decoration: none;
      padding: 12px 24px;
      border-radius: 6px;
      font-weight: 600;
      font-size: 16px;
      margin-top: 10px;
    }
    .footer {
      background-color: #f8fafc;
      padding: 20px 40px;
      text-align: center;
      border-top: 1px solid #e2e8f0;
    }
    .footer p {
      margin: 0;
      color: #64748b;
      font-size: 14px;
    }
    .contact {
      color: #4f46e5;
      font-weight: 500;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Project Assignment</h1>
    </div>
    
    <div class="content">
      <div class="greeting">
        Hello ${teamMemberName},
      </div>
      
      <div class="message">
        You have been assigned to a new project on SquadLog. Here are the details of your assignment:
      </div>
      
      <div class="details-box">
        <div class="details-row">
          <span class="details-label">Project:</span>
          <span class="details-value">${projectName}</span>
        </div>
        <div class="details-row">
          <span class="details-label">Role:</span>
          <span class="details-value">${projectRole}</span>
        </div>
      </div>
      
      <div class="message">
        Please log in to your SquadLog portal to review the project details and any associated tasks.
      </div>
      
      <div style="text-align: center;">
        <!-- You could dynamically pass a frontend URL here if needed -->
        <a href="#" class="action-button">Log in to SquadLog</a>
      </div>
    </div>
    
    <div class="footer">
      <p>If you have any questions, please contact your manager or email us at <a href="mailto:${contactEmail}" class="contact">${contactEmail}</a>.</p>
      <p style="margin-top: 10px;">Best regards,<br>The SquadLog Team</p>
    </div>
  </div>
</body>
</html>
  `;
};
