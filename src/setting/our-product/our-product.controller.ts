import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { OurProductService } from './our-product.service';
import { CreateOurProductDto } from './dto/create-our-product.dto';
import { UpdateOurProductDto } from './dto/update-our-product.dto';

@Controller('our-product')
export class OurProductController {
  constructor(private readonly ourProductService: OurProductService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createOurProductDto: CreateOurProductDto) {
    const data = await this.ourProductService.create(createOurProductDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Product created successfully',
      data,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const data = await this.ourProductService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Products retrieved successfully',
      data,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    const data = await this.ourProductService.findOne(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Product retrieved successfully',
      data,
    };
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updateOurProductDto: UpdateOurProductDto) {
    const data = await this.ourProductService.update(+id, updateOurProductDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Product updated successfully',
      data,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    await this.ourProductService.remove(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Product deleted successfully',
    };
  }
}
