import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { HeroCrasolService } from './hero-crasol.service';
import { CreateHeroCrasolDto } from './dto/create-hero-crasol.dto';
import { UpdateHeroCrasolDto } from './dto/update-hero-crasol.dto';

@Controller('hero-crasol')
export class HeroCrasolController {
  constructor(private readonly heroCrasolService: HeroCrasolService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createHeroCrasolDto: CreateHeroCrasolDto) {
    return this.heroCrasolService.create(createHeroCrasolDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.heroCrasolService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.heroCrasolService.findOne(+id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateHeroCrasolDto: UpdateHeroCrasolDto) {
    return this.heroCrasolService.update(+id, updateHeroCrasolDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.heroCrasolService.remove(+id);
  }
}
