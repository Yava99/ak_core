"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleDefinitionInputSchema = void 0;
const core_validation_1 = require("@fivem/core-validation");
const SetupFunctionSchema = core_validation_1.schema.function();
exports.ModuleDefinitionInputSchema = core_validation_1.schema.object({
    name: core_validation_1.schema
        .string()
        .trim()
        .min(1)
        .regex(core_validation_1.MODULE_NAME_PATTERN, "Invalid module name"),
    dependencies: core_validation_1.schema
        .array(core_validation_1.schema.string().trim().min(1).regex(core_validation_1.MODULE_NAME_PATTERN, "Invalid dependency module name"))
        .optional(),
    setup: SetupFunctionSchema
}).strict();
//# sourceMappingURL=module-definition-input-schema.js.map