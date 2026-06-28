"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefinedExportsSchema = void 0;
const core_validation_1 = require("@fivem/core-validation");
const ExportValueSchema = core_validation_1.schema.custom((value) => typeof value === "function" || value !== undefined, "Export value must be defined or be a function");
exports.DefinedExportsSchema = core_validation_1.schema.object({
    entries: core_validation_1.schema.record(core_validation_1.schema.string().regex(core_validation_1.EXPORT_NAME_PATTERN, "Invalid export name"), ExportValueSchema)
}).strict();
//# sourceMappingURL=defined-exports-schema.js.map