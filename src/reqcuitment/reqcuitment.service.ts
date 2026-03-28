import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImageBBService } from '../common/services/imagebb.service';
import { JobPosting } from './entities/job-posting.entity';
import { Candidate } from './entities/candidate.entity';
import { Interview } from './entities/interview.entity';
import { CreateJobPostingDto } from './dto/create-job-posting.dto';
import { UpdateJobPostingDto } from './dto/update-job-posting.dto';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { CreateInterviewDto } from './dto/create-interview.dto';
import { UpdateInterviewDto } from './dto/update-interview.dto';

import { EmailService } from '../common/services/email.service';

@Injectable()
export class ReqcuitmentService {
  constructor(
    @InjectRepository(JobPosting)
    private readonly jobPostingRepository: Repository<JobPosting>,
    @InjectRepository(Candidate)
    private readonly candidateRepository: Repository<Candidate>,
    @InjectRepository(Interview)
    private readonly interviewRepository: Repository<Interview>,
    private readonly imageBBService: ImageBBService,
    private readonly emailService: EmailService,
  ) {}

  private readonly logger = new Logger(ReqcuitmentService.name);

  // Job Posting methods
  async createJobPosting(createJobPostingDto: CreateJobPostingDto) {
    const jobPosting = this.jobPostingRepository.create({
      ...createJobPostingDto,
      postedDate: createJobPostingDto.postedDate 
        ? new Date(createJobPostingDto.postedDate) 
        : new Date(),
      startDate: createJobPostingDto.startDate 
        ? new Date(createJobPostingDto.startDate) 
        : null,
      expiryDate: createJobPostingDto.expiryDate 
        ? new Date(createJobPostingDto.expiryDate) 
        : null,
      vacancy: createJobPostingDto.vacancy ?? 1,
    });
    return this.jobPostingRepository.save(jobPosting);
  }

