import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TaskCommentsService } from './task-comments.service';
import { TaskCommentsController } from './task-comments.controller';
import { ProjectCommentsService } from './project-comments.service';
import { ProjectCommentsController } from './project-comments.controller';
import { ColumnsService } from './columns.service';
import { ColumnsController } from './columns.controller';
import { Project } from './entities/project.entity';
import { Task } from './entities/task.entity';
import { TaskComment } from './entities/task-comment.entity';
import { ProjectComment } from './entities/project-comment.entity';
import { ProjectColumn } from './entities/column.entity';
import { OurTeam } from '../setting/home/our-team/entities/our-team.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Project,
      Task,
      TaskComment,
      ProjectComment,
      ProjectColumn,
      OurTeam,
    ]),
  ],
  controllers: [
    ProjectsController,
    TasksController,
    TaskCommentsController,
    ProjectCommentsController,
    ColumnsController,
  ],
  providers: [
    ProjectsService,
    TasksService,
    TaskCommentsService,
    ProjectCommentsService,
    ColumnsService,
  ],
  exports: [
    ProjectsService,
    TasksService,
    TaskCommentsService,
    ProjectCommentsService,
    ColumnsService,
  ],
})
export class ProjectsModule {}
