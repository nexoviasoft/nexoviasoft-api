"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateColumnDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_column_dto_1 = require("./create-column.dto");
class UpdateColumnDto extends (0, mapped_types_1.PartialType)(create_column_dto_1.CreateColumnDto) {
}
exports.UpdateColumnDto = UpdateColumnDto;
//# sourceMappingURL=update-column.dto.js.map