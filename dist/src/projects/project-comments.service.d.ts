import { Repository } from 'typeorm';
import { CreateProjectCommentDto } from './dto/create-project-comment.dto';
import { ProjectComment } from './entities/project-comment.entity';
import { Project } from './entities/project.entity';
export declare class ProjectCommentsService {
    private readonly commentRepository;
    private readonly projectRepository;
    constructor(commentRepository: Repository<ProjectComment>, projectRepository: Repository<Project>);
    create(createProjectCommentDto: CreateProjectCommentDto): Promise<{
        id: number;
        projectId: number;
        author: string;
        content: string;
        mentions: string[];
        createdAt: Date;
    }>;
    findAll(projectId: number): Promise<{
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
    private formatCommentResponse;
}
