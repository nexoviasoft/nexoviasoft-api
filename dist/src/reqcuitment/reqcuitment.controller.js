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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReqcuitmentController = void 0;
const common_1 = require("@nestjs/common");
const reqcuitment_service_1 = require("./reqcuitment.service");
const create_job_posting_dto_1 = require("./dto/create-job-posting.dto");
const update_job_posting_dto_1 = require("./dto/update-job-posting.dto");
const create_candidate_dto_1 = require("./dto/create-candidate.dto");
const update_candidate_dto_1 = require("./dto/update-candidate.dto");
const create_interview_dto_1 = require("./dto/create-interview.dto");
const update_interview_dto_1 = require("./dto/update-interview.dto");
let ReqcuitmentController = class ReqcuitmentController {
    constructor(reqcuitmentService) {
        this.reqcuitmentService = reqcuitmentService;
    }
    async createJobPosting(createJobPostingDto) {
        const data = await this.reqcuitmentService.createJobPosting(createJobPostingDto);
        return {
            statusCode: common_1.HttpStatus.CREATED,
            message: 'Job posting created successfully',
            data,
        };
    }
    async findAllJobPostings() {
        const data = await this.reqcuitmentService.findAllJobPostings();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Job postings retrieved successfully',
            data,
        };
    }
    async findOneJobPosting(id) {
        const data = await this.reqcuitmentService.findOneJobPosting(+id);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Job posting retrieved successfully',
            data,
        };
    }
    async updateJobPosting(id, updateJobPostingDto) {
        const data = await this.reqcuitmentService.updateJobPosting(+id, updateJobPostingDto);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Job posting updated successfully',
            data,
        };
    }
    async removeJobPosting(id) {
        await this.reqcuitmentService.removeJobPosting(+id);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Job posting deleted successfully',
        };
    }
    async createCandidate(createCandidateDto) {
        const data = await this.reqcuitmentService.createCandidate(createCandidateDto);
        return {
            statusCode: common_1.HttpStatus.CREATED,
            message: 'Candidate created successfully',
            data,
        };
    }
    async findAllCandidates() {
        const data = await this.reqcuitmentService.findAllCandidates();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Candidates retrieved successfully',
            data,
        };
    }
    async findOneCandidate(id) {
        const data = await this.reqcuitmentService.findOneCandidate(+id);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Candidate retrieved successfully',
            data,
        };
    }
    async updateCandidate(id, updateCandidateDto) {
        const data = await this.reqcuitmentService.updateCandidate(+id, updateCandidateDto);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Candidate updated successfully',
            data,
        };
    }
    async removeCandidate(id) {
        await this.reqcuitmentService.removeCandidate(+id);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Candidate deleted successfully',
        };
    }
    async createInterview(createInterviewDto) {
        const data = await this.reqcuitmentService.createInterview(createInterviewDto);
        return {
            statusCode: common_1.HttpStatus.CREATED,
            message: 'Interview scheduled successfully',
            data,
        };
    }
    async createBulkInterviews(body) {
        const data = await this.reqcuitmentService.createBulkInterviews(body.interview, body.candidateIds);
        return {
            statusCode: common_1.HttpStatus.CREATED,
            message: `${data.length} interviews scheduled successfully`,
            data,
        };
    }
    async findAllInterviews() {
        const data = await this.reqcuitmentService.findAllInterviews();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Interviews retrieved successfully',
            data,
        };
    }
    async findOneInterview(id) {
        const data = await this.reqcuitmentService.findOneInterview(+id);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Interview retrieved successfully',
            data,
        };
    }
    async updateInterview(id, updateInterviewDto) {
        const data = await this.reqcuitmentService.updateInterview(+id, updateInterviewDto);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Interview updated successfully',
            data,
        };
    }
    async removeInterview(id) {
        await this.reqcuitmentService.removeInterview(+id);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Interview deleted successfully',
        };
    }
};
exports.ReqcuitmentController = ReqcuitmentController;
__decorate([
    (0, common_1.Post)('job-postings'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_job_posting_dto_1.CreateJobPostingDto]),
    __metadata("design:returntype", Promise)
], ReqcuitmentController.prototype, "createJobPosting", null);
__decorate([
    (0, common_1.Get)('job-postings'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReqcuitmentController.prototype, "findAllJobPostings", null);
__decorate([
    (0, common_1.Get)('job-postings/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReqcuitmentController.prototype, "findOneJobPosting", null);
__decorate([
    (0, common_1.Patch)('job-postings/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_job_posting_dto_1.UpdateJobPostingDto]),
    __metadata("design:returntype", Promise)
], ReqcuitmentController.prototype, "updateJobPosting", null);
__decorate([
    (0, common_1.Delete)('job-postings/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReqcuitmentController.prototype, "removeJobPosting", null);
__decorate([
    (0, common_1.Post)('candidates'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_candidate_dto_1.CreateCandidateDto]),
    __metadata("design:returntype", Promise)
], ReqcuitmentController.prototype, "createCandidate", null);
__decorate([
    (0, common_1.Get)('candidates'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReqcuitmentController.prototype, "findAllCandidates", null);
__decorate([
    (0, common_1.Get)('candidates/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReqcuitmentController.prototype, "findOneCandidate", null);
__decorate([
    (0, common_1.Patch)('candidates/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_candidate_dto_1.UpdateCandidateDto]),
    __metadata("design:returntype", Promise)
], ReqcuitmentController.prototype, "updateCandidate", null);
__decorate([
    (0, common_1.Delete)('candidates/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReqcuitmentController.prototype, "removeCandidate", null);
__decorate([
    (0, common_1.Post)('interviews'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_interview_dto_1.CreateInterviewDto]),
    __metadata("design:returntype", Promise)
], ReqcuitmentController.prototype, "createInterview", null);
__decorate([
    (0, common_1.Post)('interviews/bulk'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReqcuitmentController.prototype, "createBulkInterviews", null);
__decorate([
    (0, common_1.Get)('interviews'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReqcuitmentController.prototype, "findAllInterviews", null);
__decorate([
    (0, common_1.Get)('interviews/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReqcuitmentController.prototype, "findOneInterview", null);
__decorate([
    (0, common_1.Patch)('interviews/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_interview_dto_1.UpdateInterviewDto]),
    __metadata("design:returntype", Promise)
], ReqcuitmentController.prototype, "updateInterview", null);
__decorate([
    (0, common_1.Delete)('interviews/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReqcuitmentController.prototype, "removeInterview", null);
exports.ReqcuitmentController = ReqcuitmentController = __decorate([
    (0, common_1.Controller)('recruitment'),
    __metadata("design:paramtypes", [reqcuitment_service_1.ReqcuitmentService])
], ReqcuitmentController);
//# sourceMappingURL=reqcuitment.controller.js.map