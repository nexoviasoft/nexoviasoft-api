import { Body, Controller, Get, HttpCode, HttpStatus, Patch } from '@nestjs/common';
import { FooterService } from './footer.service';
import { UpdateFooterDto } from './dto/update-footer.dto';

@Controller('footer')
export class FooterController {
  constructor(private readonly footerService: FooterService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getOne() {
    const data = await this.footerService.getOne();
    return {
      statusCode: HttpStatus.OK,
      message: 'Footer retrieved successfully',
      data,
    };
  }

  @Patch()
  @HttpCode(HttpStatus.OK)
  async update(@Body() updateFooterDto: UpdateFooterDto) {
    const data = await this.footerService.update(updateFooterDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Footer updated successfully',
      data,
    };
  }
}
