import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createAttendanceDto: CreateAttendanceDto) {
    const data = await this.attendanceService.create(createAttendanceDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Attendance created successfully',
      data,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const data = await this.attendanceService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Attendance retrieved successfully',
      data,
    };
  }

  @Get('stats')
  @HttpCode(HttpStatus.OK)
  async getStatusStats() {
    const data = await this.attendanceService.getStatusStats();
    return {
      statusCode: HttpStatus.OK,
      message: 'Attendance statistics retrieved successfully',
      data,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    const data = await this.attendanceService.findOne(+id);
    if (!data) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: `Attendance with ID ${id} not found`,
      };
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'Attendance retrieved successfully',
      data,
    };
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() updateAttendanceDto: UpdateAttendanceDto,
  ) {
    const data = await this.attendanceService.update(+id, updateAttendanceDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Attendance updated successfully',
      data,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    await this.attendanceService.remove(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Attendance deleted successfully',
    };
  }
}
