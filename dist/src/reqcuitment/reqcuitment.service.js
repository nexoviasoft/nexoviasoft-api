"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var ReqcuitmentService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReqcuitmentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const imagebb_service_1 = require("../common/services/imagebb.service");
const job_posting_entity_1 = require("./entities/job-posting.entity");
const candidate_entity_1 = require("./entities/candidate.entity");
const interview_entity_1 = require("./entities/interview.entity");
const email_service_1 = require("../common/services/email.service");
let ReqcuitmentService = ReqcuitmentService_1 = class ReqcuitmentService {
    constructor(jobPostingRepository, candidateRepository, interviewRepository, imageBBService, emailService) {
        this.jobPostingRepository = jobPostingRepository;
        this.candidateRepository = candidateRepository;
        this.interviewRepository = interviewRepository;
        this.imageBBService = imageBBService;
        this.emailService = emailService;
        this.logger = new common_1.Logger(ReqcuitmentService_1.name);
    }
    async createJobPosting(createJobPostingDto) {
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
    async findOneJobPosting(id) {
        const jobPosting = await this.jobPostingRepository.findOne({
            where: { id },
            relations: ['candidates', 'departmentEntity'],
        });
        if (!jobPosting) {
            throw new common_1.NotFoundException(`Job posting with ID ${id} not found`);
        }
        return jobPosting;
    }
    async updateJobPosting(id, updateJobPostingDto) {
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
    async removeJobPosting(id) {
        const jobPosting = await this.findOneJobPosting(id);
        return this.jobPostingRepository.remove(jobPosting);
    }
    async createCandidate(createCandidateDto) {
        let cvUrl = createCandidateDto.cvUrl;
        if (createCandidateDto.cvData && !cvUrl) {
            try {
                cvUrl = await this.imageBBService.upload(createCandidateDto.cvData);
            }
            catch (error) {
                this.logger.error(`Failed to upload CV for ${createCandidateDto.name}: ${error.message}`);
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
    async findOneCandidate(id) {
        const candidate = await this.candidateRepository.findOne({
            where: { id },
            relations: ['jobPosting', 'interviews'],
        });
        if (!candidate) {
            throw new common_1.NotFoundException(`Candidate with ID ${id} not found`);
        }
        return candidate;
    }
    async updateCandidate(id, updateCandidateDto) {
        const candidate = await this.findOneCandidate(id);
        Object.assign(candidate, {
            ...updateCandidateDto,
            appliedDate: updateCandidateDto.appliedDate
                ? new Date(updateCandidateDto.appliedDate)
                : candidate.appliedDate,
        });
        return this.candidateRepository.save(candidate);
    }
    async removeCandidate(id) {
        const candidate = await this.findOneCandidate(id);
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
    async createInterview(createInterviewDto) {
        const interview = this.interviewRepository.create({
            ...createInterviewDto,
            date: new Date(createInterviewDto.date),
            meetLink: createInterviewDto.meetLink,
        });
        const savedInterview = await this.interviewRepository.save(interview);
        if (createInterviewDto.candidateId) {
            const candidate = await this.candidateRepository.findOneBy({ id: createInterviewDto.candidateId });
            if (candidate) {
                await this.sendInterviewInvitationEmail(candidate, savedInterview);
            }
        }
        return savedInterview;
    }
    async createBulkInterviews(createInterviewDto, candidateIds) {
        const interviews = await Promise.all(candidateIds.map(async (id) => {
            const candidate = await this.candidateRepository.findOneBy({ id });
            if (!candidate)
                return null;
            const interview = this.interviewRepository.create({
                ...createInterviewDto,
                candidate: candidate.name,
                candidateId: candidate.id,
                date: new Date(createInterviewDto.date),
            });
            const savedInterview = await this.interviewRepository.save(interview);
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
    async findOneInterview(id) {
        const interview = await this.interviewRepository.findOne({
            where: { id },
            relations: ['candidateEntity'],
        });
        if (!interview) {
            throw new common_1.NotFoundException(`Interview with ID ${id} not found`);
        }
        return interview;
    }
    async updateInterview(id, updateInterviewDto) {
        const interview = await this.findOneInterview(id);
        Object.assign(interview, {
            ...updateInterviewDto,
            date: updateInterviewDto.date
                ? new Date(updateInterviewDto.date)
                : interview.date,
        });
        return this.interviewRepository.save(interview);
    }
    async removeInterview(id) {
        const interview = await this.findOneInterview(id);
        return this.interviewRepository.remove(interview);
    }
    create(createReqcuitmentDto) {
        return 'This action adds a new reqcuitment';
    }
    findAll() {
        return `This action returns all reqcuitment`;
    }
    findOne(id) {
        return `This action returns a #${id} reqcuitment`;
    }
    update(id, updateReqcuitmentDto) {
        return `This action updates a #${id} reqcuitment`;
    }
    remove(id) {
        return `This action removes a #${id} reqcuitment`;
    }
    async sendInterviewInvitationEmail(candidate, interview) {
        const dateFormatted = new Date(interview.date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
        try {
            await this.emailService.sendInterviewInvitation({
                to: candidate.email,
                candidateName: candidate.name,
                position: interview.position,
                type: interview.type,
                date: dateFormatted,
                time: interview.time,
                interviewer: interview.interviewer,
                meetLink: interview.meetLink,
            });
            this.logger.log(`Interview invitation email sent to candidate ${candidate.name} (${candidate.email}) for interview ID ${interview.id}`);
        }
        catch (error) {
            this.logger.error(`Failed to send interview invitation email to ${candidate.email} (Candidate ID: ${candidate.id}): ${error.message}`);
        }
    }
};
exports.ReqcuitmentService = ReqcuitmentService;
exports.ReqcuitmentService = ReqcuitmentService = ReqcuitmentService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(job_posting_entity_1.JobPosting)),
    __param(1, (0, typeorm_1.InjectRepository)(candidate_entity_1.Candidate)),
    __param(2, (0, typeorm_1.InjectRepository)(interview_entity_1.Interview)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        imagebb_service_1.ImageBBService,
        email_service_1.EmailService])
], ReqcuitmentService);
//# sourceMappingURL=reqcuitment.service.js.map