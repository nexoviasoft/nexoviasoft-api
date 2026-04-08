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
exports.ProjectsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const project_entity_1 = require("./entities/project.entity");
const our_team_entity_1 = require("../setting/home/our-team/entities/our-team.entity");
const email_service_1 = require("../common/services/email.service");
let ProjectsService = class ProjectsService {
    constructor(projectRepository, teamRepository, emailService) {
        this.projectRepository = projectRepository;
        this.teamRepository = teamRepository;
        this.emailService = emailService;
    }
    async create(createProjectDto) {
        const { teamMemberIds, dueDate, ...projectData } = createProjectDto;
        const projectDataToSave = {
            ...projectData,
            dueDate: dueDate ? new Date(dueDate) : undefined,
        };
        const project = this.projectRepository.create(projectDataToSave);
        if (teamMemberIds && teamMemberIds.length > 0) {
            const teamMembers = await this.teamRepository.find({
                where: { id: (0, typeorm_2.In)(teamMemberIds) },
            });
            project.teamMembers = teamMembers;
        }
        const savedProject = await this.projectRepository.save(project);
        const projectWithRelations = await this.projectRepository.findOne({
            where: { id: savedProject.id },
            relations: ['department', 'projectLead', 'teamMembers'],
        });
        if (!projectWithRelations) {
            throw new common_1.NotFoundException(`Failed to load project after creation`);
        }
        const projectName = projectWithRelations.name;
        if (projectWithRelations.projectLead && projectWithRelations.projectLead.email) {
            this.emailService.sendProjectAssignment(projectWithRelations.projectLead.email, `${projectWithRelations.projectLead.firstName} ${projectWithRelations.projectLead.lastName}`, projectName, 'Project Lead').catch(e => console.error('Failed to send email to project lead', e));
        }
        if (projectWithRelations.teamMembers && projectWithRelations.teamMembers.length > 0) {
            for (const member of projectWithRelations.teamMembers) {
                if (member.email && member.id !== projectWithRelations.projectLead?.id) {
                    this.emailService.sendProjectAssignment(member.email, `${member.firstName} ${member.lastName}`, projectName, 'Team Member').catch(e => console.error('Failed to send email to team member', e));
                }
            }
        }
        return this.formatProjectResponse(projectWithRelations);
    }
    async findAll(user) {
        const query = {
            relations: ['department', 'projectLead', 'teamMembers'],
            order: { createdAt: 'DESC' },
        };
        if (user && user.role === 'Employee') {
            query.where = [
                { projectLeadId: user.id },
                { teamMembers: { id: user.id } }
            ];
        }
        const projects = await this.projectRepository.find(query);
        return projects.map((project) => this.formatProjectResponse(project));
    }
    async findOne(id) {
        const project = await this.projectRepository.findOne({
            where: { id },
            relations: ['department', 'projectLead', 'teamMembers'],
        });
        if (!project) {
            throw new common_1.NotFoundException(`Project with ID ${id} not found`);
        }
        return this.formatProjectResponse(project);
    }
    async update(id, updateProjectDto) {
        const project = await this.projectRepository.findOne({
            where: { id },
            relations: ['department', 'projectLead', 'teamMembers'],
        });
        if (!project) {
            throw new common_1.NotFoundException(`Project with ID ${id} not found`);
        }
        const oldTeamMemberIds = project.teamMembers?.map(m => m.id) || [];
        const oldProjectLeadId = project.projectLead?.id;
        const { teamMemberIds, ...updateData } = updateProjectDto;
        if (updateProjectDto.dueDate) {
            updateData.dueDate = new Date(updateProjectDto.dueDate);
        }
        if (teamMemberIds !== undefined) {
            if (teamMemberIds && teamMemberIds.length > 0) {
                const teamMembers = await this.teamRepository.find({
                    where: { id: (0, typeorm_2.In)(teamMemberIds) },
                });
                project.teamMembers = teamMembers;
            }
            else {
                project.teamMembers = [];
            }
        }
        Object.assign(project, updateData);
        const updatedProject = await this.projectRepository.save(project);
        const projectWithRelations = await this.projectRepository.findOne({
            where: { id: updatedProject.id },
            relations: ['department', 'projectLead', 'teamMembers'],
        });
        if (!projectWithRelations) {
            throw new common_1.NotFoundException(`Failed to load project after update`);
        }
        const projectName = projectWithRelations.name;
        if (projectWithRelations.projectLead && projectWithRelations.projectLead.id !== oldProjectLeadId) {
            this.emailService.sendProjectAssignment(projectWithRelations.projectLead.email, `${projectWithRelations.projectLead.firstName} ${projectWithRelations.projectLead.lastName}`, projectName, 'Project Lead').catch(e => console.error('Failed to send email to project lead', e));
        }
        if (projectWithRelations.teamMembers && projectWithRelations.teamMembers.length > 0) {
            for (const member of projectWithRelations.teamMembers) {
                if (!oldTeamMemberIds.includes(member.id) && member.id !== projectWithRelations.projectLead?.id) {
                    this.emailService.sendProjectAssignment(member.email, `${member.firstName} ${member.lastName}`, projectName, 'Team Member').catch(e => console.error('Failed to send email to team member', e));
                }
            }
        }
        return this.formatProjectResponse(projectWithRelations);
    }
    async remove(id) {
        const project = await this.projectRepository.findOne({
            where: { id },
        });
        if (!project) {
            throw new common_1.NotFoundException(`Project with ID ${id} not found`);
        }
        await this.projectRepository.remove(project);
        return { message: `Project with ID ${id} has been deleted` };
    }
    formatProjectResponse(project) {
        const team = project.teamMembers
            ? project.teamMembers.map((member) => ({
                id: member.id,
                name: `${member.firstName} ${member.lastName}`,
                avatar: member.firstName?.[0] + member.lastName?.[0] || 'TM',
                email: member.email,
                position: member.position,
            }))
            : [];
        return {
            id: project.id,
            name: project.name,
            description: project.description,
            status: project.status,
            progress: project.progress,
            applicationType: project.applicationType,
            platform: project.platform,
            department: project.department
                ? {
                    id: project.department.id,
                    name: project.department.name,
                    description: project.department.description,
                }
                : null,
            departmentId: project.departmentId,
            projectLead: project.projectLead
                ? {
                    id: project.projectLead.id,
                    firstName: project.projectLead.firstName,
                    lastName: project.projectLead.lastName,
                    name: `${project.projectLead.firstName} ${project.projectLead.lastName}`,
                    email: project.projectLead.email,
                    position: project.projectLead.position,
                    avatar: project.projectLead.firstName?.[0] + project.projectLead.lastName?.[0] || 'PL',
                }
                : null,
            projectLeadId: project.projectLeadId,
            team,
            teamMembers: project.teamMembers
                ? project.teamMembers.map((member) => ({
                    id: member.id,
                    firstName: member.firstName,
                    lastName: member.lastName,
                    email: member.email,
                    position: member.position,
                    avatar: member.firstName?.[0] + member.lastName?.[0] || 'TM',
                }))
                : [],
            dueDate: project.dueDate ? project.dueDate.toISOString().split('T')[0] : null,
            tasksCompleted: project.tasksCompleted,
            totalTasks: project.totalTasks,
            template: project.template,
            createdAt: project.createdAt,
            updatedAt: project.updatedAt,
        };
    }
};
exports.ProjectsService = ProjectsService;
exports.ProjectsService = ProjectsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(project_entity_1.Project)),
    __param(1, (0, typeorm_1.InjectRepository)(our_team_entity_1.OurTeam)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        email_service_1.EmailService])
], ProjectsService);
//# sourceMappingURL=projects.service.js.map