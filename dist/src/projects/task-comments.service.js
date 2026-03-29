"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskCommentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const task_comment_entity_1 = require("./entities/task-comment.entity");
const task_entity_1 = require("./entities/task.entity");
const project_entity_1 = require("./entities/project.entity");
const email_service_1 = require("../common/services/email.service");
let TaskCommentsService = class TaskCommentsService {
    constructor(commentRepository, taskRepository, projectRepository, emailService) {
        this.commentRepository = commentRepository;
        this.taskRepository = taskRepository;
        this.projectRepository = projectRepository;
        this.emailService = emailService;
    }
    async create(createTaskCommentDto) {
        const task = await this.taskRepository.findOne({
            where: { id: createTaskCommentDto.taskId },
        });
        if (!task) {
            throw new common_1.NotFoundException(`Task with ID ${createTaskCommentDto.taskId} not found`);
        }
        const comment = this.commentRepository.create(createTaskCommentDto);
        const savedComment = await this.commentRepository.save(comment);
        this.sendCommentNotifications(savedComment, task).catch(err => console.error('Failed to send comment notifications:', err));
        return this.formatCommentResponse(savedComment);
    }
    async sendCommentNotifications(comment, task) {
        const project = await this.projectRepository.findOne({
            where: { id: task.projectId },
            relations: ['projectLead', 'teamMembers'],
        });
        if (!project)
            return;
        const recipients = new Set();
        if (project.projectLead?.email) {
            recipients.add(project.projectLead.email);
        }
        if (project.teamMembers) {
            project.teamMembers.forEach(member => {
                if (member.email)
                    recipients.add(member.email);
            });
        }
        const taskUrl = `${process.env.FRONTEND_URL || 'https://admin.nexoviasoft.com'}/admin/projects/${project.id}/tasks/${task.id}`;
        for (const email of recipients) {
            await this.emailService.sendTaskCommentNotification(email, comment.author, task.title, comment.content, project.name, taskUrl);
        }
    }
    async findAll(taskId) {
        const comments = await this.commentRepository.find({
            where: { taskId },
            order: { createdAt: 'ASC' },
        });
        return comments.map((comment) => this.formatCommentResponse(comment));
    }
    async findOne(id) {
        const comment = await this.commentRepository.findOne({
            where: { id },
        });
        if (!comment) {
            throw new common_1.NotFoundException(`Comment with ID ${id} not found`);
        }
        return this.formatCommentResponse(comment);
    }
    async remove(id) {
        const comment = await this.commentRepository.findOne({
            where: { id },
        });
        if (!comment) {
            throw new common_1.NotFoundException(`Comment with ID ${id} not found`);
        }
        await this.commentRepository.remove(comment);
        return { message: `Comment with ID ${id} has been deleted` };
    }
    formatCommentResponse(comment) {
        return {
            id: comment.id,
            taskId: comment.taskId,
            author: comment.author,
            content: comment.content,
            mentions: comment.mentions || [],
            parentId: comment.parentId || null,
            createdAt: comment.createdAt,
        };
    }
};
exports.TaskCommentsService = TaskCommentsService;
exports.TaskCommentsService = TaskCommentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_comment_entity_1.TaskComment)),
    __param(1, (0, typeorm_1.InjectRepository)(task_entity_1.Task)),
    __param(2, (0, typeorm_1.InjectRepository)(project_entity_1.Project)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        email_service_1.EmailService])
], TaskCommentsService);
//# sourceMappingURL=task-comments.service.js.map