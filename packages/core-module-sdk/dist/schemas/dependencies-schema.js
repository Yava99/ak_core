"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DependenciesSchema = void 0;
const core_validation_1 = require("@fivem/core-validation");
exports.DependenciesSchema = core_validation_1.schema.array(core_validation_1.schema.string().trim().min(1).regex(core_validation_1.MODULE_NAME_PATTERN, "Invalid dependency module name"));
//# sourceMappingURL=dependencies-schema.js.map