"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColumnsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const column_entity_1 = require("./entities/column.entity");
const project_entity_1 = require("./entities/project.entity");
let ColumnsService = class ColumnsService {
    constructor(columnRepository, projectRepository) {
        this.columnRepository = columnRepository;
        this.projectRepository = projectRepository;
    }
    async create(createColumnDto) {
        const project = await this.projectRepository.findOne({
            where: { id: createColumnDto.projectId },
        });
        if (!project) {
            throw new common_1.NotFoundException(`Project with ID ${createColumnDto.projectId} not found`);
        }
        const column = this.columnRepository.create(createColumnDto);
        const savedColumn = await this.columnRepository.save(column);
        return this.formatColumnResponse(savedColumn);
    }
    async findAll(projectId) {
        const columns = await this.columnRepository.find({
            where: { projectId },
            order: { order: 'ASC' },
        });
        return columns.map((column) => this.formatColumnResponse(column));
    }
    async findOne(id) {
        const column = await this.columnRepository.findOne({
            where: { id },
        });
        if (!column) {
            throw new common_1.NotFoundException(`Column with ID ${id} not found`);
        }
        return this.formatColumnResponse(column);
    }
    async update(id, updateColumnDto) {
        const column = await this.columnRepository.findOne({
            where: { id },
        });
        if (!column) {
            throw new common_1.NotFoundException(`Column with ID ${id} not found`);
        }
        Object.assign(column, updateColumnDto);
        const updatedColumn = await this.columnRepository.save(column);
        return this.formatColumnResponse(updatedColumn);
    }
    async remove(id) {
        const column = await this.columnRepository.findOne({
            where: { id },
        });
        if (!column) {
            throw new common_1.NotFoundException(`Column with ID ${id} not found`);
        }
        await this.columnRepository.remove(column);
        return { message: `Column with ID ${id} has been deleted` };
    }
    formatColumnResponse(column) {
        return {
            id: column.id,
            projectId: column.projectId,
            title: column.title,
            order: column.order,
            isCustom: column.isCustom,
            createdAt: column.createdAt,
            updatedAt: column.updatedAt,
        };
    }
};
exports.ColumnsService = ColumnsService;
exports.ColumnsService = ColumnsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(column_entity_1.ProjectColumn)),
    __param(1, (0, typeorm_1.InjectRepository)(project_entity_1.Project)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ColumnsService);
//# sourceMappingURL=columns.service.js.map