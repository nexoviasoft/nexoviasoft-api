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
var TasksService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const task_entity_1 = require("./entities/task.entity");
const project_entity_1 = require("./entities/project.entity");
const our_team_entity_1 = require("../setting/home/our-team/entities/our-team.entity");
const email_service_1 = require("../common/services/email.service");
let TasksService = TasksService_1 = class TasksService {
    constructor(taskRepository, projectRepository, ourTeamRepository, emailService) {
        this.taskRepository = taskRepository;
        this.projectRepository = projectRepository;
        this.ourTeamRepository = ourTeamRepository;
        this.emailService = emailService;
        this.logger = new common_1.Logger(TasksService_1.name);
    }
    async create(createTaskDto) {
        const project = await this.projectRepository.findOne({
            where: { id: createTaskDto.projectId },
        });
        if (!project) {
            throw new common_1.NotFoundException(`Project with ID ${createTaskDto.projectId} not found`);
        }
        const task = this.taskRepository.create({
            ...createTaskDto,
            dueDate: createTaskDto.dueDate ? new Date(createTaskDto.dueDate) : undefined,
        });
        const savedTask = await this.taskRepository.save(task);
        await this.updateProjectTaskCounts(createTaskDto.projectId);
        if (createTaskDto.assignees && createTaskDto.assignees.length > 0) {
            await this.sendAssignmentEmails(createTaskDto.assignees, savedTask, project);
        }
        return this.formatTaskResponse(savedTask);
    }
    async findAll(projectId) {
        try {
            const tasks = await this.taskRepository.find({
                where: { projectId },
                relations: ['comments'],
                order: { order: 'ASC', createdAt: 'DESC' },
            });
            tasks.forEach(task => {
                if (!task.comments) {
                    task.comments = [];
                }
            });
            return tasks.map((task) => this.formatTaskResponse(task));
        }
        catch (error) {
            console.error('Error fetching tasks for projectId:', projectId, error);
            try {
                const tasksWithoutComments = await this.taskRepository.find({
                    where: { projectId },
                    order: { order: 'ASC', createdAt: 'DESC' },
                });
                tasksWithoutComments.forEach(task => {
                    task.comments = [];
                });
                return tasksWithoutComments.map((task) => this.formatTaskResponse(task));
            }
            catch (fallbackError) {
                console.error('Fallback query also failed:', fallbackError);
                throw error;
            }
        }
    }
    async findOne(id) {
        const task = await this.taskRepository.findOne({
            where: { id },
            relations: ['comments'],
        });
        if (!task) {
            throw new common_1.NotFoundException(`Task with ID ${id} not found`);
        }
        return this.formatTaskResponse(task);
    }
    async update(id, updateTaskDto) {
        const task = await this.taskRepository.findOne({
            where: { id },
        });
        if (!task) {
            throw new common_1.NotFoundException(`Task with ID ${id} not found`);
        }
        if (updateTaskDto.dueDate) {
            updateTaskDto.dueDate = new Date(updateTaskDto.dueDate);
        }
        const previousAssignees = task.assignees || [];
        const newAssignees = updateTaskDto.assignees
            ? updateTaskDto.assignees.filter(assignee => !previousAssignees.includes(assignee))
            : [];
        Object.assign(task, updateTaskDto);
        const updatedTask = await this.taskRepository.save(task);
        if (updateTaskDto.status !== undefined) {
            await this.updateProjectTaskCounts(task.projectId);
        }
        if (newAssignees.length > 0) {
            const project = await this.projectRepository.findOne({
                where: { id: task.projectId },
            });
            if (project) {
                await this.sendAssignmentEmails(newAssignees, updatedTask, project);
            }
        }
        return this.formatTaskResponse(updatedTask);
    }
    async moveTask(moveTaskDto) {
        const task = await this.taskRepository.findOne({
            where: { id: moveTaskDto.taskId },
        });
        if (!task) {
            throw new common_1.NotFoundException(`Task with ID ${moveTaskDto.taskId} not found`);
        }
        task.columnId = moveTaskDto.newColumnId;
        if (moveTaskDto.newOrder !== undefined) {
            task.order = moveTaskDto.newOrder;
        }
        const columnToStatusMap = {
            'todo': 'todo',
            'inprogress': 'in-progress',
            'review': 'review',
            'complete': 'complete',
        };
        if (columnToStatusMap[moveTaskDto.newColumnId]) {
            task.status = columnToStatusMap[moveTaskDto.newColumnId];
        }
        const updatedTask = await this.taskRepository.save(task);
        if (task.status === 'complete' || moveTaskDto.newColumnId === 'complete') {
            await this.updateProjectTaskCounts(task.projectId);
        }
        return this.formatTaskResponse(updatedTask);
    }
    async remove(id) {
        const task = await this.taskRepository.findOne({
            where: { id },
        });
        if (!task) {
            throw new common_1.NotFoundException(`Task with ID ${id} not found`);
        }
        const projectId = task.projectId;
        await this.taskRepository.remove(task);
        await this.updateProjectTaskCounts(projectId);
        return { message: `Task with ID ${id} has been deleted` };
    }
    async updateProjectTaskCounts(projectId) {
        const totalTasks = await this.taskRepository.count({
            where: { projectId },
        });
        const tasksCompleted = await this.taskRepository.count({
            where: { projectId, status: 'complete' },
        });
        const progress = totalTasks > 0 ? Math.round((tasksCompleted / totalTasks) * 100) : 0;
        await this.projectRepository.update(projectId, {
            totalTasks,
            tasksCompleted,
            progress,
        });
    }
    formatTaskResponse(task) {
        try {
            return {
                id: task.id,
                projectId: task.projectId,
                title: task.title || '',
                description: task.description || null,
                priority: task.priority || 'medium',
                status: task.status || 'todo',
                columnId: task.columnId || null,
                order: task.order || 0,
                dueDate: task.dueDate
                    ? (task.dueDate instanceof Date
                        ? task.dueDate.toISOString().split('T')[0]
                        : new Date(task.dueDate).toISOString().split('T')[0])
                    : null,
                team: task.team || null,
                assignees: Array.isArray(task.assignees) ? task.assignees : [],
                comments: Array.isArray(task.comments)
                    ? task.comments.map((comment) => ({
                        id: comment.id,
                        author: comment.author || 'Unknown',
                        content: comment.content || '',
                        mentions: Array.isArray(comment.mentions) ? comment.mentions : [],
                        createdAt: comment.createdAt
                            ? (comment.createdAt instanceof Date
                                ? comment.createdAt.toISOString()
                                : new Date(comment.createdAt).toISOString())
                            : new Date().toISOString(),
                    }))
                    : [],
                createdAt: task.createdAt
                    ? (task.createdAt instanceof Date
                        ? task.createdAt.toISOString()
                        : new Date(task.createdAt).toISOString())
                    : new Date().toISOString(),
                updatedAt: task.updatedAt
                    ? (task.updatedAt instanceof Date
                        ? task.updatedAt.toISOString()
                        : new Date(task.updatedAt).toISOString())
                    : new Date().toISOString(),
            };
        }
        catch (error) {
            console.error('Error formatting task response:', error, task);
            throw error;
        }
    }
    async findTeamMemberByInitials(initials) {
        try {
            const allTeamMembers = await this.ourTeamRepository.find();
            for (const member of allTeamMembers) {
                const memberInitials = (member.firstName?.[0] || '') + (member.lastName?.[0] || '');
                if (memberInitials.toUpperCase() === initials.toUpperCase()) {
                    return member;
                }
            }
            return null;
        }
        catch (error) {
            this.logger.error(`Error finding team member by initials ${initials}:`, error);
            return null;
        }
    }
    async sendAssignmentEmails(assignees, task, project) {
        if (!assignees || assignees.length === 0) {
            return;
        }
        for (const assigneeInitials of assignees) {
            try {
                const teamMember = await this.findTeamMemberByInitials(assigneeInitials);
                if (!teamMember || !teamMember.email) {
                    this.logger.warn(`Could not find team member or email for initials: ${assigneeInitials}`);
                    continue;
                }
                const taskUrl = `${process.env.FRONTEND_URL || 'https://admin.nexoviasoft.com'}/admin/projects/${project.id}/tasks/${task.id}`;
                const dueDateStr = task.dueDate
                    ? task.dueDate.toISOString().split('T')[0]
                    : null;
                await this.emailService.sendTaskAssignment(teamMember.email, `${teamMember.firstName} ${teamMember.lastName}`, task.title, task.description || '', project.name, task.priority || 'medium', dueDateStr, taskUrl);
                this.logger.log(`Task assignment email sent to ${teamMember.email} for task: ${task.title}`);
            }
            catch (error) {
                this.logger.error(`Failed to send assignment email to ${assigneeInitials} for task ${task.id}:`, error);
            }
        }
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = TasksService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_entity_1.Task)),
    __param(1, (0, typeorm_1.InjectRepository)(project_entity_1.Project)),
    __param(2, (0, typeorm_1.InjectRepository)(our_team_entity_1.OurTeam)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
    typeorm_2.Repository,
    typeorm_2.Repository,
    email_service_1.EmailService])
], TasksService);
//# sourceMappingURL=tasks.service.js.map