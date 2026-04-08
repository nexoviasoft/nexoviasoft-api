"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReqcuitmentModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const reqcuitment_service_1 = require("./reqcuitment.service");
const reqcuitment_controller_1 = require("./reqcuitment.controller");
const job_posting_entity_1 = require("./entities/job-posting.entity");
const candidate_entity_1 = require("./entities/candidate.entity");
const interview_entity_1 = require("./entities/interview.entity");
const department_entity_1 = require("../setting/department/entities/department.entity");
let ReqcuitmentModule = class ReqcuitmentModule {
};
exports.ReqcuitmentModule = ReqcuitmentModule;
exports.ReqcuitmentModule = ReqcuitmentModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([job_posting_entity_1.JobPosting, candidate_entity_1.Candidate, interview_entity_1.Interview, department_entity_1.Department]),
        ],
        controllers: [reqcuitment_controller_1.ReqcuitmentController],
        providers: [reqcuitment_service_1.ReqcuitmentService],
        exports: [reqcuitment_service_1.ReqcuitmentService],
    })
], ReqcuitmentModule);
//# sourceMappingURL=reqcuitment.module.js.map