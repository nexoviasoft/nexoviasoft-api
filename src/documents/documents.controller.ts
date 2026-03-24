import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, BadRequestException } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createDocumentDto: CreateDocumentDto) {
    try {
      console.log('Received create document request:', JSON.stringify(createDocumentDto, null, 2));
      const data = await this.documentsService.create(createDocumentDto);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Document created successfully',
        data,
      };
    } catch (error) {
      console.error('Error in documents controller:', error);
      // If it's already a NestJS exception, re-throw it
      if (error.status) {
        throw error;
      }
      // Otherwise, wrap it with more details
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: error.message || 'Failed to create document',
        error: 'Bad Request',
        details: error.detail || error.code || null,
      });
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const data = await this.documentsService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Documents retrieved successfully',
      data,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    const data = await this.documentsService.findOne(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Document retrieved successfully',
      data,
    };
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updateDocumentDto: UpdateDocumentDto) {
    const data = await this.documentsService.update(+id, updateDocumentDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Document updated successfully',
      data,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    await this.documentsService.remove(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Document deleted successfully',
    };
  }

  @Post(':id/send-email')
  @HttpCode(HttpStatus.OK)
  async sendByEmail(
    @Param('id') id: string,
    @Body() body: { recipientEmail?: string; subject?: string; message?: string },
  ) {
    const result = await this.documentsService.sendByEmail(
      +id,
      body.recipientEmail,
      body.subject,
      body.message,
    );
    return {
      statusCode: HttpStatus.OK,
      message: result.message,
      success: result.success,
    };
  }
}
