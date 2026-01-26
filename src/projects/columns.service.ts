import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { ProjectColumn } from './entities/column.entity';
import { Project } from './entities/project.entity';

@Injectable()
export class ColumnsService {
  constructor(
    @InjectRepository(ProjectColumn)
    private readonly columnRepository: Repository<ProjectColumn>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async create(createColumnDto: CreateColumnDto) {
    const project = await this.projectRepository.findOne({
      where: { id: createColumnDto.projectId },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${createColumnDto.projectId} not found`);
    }

    const column = this.columnRepository.create(createColumnDto);
    const savedColumn = await this.columnRepository.save(column);
    return this.formatColumnResponse(savedColumn);
  }

  async findAll(projectId: number) {
    const columns = await this.columnRepository.find({
      where: { projectId },
      order: { order: 'ASC' },
    });

    return columns.map((column) => this.formatColumnResponse(column));
  }

  async findOne(id: number) {
    const column = await this.columnRepository.findOne({
      where: { id },
    });

    if (!column) {
      throw new NotFoundException(`Column with ID ${id} not found`);
    }

    return this.formatColumnResponse(column);
  }

  async update(id: number, updateColumnDto: UpdateColumnDto) {
    const column = await this.columnRepository.findOne({
      where: { id },
    });

    if (!column) {
      throw new NotFoundException(`Column with ID ${id} not found`);
    }

    Object.assign(column, updateColumnDto);
    const updatedColumn = await this.columnRepository.save(column);
    return this.formatColumnResponse(updatedColumn);
  }

  async remove(id: number) {
    const column = await this.columnRepository.findOne({
      where: { id },
    });

    if (!column) {
      throw new NotFoundException(`Column with ID ${id} not found`);
    }

    await this.columnRepository.remove(column);
    return { message: `Column with ID ${id} has been deleted` };
  }

  private formatColumnResponse(column: ProjectColumn) {
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
}
