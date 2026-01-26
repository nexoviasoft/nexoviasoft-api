import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { TaskCommentsService } from './task-comments.service';
import { CreateTaskCommentDto } from './dto/create-task-comment.dto';

@Controller('task-comments')
export class TaskCommentsController {
  constructor(private readonly taskCommentsService: TaskCommentsService) {}

  @Post()
  create(@Body() createTaskCommentDto: CreateTaskCommentDto) {
    return this.taskCommentsService.create(createTaskCommentDto);
  }

  @Get()
  findAll(@Query('taskId') taskId: string) {
    if (!taskId) {
      throw new Error('taskId query parameter is required');
    }
    return this.taskCommentsService.findAll(Number(taskId));
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.taskCommentsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.taskCommentsService.remove(id);
  }
}
