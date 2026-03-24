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
exports.ProjectCommentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const project_comment_entity_1 = require("./entities/project-comment.entity");
const project_entity_1 = require("./entities/project.entity");
let ProjectCommentsService = class ProjectCommentsService {
    constructor(commentRepository, projectRepository) {
        this.commentRepository = commentRepository;
        this.projectRepository = projectRepository;
    }
    async create(createProjectCommentDto) {
        const project = await this.projectRepository.findOne({
            where: { id: createProjectCommentDto.projectId },
        });
        if (!project) {
            throw new common_1.NotFoundException(`Project with ID ${createProjectCommentDto.projectId} not found`);
        }
        const comment = this.commentRepository.create(createProjectCommentDto);
        const savedComment = await this.commentRepository.save(comment);
        return this.formatCommentResponse(savedComment);
    }
    async findAll(projectId) {
        const comments = await this.commentRepository.find({
            where: { projectId },
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
            projectId: comment.projectId,
            author: comment.author,
            content: comment.content,
            mentions: comment.mentions || [],
            createdAt: comment.createdAt,
        };
    }
};
exports.ProjectCommentsService = ProjectCommentsService;
exports.ProjectCommentsService = ProjectCommentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(project_comment_entity_1.ProjectComment)),
    __param(1, (0, typeorm_1.InjectRepository)(project_entity_1.Project)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ProjectCommentsService);
//# sourceMappingURL=project-comments.service.js.map