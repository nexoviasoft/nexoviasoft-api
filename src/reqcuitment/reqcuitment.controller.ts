import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ReqcuitmentService } from './reqcuitment.service';
import { CreateJobPostingDto } from './dto/create-job-posting.dto';
import { UpdateJobPostingDto } from './dto/update-job-posting.dto';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { CreateInterviewDto } from './dto/create-interview.dto';
import { UpdateInterviewDto } from './dto/update-interview.dto';

@Controller('recruitment')
export class ReqcuitmentController {
  constructor(private readonly reqcuitmentService: ReqcuitmentService) {}

  // Job Posting endpoints
  @Post('job-postings')
  @HttpCode(HttpStatus.CREATED)
  async createJobPosting(@Body() createJobPostingDto: CreateJobPostingDto) {
    const data = await this.reqcuitmentService.createJobPosting(createJobPostingDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Job posting created successfully',
      data,
    };
  }

  @Get('job-postings')
  @HttpCode(HttpStatus.OK)
  async findAllJobPostings() {
    const data = await this.reqcuitmentService.findAllJobPostings();
    return {
      statusCode: HttpStatus.OK,
      message: 'Job postings retrieved successfully',
      data,
    };
  }

  @Get('job-postings/:id')
  @HttpCode(HttpStatus.OK)
  async findOneJobPosting(@Param('id') id: string) {
    const data = await this.reqcuitmentService.findOneJobPosting(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Job posting retrieved successfully',
      data,
    };
  }

  @Patch('job-postings/:id')
  @HttpCode(HttpStatus.OK)
  async updateJobPosting(@Param('id') id: string, @Body() updateJobPostingDto: UpdateJobPostingDto) {
    const data = await this.reqcuitmentService.updateJobPosting(+id, updateJobPostingDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Job posting updated successfully',
      data,
    };
  }

  @Delete('job-postings/:id')
  @HttpCode(HttpStatus.OK)
  async removeJobPosting(@Param('id') id: string) {
    await this.reqcuitmentService.removeJobPosting(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Job posting deleted successfully',
    };
  }

  // Candidate endpoints
  @Post('candidates')
  @HttpCode(HttpStatus.CREATED)
  async createCandidate(@Body() createCandidateDto: CreateCandidateDto) {
    const data = await this.reqcuitmentService.createCandidate(createCandidateDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Candidate created successfully',
      data,
    };
  }

  @Get('candidates')
  @HttpCode(HttpStatus.OK)
  async findAllCandidates() {
    const data = await this.reqcuitmentService.findAllCandidates();
    return {
      statusCode: HttpStatus.OK,
      message: 'Candidates retrieved successfully',
      data,
    };
  }

  @Get('candidates/:id')
  @HttpCode(HttpStatus.OK)
  async findOneCandidate(@Param('id') id: string) {
    const data = await this.reqcuitmentService.findOneCandidate(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Candidate retrieved successfully',
      data,
    };
  }

  @Patch('candidates/:id')
  @HttpCode(HttpStatus.OK)
  async updateCandidate(@Param('id') id: string, @Body() updateCandidateDto: UpdateCandidateDto) {
    const data = await this.reqcuitmentService.updateCandidate(+id, updateCandidateDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Candidate updated successfully',
      data,
    };
  }

  @Delete('candidates/:id')
  @HttpCode(HttpStatus.OK)
  async removeCandidate(@Param('id') id: string) {
    await this.reqcuitmentService.removeCandidate(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Candidate deleted successfully',
    };
  }

  // Interview endpoints
  @Post('interviews')
  @HttpCode(HttpStatus.CREATED)
  async createInterview(@Body() createInterviewDto: CreateInterviewDto) {
    const data = await this.reqcuitmentService.createInterview(createInterviewDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Interview scheduled successfully',
      data,
    };
  }

  @Post('interviews/bulk')
  @HttpCode(HttpStatus.CREATED)
  async createBulkInterviews(@Body() body: { interview: CreateInterviewDto, candidateIds: number[] }) {
    const data = await this.reqcuitmentService.createBulkInterviews(body.interview, body.candidateIds);
    return {
      statusCode: HttpStatus.CREATED,
      message: `${data.length} interviews scheduled successfully`,
      data,
    };
  }

  @Get('interviews')
  @HttpCode(HttpStatus.OK)
  async findAllInterviews() {
    const data = await this.reqcuitmentService.findAllInterviews();
    return {
      statusCode: HttpStatus.OK,
      message: 'Interviews retrieved successfully',
      data,
    };
  }

  @Get('interviews/:id')
  @HttpCode(HttpStatus.OK)
  async findOneInterview(@Param('id') id: string) {
    const data = await this.reqcuitmentService.findOneInterview(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Interview retrieved successfully',
      data,
    };
  }

  @Patch('interviews/:id')
  @HttpCode(HttpStatus.OK)
  async updateInterview(@Param('id') id: string, @Body() updateInterviewDto: UpdateInterviewDto) {
    const data = await this.reqcuitmentService.updateInterview(+id, updateInterviewDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Interview updated successfully',
      data,
    };
  }

  @Delete('interviews/:id')
  @HttpCode(HttpStatus.OK)
  async removeInterview(@Param('id') id: string) {
    await this.reqcuitmentService.removeInterview(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Interview deleted successfully',
    };
  }
}
