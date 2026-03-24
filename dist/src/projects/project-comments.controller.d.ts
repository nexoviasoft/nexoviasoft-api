import { ProjectCommentsService } from './project-comments.service';
import { CreateProjectCommentDto } from './dto/create-project-comment.dto';
export declare class ProjectCommentsController {
    private readonly projectCommentsService;
    constructor(projectCommentsService: ProjectCommentsService);
    create(createProjectCommentDto: CreateProjectCommentDto): Promise<{
        id: number;
        projectId: number;
        author: string;
        content: string;
        mentions: string[];
        createdAt: Date;
    }>;
    findAll(projectId: string): Promise<{
        id: number;
        projectId: number;
        author: string;
        content: string;
        mentions: string[];
        createdAt: Date;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        projectId: number;
        author: string;
        content: string;
        mentions: string[];
        createdAt: Date;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
