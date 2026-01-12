import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { FooterService } from './footer.service';
import { CreateFooterDto } from './dto/create-footer.dto';
import { UpdateFooterDto } from './dto/update-footer.dto';

@Controller('footer')
export class FooterController {
  constructor(private readonly footerService: FooterService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createFooterDto: CreateFooterDto) {
    const data = await this.footerService.create(createFooterDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Footer created successfully',
      data,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const data = await this.footerService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Footers retrieved successfully',
      data,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    const data = await this.footerService.findOne(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Footer retrieved successfully',
      data,
    };
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updateFooterDto: UpdateFooterDto) {
    const data = await this.footerService.update(+id, updateFooterDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Footer updated successfully',
      data,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    await this.footerService.remove(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Footer deleted successfully',
    };
  }
}
