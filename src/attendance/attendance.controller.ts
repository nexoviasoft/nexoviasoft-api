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
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('attendance')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Req() req: any, @Body() createAttendanceDto: CreateAttendanceDto) {
    const teamId = req?.user?.id;
    const payload: CreateAttendanceDto = {
      ...createAttendanceDto,
      teamId,
    };
    const data = await this.attendanceService.create(payload);
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

  @Get('me')
  @HttpCode(HttpStatus.OK)
  async findMine(@Req() req: any) {
    const teamId = req?.user?.id;
    const data = await this.attendanceService.findMine(teamId);
    return {
      statusCode: HttpStatus.OK,
      message: 'My attendance retrieved successfully',
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

  @Get('me/stats')
  @HttpCode(HttpStatus.OK)
  async getMyStatusStats(@Req() req: any) {
    const teamId = req?.user?.id;
    const data = await this.attendanceService.getMyStatusStats(teamId);
    return {
      statusCode: HttpStatus.OK,
      message: 'My attendance statistics retrieved successfully',
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

  @Patch(':id/approve')
  @HttpCode(HttpStatus.OK)
  @Roles('admin')
  async approve(@Param('id') id: string) {
    const data = await this.attendanceService.update(+id, { approved: true });
    return {
      statusCode: HttpStatus.OK,
      message: 'Attendance approved successfully',
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
