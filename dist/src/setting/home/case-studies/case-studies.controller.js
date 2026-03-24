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
exports.CaseStudiesController = void 0;
const common_1 = require("@nestjs/common");
const case_studies_service_1 = require("./case-studies.service");
const create_case_study_dto_1 = require("./dto/create-case-study.dto");
const update_case_study_dto_1 = require("./dto/update-case-study.dto");
let CaseStudiesController = class CaseStudiesController {
    constructor(caseStudiesService) {
        this.caseStudiesService = caseStudiesService;
    }
    async create(createCaseStudyDto) {
        const data = await this.caseStudiesService.create(createCaseStudyDto);
        return {
            statusCode: common_1.HttpStatus.CREATED,
            message: 'Case Study created successfully',
            data,
        };
    }
    async findAll() {
        const data = await this.caseStudiesService.findAll();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Case Studies retrieved successfully',
            data,
        };
    }
    async findOne(id) {
        const data = await this.caseStudiesService.findOne(+id);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Case Study retrieved successfully',
            data,
        };
    }
    async update(id, updateCaseStudyDto) {
        const data = await this.caseStudiesService.update(+id, updateCaseStudyDto);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Case Study updated successfully',
            data,
        };
    }
    async remove(id) {
        await this.caseStudiesService.remove(+id);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Case Study deleted successfully',
        };
    }
};
exports.CaseStudiesController = CaseStudiesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_case_study_dto_1.CreateCaseStudyDto]),
    __metadata("design:returntype", Promise)
], CaseStudiesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CaseStudiesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CaseStudiesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_case_study_dto_1.UpdateCaseStudyDto]),
    __metadata("design:returntype", Promise)
], CaseStudiesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CaseStudiesController.prototype, "remove", null);
exports.CaseStudiesController = CaseStudiesController = __decorate([
    (0, common_1.Controller)('case-studies'),
    __metadata("design:paramtypes", [case_studies_service_1.CaseStudiesService])
], CaseStudiesController);
//# sourceMappingURL=case-studies.controller.js.map