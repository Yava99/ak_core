"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefinedServiceSchema = void 0;
const core_validation_1 = require("@fivem/core-validation");
exports.DefinedServiceSchema = core_validation_1.schema.object({
    name: core_validation_1.schema
        .string()
        .trim()
        .min(1)
        .regex(core_validation_1.SERVICE_NAME_PATTERN, "Invalid service name"),
    instance: core_validation_1.schema.unknown(),
    public: core_validation_1.schema.boolean().optional()
}).strict();
//# sourceMappingURL=defined-service-schema.js.map