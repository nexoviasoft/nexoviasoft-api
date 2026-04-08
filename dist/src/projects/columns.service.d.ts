import { Repository } from 'typeorm';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { ProjectColumn } from './entities/column.entity';
import { Project } from './entities/project.entity';
export declare class ColumnsService {
    private readonly columnRepository;
    private readonly projectRepository;
    constructor(columnRepository: Repository<ProjectColumn>, projectRepository: Repository<Project>);
    create(createColumnDto: CreateColumnDto): Promise<{
        id: number;
        projectId: number;
        title: string;
        order: number;
        isCustom: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(projectId: number): Promise<{
        id: number;
        projectId: number;
        title: string;
        order: number;
        isCustom: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        projectId: number;
        title: string;
        order: number;
        isCustom: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: number, updateColumnDto: UpdateColumnDto): Promise<{
        id: number;
        projectId: number;
        title: string;
        order: number;
        isCustom: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
    private formatColumnResponse;
}
