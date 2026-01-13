import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { CaseStudiesService } from './case-studies.service';
import { CreateCaseStudyDto } from './dto/create-case-study.dto';
import { UpdateCaseStudyDto } from './dto/update-case-study.dto';
import { UploadMultipleFields } from 'src/common/decorators/file-upload.decorator';

@Controller('case-studies')
export class CaseStudiesController {
  constructor(private readonly caseStudiesService: CaseStudiesService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UploadMultipleFields([
    { name: 'imageUrl', maxCount: 1 },
    { name: 'projectimage', maxCount: 10 },
  ])
  async create(@Body() createCaseStudyDto: CreateCaseStudyDto) {
    const data = await this.caseStudiesService.create(createCaseStudyDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Case Study created successfully',
      data,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const data = await this.caseStudiesService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Case Studies retrieved successfully',
      data,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    const data = await this.caseStudiesService.findOne(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Case Study retrieved successfully',
      data,
    };
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @UploadMultipleFields([
    { name: 'imageUrl', maxCount: 1 },
    { name: 'projectimage', maxCount: 10 },
  ])
  async update(@Param('id') id: string, @Body() updateCaseStudyDto: UpdateCaseStudyDto) {
    const data = await this.caseStudiesService.update(+id, updateCaseStudyDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Case Study updated successfully',
      data,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    await this.caseStudiesService.remove(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Case Study deleted successfully',
    };
  }
}
