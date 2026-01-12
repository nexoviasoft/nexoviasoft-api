import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { OurTeamService } from './our-team.service';
import { CreateOurTeamDto } from './dto/create-our-team.dto';
import { UpdateOurTeamDto } from './dto/update-our-team.dto';

@Controller('our-team')
export class OurTeamController {
  constructor(private readonly ourTeamService: OurTeamService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createOurTeamDto: CreateOurTeamDto) {
    const data = await this.ourTeamService.create(createOurTeamDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Team member created successfully',
      data,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const data = await this.ourTeamService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Team members retrieved successfully',
      data,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    const data = await this.ourTeamService.findOne(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Team member retrieved successfully',
      data,
    };
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updateOurTeamDto: UpdateOurTeamDto) {
    const data = await this.ourTeamService.update(+id, updateOurTeamDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Team member updated successfully',
      data,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    await this.ourTeamService.remove(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Team member deleted successfully',
    };
  }
}
