"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const projects_service_1 = require("./projects.service");
const projects_controller_1 = require("./projects.controller");
const tasks_service_1 = require("./tasks.service");
const tasks_controller_1 = require("./tasks.controller");
const task_comments_service_1 = require("./task-comments.service");
const task_comments_controller_1 = require("./task-comments.controller");
const project_comments_service_1 = require("./project-comments.service");
const project_comments_controller_1 = require("./project-comments.controller");
const columns_service_1 = require("./columns.service");
const columns_controller_1 = require("./columns.controller");
const project_entity_1 = require("./entities/project.entity");
const task_entity_1 = require("./entities/task.entity");
const task_comment_entity_1 = require("./entities/task-comment.entity");
const project_comment_entity_1 = require("./entities/project-comment.entity");
const column_entity_1 = require("./entities/column.entity");
const our_team_entity_1 = require("../setting/home/our-team/entities/our-team.entity");
let ProjectsModule = class ProjectsModule {
};
exports.ProjectsModule = ProjectsModule;
exports.ProjectsModule = ProjectsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                project_entity_1.Project,
                task_entity_1.Task,
                task_comment_entity_1.TaskComment,
                project_comment_entity_1.ProjectComment,
                column_entity_1.ProjectColumn,
                our_team_entity_1.OurTeam,
            ]),
        ],
        controllers: [
            projects_controller_1.ProjectsController,
            tasks_controller_1.TasksController,
            task_comments_controller_1.TaskCommentsController,
            project_comments_controller_1.ProjectCommentsController,
            columns_controller_1.ColumnsController,
        ],
        providers: [
            projects_service_1.ProjectsService,
            tasks_service_1.TasksService,
            task_comments_service_1.TaskCommentsService,
            project_comments_service_1.ProjectCommentsService,
            columns_service_1.ColumnsService,
        ],
        exports: [
            projects_service_1.ProjectsService,
            tasks_service_1.TasksService,
            task_comments_service_1.TaskCommentsService,
            project_comments_service_1.ProjectCommentsService,
            columns_service_1.ColumnsService,
        ],
    })
], ProjectsModule);
//# sourceMappingURL=projects.module.js.map