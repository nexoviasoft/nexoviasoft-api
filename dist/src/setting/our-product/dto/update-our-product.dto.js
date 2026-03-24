"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOurProductDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_our_product_dto_1 = require("./create-our-product.dto");
class UpdateOurProductDto extends (0, mapped_types_1.PartialType)(create_our_product_dto_1.CreateOurProductDto) {
}
exports.UpdateOurProductDto = UpdateOurProductDto;
//# sourceMappingURL=update-our-product.dto.js.map