  async findAllJobPostings() {
    return this.jobPostingRepository.find({
      relations: ['candidates', 'departmentEntity'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOneJobPosting(id: number) {
    const jobPosting = await this.jobPostingRepository.findOne({
      where: { id },
      relations: ['candidates', 'departmentEntity'],
    });
    
    if (!jobPosting) {
      throw new NotFoundException(`Job posting with ID ${id} not found`);
    }
    
    return jobPosting;
  }

  async updateJobPosting(id: number, updateJobPostingDto: UpdateJobPostingDto) {
    const jobPosting = await this.findOneJobPosting(id);
    Object.assign(jobPosting, {
      ...updateJobPostingDto,
      postedDate: updateJobPostingDto.postedDate 
        ? new Date(updateJobPostingDto.postedDate) 
        : jobPosting.postedDate,
      startDate: updateJobPostingDto.startDate 
        ? new Date(updateJobPostingDto.startDate) 
        : jobPosting.startDate,
      expiryDate: updateJobPostingDto.expiryDate 
        ? new Date(updateJobPostingDto.expiryDate) 
        : jobPosting.expiryDate,
      vacancy: updateJobPostingDto.vacancy ?? jobPosting.vacancy,
    });
    return this.jobPostingRepository.save(jobPosting);
  }

  async removeJobPosting(id: number) {
    const jobPosting = await this.findOneJobPosting(id);
    return this.jobPostingRepository.remove(jobPosting);
  }

  // Candidate methods
  async createCandidate(createCandidateDto: CreateCandidateDto) {
    let cvUrl = createCandidateDto.cvUrl;

    // If base64 cvData is provided but no cvUrl, upload to ImageBB
    if (createCandidateDto.cvData && !cvUrl) {
      try {
        cvUrl = await this.imageBBService.upload(createCandidateDto.cvData);
      } catch (error) {
        this.logger.error(`Failed to upload CV for ${createCandidateDto.name}: ${error.message}`);
        // We continue anyway, or we could throw an error. 
        // Let's continue for now to avoid blocking the whole application.
      }
    }

    const candidate = this.candidateRepository.create({
      ...createCandidateDto,
      cvUrl,
      cvData: createCandidateDto.cvData,
      cvFilename: createCandidateDto.cvFilename,
      appliedDate: createCandidateDto.appliedDate 
        ? new Date(createCandidateDto.appliedDate) 
        : new Date(),
    });
    const savedCandidate = await this.candidateRepository.save(candidate);
    
    // Update job posting applicant count if jobPostingId is provided
    if (createCandidateDto.jobPostingId) {
      const jobPosting = await this.jobPostingRepository.findOne({
        where: { id: createCandidateDto.jobPostingId },
      });
      if (jobPosting) {
        jobPosting.applicants = (jobPosting.applicants || 0) + 1;
        await this.jobPostingRepository.save(jobPosting);
      }
    }
    
    return savedCandidate;
  }

  async findAllCandidates() {
    return this.candidateRepository.find({
      relations: ['jobPosting', 'interviews'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOneCandidate(id: number) {
    const candidate = await this.candidateRepository.findOne({
      where: { id },
      relations: ['jobPosting', 'interviews'],
    });
    
    if (!candidate) {
      throw new NotFoundException(`Candidate with ID ${id} not found`);
    }
    
    return candidate;
  }

  async updateCandidate(id: number, updateCandidateDto: UpdateCandidateDto) {
    const candidate = await this.findOneCandidate(id);
    Object.assign(candidate, {
      ...updateCandidateDto,
      appliedDate: updateCandidateDto.appliedDate 
        ? new Date(updateCandidateDto.appliedDate) 
        : candidate.appliedDate,
    });
    return this.candidateRepository.save(candidate);
  }

  async removeCandidate(id: number) {
    const candidate = await this.findOneCandidate(id);
    
    // Decrease job posting applicant count if candidate has a job posting
    if (candidate.jobPostingId) {
      const jobPosting = await this.jobPostingRepository.findOne({
        where: { id: candidate.jobPostingId },
      });
      if (jobPosting && jobPosting.applicants > 0) {
        jobPosting.applicants = jobPosting.applicants - 1;
        await this.jobPostingRepository.save(jobPosting);
      }
    }
    
    return this.candidateRepository.remove(candidate);
  }

  // Interview methods
  async createInterview(createInterviewDto: CreateInterviewDto) {
    const interview = this.interviewRepository.create({
      ...createInterviewDto,
      date: new Date(createInterviewDto.date),
      meetLink: createInterviewDto.meetLink,
    });
    const savedInterview = await this.interviewRepository.save(interview);
    
    // Send email to candidate
    if (createInterviewDto.candidateId) {
      const candidate = await this.candidateRepository.findOneBy({ id: createInterviewDto.candidateId });
      if (candidate) {
        await this.sendInterviewInvitationEmail(candidate, savedInterview);
      }
    }
    
    return savedInterview;
  }

  async createBulkInterviews(createInterviewDto: CreateInterviewDto, candidateIds: number[]) {
    const interviews = await Promise.all(candidateIds.map(async (id) => {
      const candidate = await this.candidateRepository.findOneBy({ id });
      if (!candidate) return null;

      const interview = this.interviewRepository.create({
        ...createInterviewDto,
        candidate: candidate.name,
        candidateId: candidate.id,
        date: new Date(createInterviewDto.date),
      });
      
      const savedInterview = await this.interviewRepository.save(interview);
      
      // Send individual email
      await this.sendInterviewInvitationEmail(candidate, savedInterview);
      
      return savedInterview;
    }));

    const validInterviews = interviews.filter(i => i !== null);
    return validInterviews;
  }

  async findAllInterviews() {
    return this.interviewRepository.find({
      relations: ['candidateEntity'],
      order: { date: 'ASC', time: 'ASC' },
    });
  }

  async findOneInterview(id: number) {
    const interview = await this.interviewRepository.findOne({
      where: { id },
      relations: ['candidateEntity'],
    });
    
    if (!interview) {
      throw new NotFoundException(`Interview with ID ${id} not found`);
    }
    
    return interview;
  }

  async updateInterview(id: number, updateInterviewDto: UpdateInterviewDto) {
    const interview = await this.findOneInterview(id);
    Object.assign(interview, {
      ...updateInterviewDto,
      date: updateInterviewDto.date 
        ? new Date(updateInterviewDto.date) 
        : interview.date,
    });
    return this.interviewRepository.save(interview);
  }

  async removeInterview(id: number) {
    const interview = await this.findOneInterview(id);
    return this.interviewRepository.remove(interview);
  }

  // Legacy methods for backward compatibility
  create(createReqcuitmentDto: any) {
    return 'This action adds a new reqcuitment';
  }

  findAll() {
    return `This action returns all reqcuitment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reqcuitment`;
  }

  update(id: number, updateReqcuitmentDto: any) {
    return `This action updates a #${id} reqcuitment`;
  }

  remove(id: number) {
    return `This action removes a #${id} reqcuitment`;
  }

  private async sendInterviewInvitationEmail(candidate: Candidate, interview: Interview) {
    const subject = `Interview Invitation: ${interview.position} at NexoviaSoft`;
    const dateFormatted = new Date(interview.date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const body = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #ffffff;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h2 style="color: #F58220; margin-bottom: 5px;">NexoviaSoft</h2>
          <p style="color: #666; font-size: 14px; margin-top: 0;">Recruitment Team</p>
        </div>
        <div style="padding: 20px; color: #333; line-height: 1.6;">
          <p>Dear <strong>${candidate.name}</strong>,</p>
          <p>We are excited to invite you for an interview for the <strong>${interview.position}</strong> position at NexoviaSoft. We were impressed with your background and skills, and we'd like to learn more about you.</p>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-left: 4px solid #F58220; margin: 20px 0; border-radius: 5px;">
            <h3 style="margin-top: 0; color: #333; font-size: 18px;">Interview Details</h3>
            <p style="margin: 5px 0;"><strong>Type:</strong> ${interview.type}</p>
            <p style="margin: 5px 0;"><strong>Date:</strong> ${dateFormatted}</p>
            <p style="margin: 5px 0;"><strong>Time:</strong> ${interview.time}</p>
            <p style="margin: 5px 0;"><strong>Interviewer:</strong> ${interview.interviewer}</p>
          </div>

          ${interview.meetLink ? `
            <div style="text-align: center; margin: 30px 0;">
              <p style="margin-bottom: 15px;">You can join the interview via the following link:</p>
              <a href="${interview.meetLink}" style="background-color: #F58220; color: #ffffff; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Join Online Interview</a>
              <p style="font-size: 12px; color: #999; margin-top: 10px;">Link: ${interview.meetLink}</p>
            </div>
          ` : ''}

          <p>Please confirm your availability by replying to this email. We look forward to meeting with you!</p>
          
          <p style="margin-top: 30px;">Best regards,<br>
          <strong>NexoviaSoft Recruitment Team</strong></p>
        </div>
        <div style="text-align: center; padding-top: 20px; border-top: 1px solid #eeeeee; color: #999; font-size: 12px;">
          <p>&copy; ${new Date().getFullYear()} NexoviaSoft. All rights reserved.</p>
        </div>
      </div>
    `;

    try {
      await this.emailService.sendGenericEmail(candidate.email, subject, body);
      this.logger.log(`Interview invitation email sent to ${candidate.email}`);
    } catch (error) {
      this.logger.error(`Failed to send interview invitation email to ${candidate.email}: ${error.message}`);
    }
  }
}
