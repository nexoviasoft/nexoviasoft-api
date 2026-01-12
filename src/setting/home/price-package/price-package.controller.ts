import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { PricePackageService } from './price-package.service';
import { CreatePricePackageDto } from './dto/create-price-package.dto';
import { UpdatePricePackageDto } from './dto/update-price-package.dto';

@Controller('price-package')
export class PricePackageController {
  constructor(private readonly pricePackageService: PricePackageService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createPricePackageDto: CreatePricePackageDto) {
    const data = await this.pricePackageService.create(createPricePackageDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Price Package created successfully',
      data,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const data = await this.pricePackageService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Price Packages retrieved successfully',
      data,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    const data = await this.pricePackageService.findOne(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Price Package retrieved successfully',
      data,
    };
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updatePricePackageDto: UpdatePricePackageDto) {
    const data = await this.pricePackageService.update(+id, updatePricePackageDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Price Package updated successfully',
      data,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    await this.pricePackageService.remove(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Price Package deleted successfully',
    };
  }
}
