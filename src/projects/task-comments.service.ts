import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskCommentDto } from './dto/create-task-comment.dto';
import { TaskComment } from './entities/task-comment.entity';
import { Task } from './entities/task.entity';
import { Project } from './entities/project.entity';
import { EmailService } from '../common/services/email.service';

@Injectable()
export class TaskCommentsService {
  constructor(
    @InjectRepository(TaskComment)
    private readonly commentRepository: Repository<TaskComment>,
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    private readonly emailService: EmailService,
  ) {}

  async create(createTaskCommentDto: CreateTaskCommentDto) {
    const task = await this.taskRepository.findOne({
      where: { id: createTaskCommentDto.taskId },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${createTaskCommentDto.taskId} not found`);
    }

    const comment = this.commentRepository.create(createTaskCommentDto);
    const savedComment = await this.commentRepository.save(comment);

    // Send email notifications to all project members
    this.sendCommentNotifications(savedComment, task).catch(err => 
      console.error('Failed to send comment notifications:', err)
    );

    return this.formatCommentResponse(savedComment);
  }

  private async sendCommentNotifications(comment: TaskComment, task: Task) {
    const project = await this.projectRepository.findOne({
      where: { id: task.projectId },
      relations: ['projectLead', 'teamMembers'],
    });

    if (!project) return;

    const recipients = new Set<string>();
    
    // Add project lead
    if (project.projectLead?.email) {
      recipients.add(project.projectLead.email);
    }

    // Add team members
    if (project.teamMembers) {
      project.teamMembers.forEach(member => {
        if (member.email) recipients.add(member.email);
      });
    }

    const taskUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/admin/projects/${project.id}/tasks/${task.id}`;

    for (const email of recipients) {
      // Don't send to the author if we can identify them by email
      // For now, we'll send to everyone as we don't have the author's email in the DTO
      await this.emailService.sendTaskCommentNotification(
        email,
        comment.author,
        task.title,
        comment.content,
        project.name,
        taskUrl,
      );
    }
  }

  async findAll(taskId: number) {
    const comments = await this.commentRepository.find({
      where: { taskId },
      order: { createdAt: 'ASC' },
    });

    return comments.map((comment) => this.formatCommentResponse(comment));
  }

  async findOne(id: number) {
    const comment = await this.commentRepository.findOne({
      where: { id },
    });

    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    return this.formatCommentResponse(comment);
  }

  async remove(id: number) {
    const comment = await this.commentRepository.findOne({
      where: { id },
    });

    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    await this.commentRepository.remove(comment);
    return { message: `Comment with ID ${id} has been deleted` };
  }

  private formatCommentResponse(comment: TaskComment) {
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
}
