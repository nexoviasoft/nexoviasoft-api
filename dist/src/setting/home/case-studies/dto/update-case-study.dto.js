"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCaseStudyDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_case_study_dto_1 = require("./create-case-study.dto");
class UpdateCaseStudyDto extends (0, mapped_types_1.PartialType)(create_case_study_dto_1.CreateCaseStudyDto) {
}
exports.UpdateCaseStudyDto = UpdateCaseStudyDto;
//# sourceMappingURL=update-case-study.dto.js.map