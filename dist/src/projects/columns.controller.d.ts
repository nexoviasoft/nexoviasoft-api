import { ColumnsService } from './columns.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
export declare class ColumnsController {
    private readonly columnsService;
    constructor(columnsService: ColumnsService);
    create(createColumnDto: CreateColumnDto): Promise<{
        id: number;
        projectId: number;
        title: string;
        order: number;
        isCustom: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(projectId: string): Promise<{
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
}
