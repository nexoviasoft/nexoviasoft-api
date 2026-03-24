"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOurServiceDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_our_service_dto_1 = require("./create-our-service.dto");
class UpdateOurServiceDto extends (0, mapped_types_1.PartialType)(create_our_service_dto_1.CreateOurServiceDto) {
}
exports.UpdateOurServiceDto = UpdateOurServiceDto;
//# sourceMappingURL=update-our-service.dto.js.map