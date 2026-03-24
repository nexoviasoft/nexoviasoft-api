import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { OurTeam } from '../setting/home/our-team/entities/our-team.entity';
import { EmailService } from '../common/services/email.service';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(OurTeam)
    private readonly teamRepository: Repository<OurTeam>,
    private readonly emailService: EmailService,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    const { teamMemberIds, dueDate, ...projectData } = createProjectDto;
    
    const projectDataToSave: Partial<Project> = {
      ...projectData,
      dueDate: dueDate ? new Date(dueDate) : undefined,
    };
    
    const project = this.projectRepository.create(projectDataToSave);

    // Load team members if provided
    if (teamMemberIds && teamMemberIds.length > 0) {
      const teamMembers = await this.teamRepository.find({
        where: { id: In(teamMemberIds) },
      });
      project.teamMembers = teamMembers;
    }

    const savedProject = await this.projectRepository.save(project);
    
    // Reload with relations
    const projectWithRelations = await this.projectRepository.findOne({
      where: { id: savedProject.id },
      relations: ['department', 'projectLead', 'teamMembers'],
    });

    if (!projectWithRelations) {
      throw new NotFoundException(`Failed to load project after creation`);
    }

    // Send assignment emails
    const projectName = projectWithRelations.name;
    if (projectWithRelations.projectLead && projectWithRelations.projectLead.email) {
      this.emailService.sendProjectAssignment(
        projectWithRelations.projectLead.email,
        `${projectWithRelations.projectLead.firstName} ${projectWithRelations.projectLead.lastName}`,
        projectName,
        'Project Lead'
      ).catch(e => console.error('Failed to send email to project lead', e));
    }

    if (projectWithRelations.teamMembers && projectWithRelations.teamMembers.length > 0) {
      for (const member of projectWithRelations.teamMembers) {
        if (member.email && member.id !== projectWithRelations.projectLead?.id) {
          this.emailService.sendProjectAssignment(
            member.email,
            `${member.firstName} ${member.lastName}`,
            projectName,
            'Team Member'
          ).catch(e => console.error('Failed to send email to team member', e));
        }
      }
    }

    return this.formatProjectResponse(projectWithRelations);
  }

  async findAll(user?: any) {
    const query: any = {
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

  async findOne(id: number) {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: ['department', 'projectLead', 'teamMembers'],
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    return this.formatProjectResponse(project);
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: ['department', 'projectLead', 'teamMembers'],
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    const oldTeamMemberIds = project.teamMembers?.map(m => m.id) || [];
    const oldProjectLeadId = project.projectLead?.id;

    const { teamMemberIds, ...updateData } = updateProjectDto;
    
    // Update dueDate if provided
    if (updateProjectDto.dueDate) {
      updateData.dueDate = new Date(updateProjectDto.dueDate) as any;
    }

    // Update team members if provided
    if (teamMemberIds !== undefined) {
      if (teamMemberIds && teamMemberIds.length > 0) {
        const teamMembers = await this.teamRepository.find({
          where: { id: In(teamMemberIds) },
        });
        project.teamMembers = teamMembers;
      } else {
        project.teamMembers = [];
      }
    }

    Object.assign(project, updateData);
    const updatedProject = await this.projectRepository.save(project);
    
    // Reload with relations
    const projectWithRelations = await this.projectRepository.findOne({
      where: { id: updatedProject.id },
      relations: ['department', 'projectLead', 'teamMembers'],
    });

    if (!projectWithRelations) {
      throw new NotFoundException(`Failed to load project after update`);
    }

    // Send assignment emails to newly assigned members
    const projectName = projectWithRelations.name;
    if (projectWithRelations.projectLead && projectWithRelations.projectLead.id !== oldProjectLeadId) {
      this.emailService.sendProjectAssignment(
        projectWithRelations.projectLead.email,
        `${projectWithRelations.projectLead.firstName} ${projectWithRelations.projectLead.lastName}`,
        projectName,
        'Project Lead'
      ).catch(e => console.error('Failed to send email to project lead', e));
    }

    if (projectWithRelations.teamMembers && projectWithRelations.teamMembers.length > 0) {
      for (const member of projectWithRelations.teamMembers) {
        if (!oldTeamMemberIds.includes(member.id) && member.id !== projectWithRelations.projectLead?.id) {
          this.emailService.sendProjectAssignment(
            member.email,
            `${member.firstName} ${member.lastName}`,
            projectName,
            'Team Member'
          ).catch(e => console.error('Failed to send email to team member', e));
        }
      }
    }

    return this.formatProjectResponse(projectWithRelations);
  }

  async remove(id: number) {
    const project = await this.projectRepository.findOne({
      where: { id },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    await this.projectRepository.remove(project);
    return { message: `Project with ID ${id} has been deleted` };
  }

  private formatProjectResponse(project: Project) {
    // Format team members for frontend compatibility
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
}
