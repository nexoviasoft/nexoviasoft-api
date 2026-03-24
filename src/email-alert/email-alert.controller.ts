import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { EmailAlertService } from './email-alert.service';
import { CreateEmailAlertDto } from './dto/create-email-alert.dto';
import { UpdateEmailAlertDto } from './dto/update-email-alert.dto';

@Controller('email-alert')
export class EmailAlertController {
  constructor(private readonly emailAlertService: EmailAlertService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createEmailAlertDto: CreateEmailAlertDto) {
    const data = await this.emailAlertService.create(createEmailAlertDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Email alert created successfully',
      data,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const data = await this.emailAlertService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Email alerts retrieved successfully',
      data,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    const data = await this.emailAlertService.findOne(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Email alert retrieved successfully',
      data,
    };
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updateEmailAlertDto: UpdateEmailAlertDto) {
    const data = await this.emailAlertService.update(+id, updateEmailAlertDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Email alert updated successfully',
      data,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    await this.emailAlertService.remove(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Email alert deleted successfully',
    };
  }

  @Post('send')
  @HttpCode(HttpStatus.OK)
  async sendEmail(
    @Body() body: { to: string; subject: string; body: string },
  ) {
    const result = await this.emailAlertService.sendEmail(
      body.to,
      body.subject,
      body.body,
    );
    return {
      statusCode: HttpStatus.OK,
      message: result.message,
      success: result.success,
    };
  }
}
