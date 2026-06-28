"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleSetupResultSchema = void 0;
const core_validation_1 = require("@fivem/core-validation");
const LifecycleFunctionSchema = core_validation_1.schema.function();
const ServiceSchema = core_validation_1.schema.object({
    name: core_validation_1.schema
        .string()
        .trim()
        .min(1)
        .regex(core_validation_1.SERVICE_NAME_PATTERN, "Invalid service name"),
    instance: core_validation_1.schema.unknown(),
    public: core_validation_1.schema.boolean().optional()
}).strict();
const ExportValueSchema = core_validation_1.schema.custom((value) => typeof value === "function" || value !== undefined, "Export value must be defined or be a function");
const DefinedExportsInlineSchema = core_validation_1.schema.object({
    entries: core_validation_1.schema.record(core_validation_1.schema.string().regex(core_validation_1.EXPORT_NAME_PATTERN, "Invalid export name"), ExportValueSchema)
}).strict();
exports.ModuleSetupResultSchema = core_validation_1.schema.object({
    services: core_validation_1.schema.array(ServiceSchema).optional(),
    exports: DefinedExportsInlineSchema.optional(),
    start: LifecycleFunctionSchema.optional(),
    stop: LifecycleFunctionSchema.optional()
}).strict();
//# sourceMappingURL=module-setup-result-schema.js.map