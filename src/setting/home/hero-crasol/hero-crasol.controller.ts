import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { HeroCrasolService } from './hero-crasol.service';
import { CreateHeroCrasolDto } from './dto/create-hero-crasol.dto';
import { UpdateHeroCrasolDto } from './dto/update-hero-crasol.dto';

@Controller('hero-crasol')
export class HeroCrasolController {
  constructor(private readonly heroCrasolService: HeroCrasolService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createHeroCrasolDto: CreateHeroCrasolDto) {
    const data = await this.heroCrasolService.create(createHeroCrasolDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Hero Crasol created successfully',
      data,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const data = await this.heroCrasolService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Hero Crasols retrieved successfully',
      data,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    const data = await this.heroCrasolService.findOne(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Hero Crasol retrieved successfully',
      data,
    };
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updateHeroCrasolDto: UpdateHeroCrasolDto) {
    const data = await this.heroCrasolService.update(+id, updateHeroCrasolDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Hero Crasol updated successfully',
      data,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    await this.heroCrasolService.remove(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Hero Crasol deleted successfully',
    };
  }
}
