import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { OurClientService } from './our-client.service';
import { CreateOurClientDto } from './dto/create-our-client.dto';
import { UpdateOurClientDto } from './dto/update-our-client.dto';

@Controller('our-client')
export class OurClientController {
  constructor(private readonly ourClientService: OurClientService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createOurClientDto: CreateOurClientDto) {
    const data = await this.ourClientService.create(createOurClientDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Client created successfully',
      data,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const data = await this.ourClientService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Clients retrieved successfully',
      data,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    const data = await this.ourClientService.findOne(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Client retrieved successfully',
      data,
    };
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updateOurClientDto: UpdateOurClientDto) {
    const data = await this.ourClientService.update(+id, updateOurClientDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Client updated successfully',
      data,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    await this.ourClientService.remove(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Client deleted successfully',
    };
  }
}
