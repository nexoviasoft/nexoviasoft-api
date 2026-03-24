"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOurClientDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_our_client_dto_1 = require("./create-our-client.dto");
class UpdateOurClientDto extends (0, mapped_types_1.PartialType)(create_our_client_dto_1.CreateOurClientDto) {
}
exports.UpdateOurClientDto = UpdateOurClientDto;
//# sourceMappingURL=update-our-client.dto.js.map