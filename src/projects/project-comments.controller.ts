import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { ProjectCommentsService } from './project-comments.service';
import { CreateProjectCommentDto } from './dto/create-project-comment.dto';

@Controller('project-comments')
export class ProjectCommentsController {
  constructor(private readonly projectCommentsService: ProjectCommentsService) {}

  @Post()
  create(@Body() createProjectCommentDto: CreateProjectCommentDto) {
    return this.projectCommentsService.create(createProjectCommentDto);
  }

  @Get()
  findAll(@Query('projectId') projectId: string) {
    if (!projectId) {
      throw new Error('projectId query parameter is required');
    }
    return this.projectCommentsService.findAll(Number(projectId));
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.projectCommentsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.projectCommentsService.remove(id);
  }
}
