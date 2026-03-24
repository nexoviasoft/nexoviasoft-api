"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePricePackageDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_price_package_dto_1 = require("./create-price-package.dto");
class UpdatePricePackageDto extends (0, mapped_types_1.PartialType)(create_price_package_dto_1.CreatePricePackageDto) {
}
exports.UpdatePricePackageDto = UpdatePricePackageDto;
//# sourceMappingURL=update-price-package.dto.js.map