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
  UseGuards,
  Request,
  HttpException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LeaveService } from './leave.service';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { UpdateLeaveDto } from './dto/update-leave.dto';

@Controller('leave')
@UseGuards(AuthGuard('jwt'))
export class LeaveController {
  constructor(private readonly leaveService: LeaveService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createLeaveDto: CreateLeaveDto, @Request() req) {
    // Ensure user can only create leave for themselves unless admin
    const userId = req.user?.id;
    if (req.user?.role?.toLowerCase() !== 'admin' && createLeaveDto.teamId !== userId) {
      createLeaveDto.teamId = userId;
    }
    return this.leaveService.create(createLeaveDto);
  }

  @Get()
  findAll(@Request() req) {
    const userId = req.user?.id;
    const userRole = req.user?.role?.toLowerCase();
    
    // Admin sees all leaves, regular users see only their own
    if (userRole === 'admin') {
      return this.leaveService.findAll();
    } else {
      return this.leaveService.findByTeamId(userId);
    }
  }

  @Get('statistics')
  getStatistics(@Request() req) {
    const userId = req.user?.id;
    const userRole = req.user?.role?.toLowerCase();
    
    // Admin can see all statistics, regular users see only their own
    if (userRole === 'admin') {
      return this.leaveService.getStatistics(undefined);
    } else {
      return this.leaveService.getStatistics(userId);
    }
  }

  @Get('statistics/:teamId')
  getStatisticsByTeam(@Param('teamId') teamId: string, @Request() req) {
    const userId = req.user?.id;
    const userRole = req.user?.role?.toLowerCase();
    
    // Only admin can view other users' statistics
    if (userRole === 'admin') {
      return this.leaveService.getStatistics(+teamId);
    } else {
      // Regular users can only view their own statistics
      return this.leaveService.getStatistics(userId);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    const userId = req.user?.id;
    const userRole = req.user?.role?.toLowerCase();
    
    // Admin can view any leave, regular users can only view their own
    if (userRole !== 'admin') {
      return this.leaveService.findOneByTeamId(+id, userId);
    }
    return this.leaveService.findOne(+id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateLeaveDto: UpdateLeaveDto, @Request() req) {
    const userId = req.user?.id;
    const userRole = req.user?.role?.toLowerCase();
    
    // Only admin or the leave owner can update
    if (userRole !== 'admin') {
      return this.leaveService.updateByTeamId(+id, userId, updateLeaveDto);
    }
    return this.leaveService.update(+id, updateLeaveDto);
  }

  @Patch(':id/approve')
  @HttpCode(HttpStatus.OK)
  approve(@Param('id') id: string, @Request() req) {
    const userRole = req.user?.role?.toLowerCase();
    
    // Only admin can approve leaves
    if (userRole !== 'admin') {
      throw new HttpException('Only admins can approve leave requests', HttpStatus.FORBIDDEN);
    }
    return this.leaveService.approve(+id);
  }

  @Patch(':id/reject')
  @HttpCode(HttpStatus.OK)
  reject(@Param('id') id: string, @Body() body?: { rejectionReason?: string }, @Request() req?) {
    const userRole = req?.user?.role?.toLowerCase();
    
    // Only admin can reject leaves
    if (userRole !== 'admin') {
      throw new HttpException('Only admins can reject leave requests', HttpStatus.FORBIDDEN);
    }
    return this.leaveService.reject(+id, body?.rejectionReason);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string, @Request() req) {
    const userId = req.user?.id;
    const userRole = req.user?.role?.toLowerCase();
    
    // Only admin or the leave owner can delete
    if (userRole !== 'admin') {
      return this.leaveService.removeByTeamId(+id, userId);
    }
    return this.leaveService.remove(+id);
  }
}
