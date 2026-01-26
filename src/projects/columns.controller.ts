import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';

@Controller('columns')
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @Post()
  create(@Body() createColumnDto: CreateColumnDto) {
    return this.columnsService.create(createColumnDto);
  }

  @Get()
  findAll(@Query('projectId') projectId: string) {
    if (!projectId) {
      throw new Error('projectId query parameter is required');
    }
    return this.columnsService.findAll(Number(projectId));
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.columnsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateColumnDto: UpdateColumnDto) {
    return this.columnsService.update(id, updateColumnDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.columnsService.remove(id);
  }
}
