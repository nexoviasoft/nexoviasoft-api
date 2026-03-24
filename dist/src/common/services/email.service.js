"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var EmailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = __importStar(require("nodemailer"));
const service_request_confirmation_template_1 = require("../templates/service-request-confirmation.template");
const schedule_assignment_template_1 = require("../templates/schedule-assignment.template");
const task_assignment_template_1 = require("../templates/task-assignment.template");
const order_confirmation_template_1 = require("../templates/order-confirmation.template");
const leave_approval_template_1 = require("../templates/leave-approval.template");
const leave_rejection_template_1 = require("../templates/leave-rejection.template");
const document_email_template_1 = require("../templates/document-email.template");
const meeting_invitation_template_1 = require("../templates/meeting-invitation.template");
const team_member_credentials_template_1 = require("../templates/team-member-credentials.template");
const project_assignment_template_1 = require("../templates/project-assignment.template");
let EmailService = EmailService_1 = class EmailService {
    constructor() {
        this.logger = new common_1.Logger(EmailService_1.name);
        this.smtpConfig = {
            host: 'smtp.gmail.com',
            user: 'innowavesolutioninfo@gmail.com',
            password: 'eydh kgcs wplp avzv',
        };
        this.transporter = nodemailer.createTransport({
            host: this.smtpConfig.host,
            auth: {
                user: this.smtpConfig.user,
                pass: this.smtpConfig.password,
            },
        });
    }
    async sendServiceRequestConfirmation(to, clientName, serviceType) {
        const subject = 'Service Request Received - We Will Contact You Soon';
        const fromEmail = this.smtpConfig.user;
        const html = (0, service_request_confirmation_template_1.getServiceRequestConfirmationTemplate)(clientName, serviceType, fromEmail);
        try {
            await this.transporter.sendMail({
                from: fromEmail,
                to,
                subject,
                html,
            });
            this.logger.log(`Service request confirmation email sent to ${to}`);
        }
        catch (error) {
            this.logger.error(`Failed to send email to ${to}:`, error);
            throw error;
        }
    }
    async sendScheduleAssignment(to, teamMemberName, shifts, weekStartDate, weekEndDate) {
        const subject = 'New Schedule Assignment - SquadLog';
        const fromEmail = this.smtpConfig.user;
        const html = (0, schedule_assignment_template_1.getScheduleAssignmentTemplate)(teamMemberName, shifts, fromEmail, weekStartDate, weekEndDate);
        try {
            await this.transporter.sendMail({
                from: fromEmail,
                to,
                subject,
                html,
            });
            this.logger.log(`Schedule assignment email sent to ${to}`);
        }
        catch (error) {
            this.logger.error(`Failed to send schedule assignment email to ${to}:`, error);
            throw error;
        }
    }
    async sendTaskAssignment(to, teamMemberName, taskTitle, taskDescription, projectName, priority, dueDate, taskUrl) {
        const subject = `New Task Assignment: ${taskTitle}`;
        const fromEmail = this.smtpConfig.user;
        const html = (0, task_assignment_template_1.getTaskAssignmentTemplate)(teamMemberName, taskTitle, taskDescription, projectName, priority, dueDate, fromEmail, taskUrl);
        try {
            await this.transporter.sendMail({
                from: fromEmail,
                to,
                subject,
                html,
            });
            this.logger.log(`Task assignment email sent to ${to} for task: ${taskTitle}`);
        }
        catch (error) {
            this.logger.error(`Failed to send task assignment email to ${to}:`, error);
            throw error;
        }
    }
    async sendOrderConfirmation(to, clientName, orderId, service, amount, orderDate, orderUrl) {
        const subject = `Order Confirmation - ${orderId}`;
        const fromEmail = this.smtpConfig.user;
        const html = (0, order_confirmation_template_1.getOrderConfirmationTemplate)(clientName, orderId, service, amount, orderDate, fromEmail, orderUrl);
        try {
            await this.transporter.sendMail({
                from: fromEmail,
                to,
                subject,
                html,
            });
            this.logger.log(`Order confirmation email sent to ${to} for order: ${orderId}`);
        }
        catch (error) {
            this.logger.error(`Failed to send order confirmation email to ${to}:`, error);
            throw error;
        }
    }
    async sendLeaveApproval(to, employeeName, leaveType, startDate, endDate, days, reason) {
        const subject = 'Leave Request Approved - SquadLog';
        const fromEmail = this.smtpConfig.user;
        const html = (0, leave_approval_template_1.getLeaveApprovalTemplate)(employeeName, leaveType, startDate, endDate, days, reason, fromEmail);
        try {
            await this.transporter.sendMail({
                from: fromEmail,
                to,
                subject,
                html,
            });
            this.logger.log(`Leave approval email sent to ${to} for ${employeeName}`);
        }
        catch (error) {
            this.logger.error(`Failed to send leave approval email to ${to}:`, error);
            throw error;
        }
    }
    async sendLeaveRejection(to, employeeName, leaveType, startDate, endDate, days, reason, rejectionReason) {
        const subject = 'Leave Request Rejected - SquadLog';
        const fromEmail = this.smtpConfig.user;
        const html = (0, leave_rejection_template_1.getLeaveRejectionTemplate)(employeeName, leaveType, startDate, endDate, days, reason, fromEmail, rejectionReason);
        try {
            await this.transporter.sendMail({
                from: fromEmail,
                to,
                subject,
                html,
            });
            this.logger.log(`Leave rejection email sent to ${to} for ${employeeName}`);
        }
        catch (error) {
            this.logger.error(`Failed to send leave rejection email to ${to}:`, error);
            throw error;
        }
    }
    async sendDocumentEmail(to, clientName, subject, message, pdfHtml, documentType, documentNumber) {
        const fromEmail = this.smtpConfig.user;
        const html = (0, document_email_template_1.getDocumentEmailTemplate)(clientName, subject, message, documentType, documentNumber, fromEmail);
        try {
            const emailHtml = html + `
        <div style="margin-top: 30px; padding: 20px; background-color: #f9f9f9; border-radius: 5px;">
          <h3 style="margin-top: 0;">Document Preview:</h3>
          <div style="border: 1px solid #ddd; padding: 20px; background-color: white;">
            ${pdfHtml}
          </div>
        </div>
      `;
            await this.transporter.sendMail({
                from: fromEmail,
                to,
                subject,
                html: emailHtml,
            });
            this.logger.log(`Document email sent to ${to} for ${documentType} ${documentNumber}`);
        }
        catch (error) {
            this.logger.error(`Failed to send document email to ${to}:`, error);
            throw error;
        }
    }
    async sendTeamMemberCredentials(to, memberName, passwordPlain, position) {
        const subject = 'Welcome to SquadLog - Your Login Credentials';
        const fromEmail = this.smtpConfig.user;
        const html = (0, team_member_credentials_template_1.getTeamMemberCredentialsTemplate)(memberName, to, passwordPlain, position, fromEmail);
        try {
            await this.transporter.sendMail({
                from: fromEmail,
                to,
                subject,
                html,
            });
            this.logger.log(`Team member credentials email sent to ${to}`);
        }
        catch (error) {
            this.logger.error(`Failed to send team member credentials email to ${to}:`, error);
            throw error;
        }
    }
    async sendProjectAssignment(to, memberName, projectName, projectRole) {
        const subject = `New Project Assignment: ${projectName}`;
        const fromEmail = this.smtpConfig.user;
        const html = (0, project_assignment_template_1.getProjectAssignmentTemplate)(memberName, projectName, projectRole, fromEmail);
        try {
            await this.transporter.sendMail({
                from: fromEmail,
                to,
                subject,
                html,
            });
            this.logger.log(`Project assignment email sent to ${to} for project: ${projectName}`);
        }
        catch (error) {
            this.logger.error(`Failed to send project assignment email to ${to}:`, error);
            throw error;
        }
    }
    async sendGenericEmail(to, subject, htmlBody) {
        const fromEmail = this.smtpConfig.user;
        const recipients = Array.isArray(to) ? to : [to];
        try {
            await this.transporter.sendMail({
                from: fromEmail,
                to: recipients.join(', '),
                subject,
                html: htmlBody,
            });
            this.logger.log(`Generic email sent to ${recipients.join(', ')}`);
        }
        catch (error) {
            this.logger.error(`Failed to send generic email to ${recipients.join(', ')}:`, error);
            throw error;
        }
    }
    async sendMeetingInvitations(params) {
        const subject = `Meeting Invitation: ${params.topic}`;
        const fromEmail = this.smtpConfig.user;
        for (const attendee of params.attendees) {
            const html = (0, meeting_invitation_template_1.getMeetingInvitationTemplate)({
                attendeeName: attendee.name,
                topic: params.topic,
                description: params.description,
                dateTimeIso: params.dateTimeIso,
                durationMinutes: params.durationMinutes,
                meetingLink: params.meetingLink,
                organizerName: params.organizerName,
                contactEmail: fromEmail,
            });
            try {
                await this.transporter.sendMail({
                    from: fromEmail,
                    to: attendee.email,
                    subject,
                    html,
                });
                this.logger.log(`Meeting invitation email sent to ${attendee.email}`);
            }
            catch (error) {
                this.logger.error(`Failed to send meeting invitation email to ${attendee.email}:`, error);
            }
        }
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = EmailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], EmailService);
//# sourceMappingURL=email.service.js.map