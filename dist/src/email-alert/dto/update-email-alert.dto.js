"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEmailAlertDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_email_alert_dto_1 = require("./create-email-alert.dto");
class UpdateEmailAlertDto extends (0, mapped_types_1.PartialType)(create_email_alert_dto_1.CreateEmailAlertDto) {
}
exports.UpdateEmailAlertDto = UpdateEmailAlertDto;
//# sourceMappingURL=update-email-alert.dto.js.map