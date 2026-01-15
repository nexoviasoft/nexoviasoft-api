import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ServiceRequestService } from './service-request.service';
import { CreateServiceRequestDto } from './dto/create-service-request.dto';
import { UpdateServiceRequestDto } from './dto/update-service-request.dto';

@Controller('service-request')
export class ServiceRequestController {
  constructor(private readonly serviceRequestService: ServiceRequestService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createServiceRequestDto: CreateServiceRequestDto) {
    const data = await this.serviceRequestService.create(createServiceRequestDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Service request created successfully',
      data,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const data = await this.serviceRequestService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Service requests retrieved successfully',
      data,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    const data = await this.serviceRequestService.findOne(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Service request retrieved successfully',
      data,
    };
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updateServiceRequestDto: UpdateServiceRequestDto) {
    const data = await this.serviceRequestService.update(+id, updateServiceRequestDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Service request updated successfully',
      data,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    await this.serviceRequestService.remove(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Service request deleted successfully',
    };
  }
}
