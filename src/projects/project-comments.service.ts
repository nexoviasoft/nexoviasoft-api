import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectCommentDto } from './dto/create-project-comment.dto';
import { ProjectComment } from './entities/project-comment.entity';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectCommentsService {
  constructor(
    @InjectRepository(ProjectComment)
    private readonly commentRepository: Repository<ProjectComment>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async create(createProjectCommentDto: CreateProjectCommentDto) {
    const project = await this.projectRepository.findOne({
      where: { id: createProjectCommentDto.projectId },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${createProjectCommentDto.projectId} not found`);
    }

    const comment = this.commentRepository.create(createProjectCommentDto);
    const savedComment = await this.commentRepository.save(comment);
    return this.formatCommentResponse(savedComment);
  }

  async findAll(projectId: number) {
    const comments = await this.commentRepository.find({
      where: { projectId },
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

  private formatCommentResponse(comment: ProjectComment) {
    return {
      id: comment.id,
      projectId: comment.projectId,
      author: comment.author,
      content: comment.content,
      mentions: comment.mentions || [],
      createdAt: comment.createdAt,
    };
  }
}
