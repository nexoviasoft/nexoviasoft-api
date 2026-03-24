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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerReview = void 0;
const typeorm_1 = require("typeorm");
const our_client_entity_1 = require("../../../our-client/entities/our-client.entity");
const case_study_entity_1 = require("../../case-studies/entities/case-study.entity");
let CustomerReview = class CustomerReview {
};
exports.CustomerReview = CustomerReview;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CustomerReview.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => our_client_entity_1.OurClient, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'client_id' }),
    __metadata("design:type", our_client_entity_1.OurClient)
], CustomerReview.prototype, "client", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], CustomerReview.prototype, "client_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => case_study_entity_1.CaseStudy, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'case_study_id' }),
    __metadata("design:type", case_study_entity_1.CaseStudy)
], CustomerReview.prototype, "caseStudy", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], CustomerReview.prototype, "case_study_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 1 }),
    __metadata("design:type", Number)
], CustomerReview.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CustomerReview.prototype, "review_title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], CustomerReview.prototype, "review_message", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'project' }),
    __metadata("design:type", String)
], CustomerReview.prototype, "review_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], CustomerReview.prototype, "is_featured", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'pending' }),
    __metadata("design:type", String)
], CustomerReview.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], CustomerReview.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], CustomerReview.prototype, "updated_at", void 0);
exports.CustomerReview = CustomerReview = __decorate([
    (0, typeorm_1.Entity)('customer_reviews')
], CustomerReview);
//# sourceMappingURL=customer-review.entity.js.map