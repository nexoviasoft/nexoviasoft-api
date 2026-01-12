import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { CustomerReviewService } from './customer-review.service';
import { CreateCustomerReviewDto } from './dto/create-customer-review.dto';
import { UpdateCustomerReviewDto } from './dto/update-customer-review.dto';

@Controller('customer-review')
export class CustomerReviewController {
  constructor(private readonly customerReviewService: CustomerReviewService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createCustomerReviewDto: CreateCustomerReviewDto) {
    const data = await this.customerReviewService.create(createCustomerReviewDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Customer Review created successfully',
      data,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const data = await this.customerReviewService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Customer Reviews retrieved successfully',
      data,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    const data = await this.customerReviewService.findOne(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Customer Review retrieved successfully',
      data,
    };
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updateCustomerReviewDto: UpdateCustomerReviewDto) {
    const data = await this.customerReviewService.update(+id, updateCustomerReviewDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Customer Review updated successfully',
      data,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    await this.customerReviewService.remove(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Customer Review deleted successfully',
    };
  }
}
