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
exports.CustomerReviewService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const customer_review_entity_1 = require("./entities/customer-review.entity");
const our_client_entity_1 = require("../../our-client/entities/our-client.entity");
const case_study_entity_1 = require("../case-studies/entities/case-study.entity");
let CustomerReviewService = class CustomerReviewService {
    constructor(customerReviewRepository, ourClientRepository, caseStudyRepository) {
        this.customerReviewRepository = customerReviewRepository;
        this.ourClientRepository = ourClientRepository;
        this.caseStudyRepository = caseStudyRepository;
    }
    async create(createCustomerReviewDto) {
        const { client_id, case_study_id, ...rest } = createCustomerReviewDto;
        let client = null;
        if (client_id) {
            client = await this.ourClientRepository.findOne({
                where: { id: client_id },
            });
            if (!client) {
                throw new common_1.NotFoundException(`Client with ID ${client_id} not found`);
            }
        }
        let caseStudy = null;
        if (case_study_id) {
            caseStudy = await this.caseStudyRepository.findOne({
                where: { id: case_study_id },
            });
            if (!caseStudy) {
                throw new common_1.NotFoundException(`Case Study with ID ${case_study_id} not found`);
            }
        }
        const customerReview = this.customerReviewRepository.create({
            ...rest,
            ...(client_id && { client_id }),
            ...(case_study_id && { case_study_id }),
        });
        if (customerReview.status === 'approved') {
            customerReview.is_featured = true;
        }
        if (client) {
            customerReview.client = client;
        }
        if (caseStudy) {
            customerReview.caseStudy = caseStudy;
        }
        return this.customerReviewRepository.save(customerReview);
    }
    async findAll() {
        return this.customerReviewRepository.find({
            relations: ['client', 'caseStudy'],
            select: {
                client: {
                    id: true,
                    name: true,
                    email: true,
                    companyName: true,
                    designation: true,
                    photo: true,
                },
                caseStudy: {
                    id: true,
                    title: true,
                    imageUrl: true,
                },
            },
        });
    }
    async findOne(id) {
        const customerReview = await this.customerReviewRepository.findOne({
            where: { id },
            relations: ['client', 'caseStudy'],
            select: {
                client: {
                    id: true,
                    name: true,
                    email: true,
                    companyName: true,
                    designation: true,
                    photo: true,
                },
                caseStudy: {
                    id: true,
                    title: true,
                    imageUrl: true,
                },
            },
        });
        if (!customerReview) {
            throw new common_1.NotFoundException(`Customer Review with ID ${id} not found`);
        }
        return customerReview;
    }
    async update(id, updateCustomerReviewDto) {
        const customerReview = await this.customerReviewRepository.findOne({
            where: { id },
            relations: ['client', 'caseStudy'],
        });
        if (!customerReview) {
            throw new common_1.NotFoundException(`Customer Review with ID ${id} not found`);
        }
        const { client_id, case_study_id, ...rest } = updateCustomerReviewDto;
        if (client_id !== undefined) {
            if (client_id) {
                const client = await this.ourClientRepository.findOne({
                    where: { id: client_id },
                });
                if (!client) {
                    throw new common_1.NotFoundException(`Client with ID ${client_id} not found`);
                }
                customerReview.client = client;
                customerReview.client_id = client_id;
            }
            else {
                customerReview.client = null;
                customerReview.client_id = null;
            }
        }
        if (case_study_id !== undefined) {
            if (case_study_id) {
                const caseStudy = await this.caseStudyRepository.findOne({
                    where: { id: case_study_id },
                });
                if (!caseStudy) {
                    throw new common_1.NotFoundException(`Case Study with ID ${case_study_id} not found`);
                }
                customerReview.caseStudy = caseStudy;
                customerReview.case_study_id = case_study_id;
            }
            else {
                customerReview.caseStudy = null;
                customerReview.case_study_id = null;
            }
        }
        Object.assign(customerReview, rest);
        if (customerReview.status === 'approved') {
            customerReview.is_featured = true;
        }
        return this.customerReviewRepository.save(customerReview);
    }
    async approve(id) {
        const customerReview = await this.customerReviewRepository.findOne({
            where: { id },
            relations: ['client', 'caseStudy'],
        });
        if (!customerReview) {
            throw new common_1.NotFoundException(`Customer Review with ID ${id} not found`);
        }
        customerReview.status = 'approved';
        customerReview.is_featured = true;
        return this.customerReviewRepository.save(customerReview);
    }
    async remove(id) {
        const customerReview = await this.findOne(id);
        return this.customerReviewRepository.remove(customerReview);
    }
};
exports.CustomerReviewService = CustomerReviewService;
exports.CustomerReviewService = CustomerReviewService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(customer_review_entity_1.CustomerReview)),
    __param(1, (0, typeorm_1.InjectRepository)(our_client_entity_1.OurClient)),
    __param(2, (0, typeorm_1.InjectRepository)(case_study_entity_1.CaseStudy)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CustomerReviewService);
//# sourceMappingURL=customer-review.service.js.map