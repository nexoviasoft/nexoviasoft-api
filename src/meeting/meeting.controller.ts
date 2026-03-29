import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MeetingService } from './meeting.service';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';

@Controller('meeting')
@UseGuards(AuthGuard('jwt'))
export class MeetingController {
  constructor(private readonly meetingService: MeetingService) {}

  private readonly logger = new Logger(MeetingController.name);

  @Post()
  create(@Body() createMeetingDto: CreateMeetingDto) {
    this.logger.log('Creating meeting with payload:', JSON.stringify(createMeetingDto));
    return this.meetingService.create(createMeetingDto);
  }

  @Get()
  findAll() {
    return this.meetingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.meetingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMeetingDto: UpdateMeetingDto) {
    return this.meetingService.update(+id, updateMeetingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.meetingService.remove(+id);
  }
}
