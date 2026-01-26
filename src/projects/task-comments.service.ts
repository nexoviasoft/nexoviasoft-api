import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskCommentDto } from './dto/create-task-comment.dto';
import { TaskComment } from './entities/task-comment.entity';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskCommentsService {
  constructor(
    @InjectRepository(TaskComment)
    private readonly commentRepository: Repository<TaskComment>,
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
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
    return this.formatCommentResponse(savedComment);
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
      createdAt: comment.createdAt,
    };
  }
}
