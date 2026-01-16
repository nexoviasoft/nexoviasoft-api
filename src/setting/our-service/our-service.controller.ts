import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { OurServiceService } from './our-service.service';
import { CreateOurServiceDto } from './dto/create-our-service.dto';
import { UpdateOurServiceDto } from './dto/update-our-service.dto';

@Controller('our-service')
export class OurServiceController {
  constructor(private readonly ourServiceService: OurServiceService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createOurServiceDto: CreateOurServiceDto) {
    const data = await this.ourServiceService.create(createOurServiceDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Service created successfully',
      data,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const data = await this.ourServiceService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Services retrieved successfully',
      data,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    const data = await this.ourServiceService.findOne(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Service retrieved successfully',
      data,
    };
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updateOurServiceDto: UpdateOurServiceDto) {
    const data = await this.ourServiceService.update(+id, updateOurServiceDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Service updated successfully',
      data,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    await this.ourServiceService.remove(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Service deleted successfully',
    };
  }
}
