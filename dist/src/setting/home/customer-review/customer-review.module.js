"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerReviewModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const customer_review_service_1 = require("./customer-review.service");
const customer_review_controller_1 = require("./customer-review.controller");
const customer_review_entity_1 = require("./entities/customer-review.entity");
const our_client_entity_1 = require("../../our-client/entities/our-client.entity");
const case_study_entity_1 = require("../case-studies/entities/case-study.entity");
let CustomerReviewModule = class CustomerReviewModule {
};
exports.CustomerReviewModule = CustomerReviewModule;
exports.CustomerReviewModule = CustomerReviewModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([customer_review_entity_1.CustomerReview, our_client_entity_1.OurClient, case_study_entity_1.CaseStudy]),
        ],
        controllers: [customer_review_controller_1.CustomerReviewController],
        providers: [customer_review_service_1.CustomerReviewService],
    })
], CustomerReviewModule);
//# sourceMappingURL=customer-review.module.js.map