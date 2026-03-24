"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaseStudiesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const category_entity_1 = require("../../category/entities/category.entity");
const our_client_entity_1 = require("../../our-client/entities/our-client.entity");
const case_studies_controller_1 = require("./case-studies.controller");
const case_studies_service_1 = require("./case-studies.service");
const case_study_entity_1 = require("./entities/case-study.entity");
let CaseStudiesModule = class CaseStudiesModule {
};
exports.CaseStudiesModule = CaseStudiesModule;
exports.CaseStudiesModule = CaseStudiesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([case_study_entity_1.CaseStudy, category_entity_1.Category, our_client_entity_1.OurClient])],
        controllers: [case_studies_controller_1.CaseStudiesController],
        providers: [case_studies_service_1.CaseStudiesService],
    })
], CaseStudiesModule);
//# sourceMappingURL=case-studies.module.js.map