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
exports.CaseStudiesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const category_entity_1 = require("../../category/entities/category.entity");
const our_client_entity_1 = require("../../our-client/entities/our-client.entity");
const typeorm_2 = require("typeorm");
const case_study_entity_1 = require("./entities/case-study.entity");
let CaseStudiesService = class CaseStudiesService {
    constructor(caseStudyRepository, categoryRepository, ourClientRepository) {
        this.caseStudyRepository = caseStudyRepository;
        this.categoryRepository = categoryRepository;
        this.ourClientRepository = ourClientRepository;
    }
    async create(createCaseStudyDto) {
        const { categories: categoryIds, clientId, ...rest } = createCaseStudyDto;
        let categories = [];
        if (categoryIds && categoryIds.length > 0) {
            categories = await this.categoryRepository.findBy({ id: (0, typeorm_2.In)(categoryIds) });
        }
        let client = null;
        if (clientId) {
            client = await this.ourClientRepository.findOne({ where: { id: clientId } });
            if (!client) {
                throw new common_1.NotFoundException(`Client with ID ${clientId} not found`);
            }
        }
        const caseStudy = this.caseStudyRepository.create({
            ...rest,
            ...(clientId && { clientId }),
        });
        caseStudy.categories = categories;
        if (client) {
            caseStudy.client = client;
        }
        else {
            caseStudy.client = null;
        }
        return this.caseStudyRepository.save(caseStudy);
    }
    findAll() {
        return this.caseStudyRepository.find({
            relations: ['categories', 'client'],
            select: {
                categories: {
                    id: true,
                    name: true,
                },
                client: {
                    id: true,
                    name: true,
                    email: true,
                    companyName: true,
                    designation: true,
                    country: true,
                },
            },
        });
    }
    findOne(id) {
        return this.caseStudyRepository.findOne({
            where: { id },
            relations: ['categories', 'client'],
            select: {
                categories: {
                    id: true,
                    name: true,
                },
                client: {
                    id: true,
                    name: true,
                    email: true,
                    companyName: true,
                    designation: true,
                    country: true,
                },
            },
        });
    }
    async update(id, updateCaseStudyDto) {
        const caseStudy = await this.caseStudyRepository.findOne({
            where: { id },
            relations: ['categories', 'client']
        });
        if (!caseStudy) {
            throw new common_1.NotFoundException(`CaseStudy with ID ${id} not found`);
        }
        const { categories: categoryIds, clientId, ...rest } = updateCaseStudyDto;
        if (categoryIds) {
            const categories = await this.categoryRepository.findBy({ id: (0, typeorm_2.In)(categoryIds) });
            caseStudy.categories = categories;
        }
        if (clientId !== undefined) {
            if (clientId) {
                const client = await this.ourClientRepository.findOne({ where: { id: clientId } });
                if (!client) {
                    throw new common_1.NotFoundException(`Client with ID ${clientId} not found`);
                }
                caseStudy.client = client;
                caseStudy.clientId = clientId;
            }
            else {
                caseStudy.client = null;
                caseStudy.clientId = null;
            }
        }
        Object.assign(caseStudy, rest);
        return this.caseStudyRepository.save(caseStudy);
    }
    async remove(id) {
        const caseStudy = await this.findOne(id);
        if (caseStudy) {
            return this.caseStudyRepository.remove(caseStudy);
        }
    }
};
exports.CaseStudiesService = CaseStudiesService;
exports.CaseStudiesService = CaseStudiesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(case_study_entity_1.CaseStudy)),
    __param(1, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __param(2, (0, typeorm_1.InjectRepository)(our_client_entity_1.OurClient)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CaseStudiesService);
//# sourceMappingURL=case-studies.service.js.map