"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDocDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_doc_dto_1 = require("./create-doc.dto");
class UpdateDocDto extends (0, mapped_types_1.PartialType)(create_doc_dto_1.CreateDocDto) {
}
exports.UpdateDocDto = UpdateDocDto;
//# sourceMappingURL=update-doc.dto.js.map