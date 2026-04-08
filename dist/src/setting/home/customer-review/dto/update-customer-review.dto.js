"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCustomerReviewDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_customer_review_dto_1 = require("./create-customer-review.dto");
class UpdateCustomerReviewDto extends (0, mapped_types_1.PartialType)(create_customer_review_dto_1.CreateCustomerReviewDto) {
}
exports.UpdateCustomerReviewDto = UpdateCustomerReviewDto;
//# sourceMappingURL=update-customer-review.dto.js.map