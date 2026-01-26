import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { MoveTaskDto } from './dto/move-task.dto';
import { Task } from './entities/task.entity';
import { Project } from './entities/project.entity';
import { OurTeam } from '../setting/home/our-team/entities/our-team.entity';
import { EmailService } from '../common/services/email.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(OurTeam)
    private readonly ourTeamRepository: Repository<OurTeam>,
    private readonly emailService: EmailService,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const project = await this.projectRepository.findOne({
      where: { id: createTaskDto.projectId },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${createTaskDto.projectId} not found`);
    }

    const task = this.taskRepository.create({
      ...createTaskDto,
      dueDate: createTaskDto.dueDate ? new Date(createTaskDto.dueDate) : undefined,
    });

    const savedTask = await this.taskRepository.save(task);
    
    // Update project task counts
    await this.updateProjectTaskCounts(createTaskDto.projectId);

    // Send email notifications to assignees
    if (createTaskDto.assignees && createTaskDto.assignees.length > 0) {
      await this.sendAssignmentEmails(
        createTaskDto.assignees,
        savedTask,
        project,
      );
    }

    return this.formatTaskResponse(savedTask);
  }

  async findAll(projectId: number) {
    try {
      const tasks = await this.taskRepository.find({
        where: { projectId },
        relations: ['comments'],
        order: { order: 'ASC', createdAt: 'DESC' },
      });

      // Ensure comments is always an array
      tasks.forEach(task => {
        if (!task.comments) {
          task.comments = [];
        }
      });

      return tasks.map((task) => this.formatTaskResponse(task));
    } catch (error) {
      console.error('Error fetching tasks for projectId:', projectId, error);
      // If relation fails, try without comments
      try {
        const tasksWithoutComments = await this.taskRepository.find({
          where: { projectId },
          order: { order: 'ASC', createdAt: 'DESC' },
        });
        
        tasksWithoutComments.forEach(task => {
          task.comments = [];
        });
        
        return tasksWithoutComments.map((task) => this.formatTaskResponse(task));
      } catch (fallbackError) {
        console.error('Fallback query also failed:', fallbackError);
        throw error;
      }
    }
  }

  async findOne(id: number) {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['comments'],
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return this.formatTaskResponse(task);
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskRepository.findOne({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    if (updateTaskDto.dueDate) {
      (updateTaskDto as any).dueDate = new Date(updateTaskDto.dueDate);
    }

    // Track if assignees were added (new assignees that weren't there before)
    const previousAssignees = task.assignees || [];
    const newAssignees = updateTaskDto.assignees 
      ? updateTaskDto.assignees.filter(assignee => !previousAssignees.includes(assignee))
      : [];

    Object.assign(task, updateTaskDto);
    const updatedTask = await this.taskRepository.save(task);

    // Update project task counts if status changed
    if (updateTaskDto.status !== undefined) {
      await this.updateProjectTaskCounts(task.projectId);
    }

    // Send email notifications to newly assigned users
    if (newAssignees.length > 0) {
      const project = await this.projectRepository.findOne({
        where: { id: task.projectId },
      });
      if (project) {
        await this.sendAssignmentEmails(
          newAssignees,
          updatedTask,
          project,
        );
      }
    }

    return this.formatTaskResponse(updatedTask);
  }

  async moveTask(moveTaskDto: MoveTaskDto) {
    const task = await this.taskRepository.findOne({
      where: { id: moveTaskDto.taskId },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${moveTaskDto.taskId} not found`);
    }

    task.columnId = moveTaskDto.newColumnId;
    if (moveTaskDto.newOrder !== undefined) {
      task.order = moveTaskDto.newOrder;
    }

    // Update status based on columnId
    const columnToStatusMap: { [key: string]: string } = {
      'todo': 'todo',
      'inprogress': 'in-progress',
      'review': 'review',
      'complete': 'complete',
    };
    
    if (columnToStatusMap[moveTaskDto.newColumnId]) {
      task.status = columnToStatusMap[moveTaskDto.newColumnId];
    }

    const updatedTask = await this.taskRepository.save(task);
    
    // Update project task counts if status changed to complete or from complete
    if (task.status === 'complete' || moveTaskDto.newColumnId === 'complete') {
      await this.updateProjectTaskCounts(task.projectId);
    }

    return this.formatTaskResponse(updatedTask);
  }

  async remove(id: number) {
    const task = await this.taskRepository.findOne({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    const projectId = task.projectId;
    await this.taskRepository.remove(task);

    // Update project task counts
    await this.updateProjectTaskCounts(projectId);

    return { message: `Task with ID ${id} has been deleted` };
  }

  private async updateProjectTaskCounts(projectId: number) {
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

  private formatTaskResponse(task: Task) {
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
    } catch (error) {
      console.error('Error formatting task response:', error, task);
      throw error;
    }
  }

  // Helper method to find team member by initials
  private async findTeamMemberByInitials(initials: string): Promise<OurTeam | null> {
    try {
      const allTeamMembers = await this.ourTeamRepository.find();
      
      for (const member of allTeamMembers) {
        const memberInitials = 
          (member.firstName?.[0] || '') + (member.lastName?.[0] || '');
        if (memberInitials.toUpperCase() === initials.toUpperCase()) {
          return member;
        }
      }
      
      return null;
    } catch (error) {
      this.logger.error(`Error finding team member by initials ${initials}:`, error);
      return null;
    }
  }

  // Send assignment emails to assignees
  private async sendAssignmentEmails(
    assignees: string[],
    task: Task,
    project: Project,
  ): Promise<void> {
    if (!assignees || assignees.length === 0) {
      return;
    }

    for (const assigneeInitials of assignees) {
      try {
        const teamMember = await this.findTeamMemberByInitials(assigneeInitials);
        
        if (!teamMember || !teamMember.email) {
          this.logger.warn(
            `Could not find team member or email for initials: ${assigneeInitials}`,
          );
          continue;
        }

        const taskUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/admin/projects/${project.id}/tasks/${task.id}`;
        const dueDateStr = task.dueDate 
          ? task.dueDate.toISOString().split('T')[0] 
          : null;

        await this.emailService.sendTaskAssignment(
          teamMember.email,
          `${teamMember.firstName} ${teamMember.lastName}`,
          task.title,
          task.description || '',
          project.name,
          task.priority || 'medium',
          dueDateStr,
          taskUrl,
        );

        this.logger.log(
          `Task assignment email sent to ${teamMember.email} for task: ${task.title}`,
        );
      } catch (error) {
        this.logger.error(
          `Failed to send assignment email to ${assigneeInitials} for task ${task.id}:`,
          error,
        );
        // Don't throw error - continue with other assignees
      }
    }
  }
}
