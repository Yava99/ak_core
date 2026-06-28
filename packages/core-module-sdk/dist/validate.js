"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDependencies = validateDependencies;
exports.validateDefinedService = validateDefinedService;
exports.validateDefinedExports = validateDefinedExports;
exports.validateModuleDefinitionInput = validateModuleDefinitionInput;
exports.validateModuleSetupResult = validateModuleSetupResult;
const core_validation_1 = require("@fivem/core-validation");
const defined_exports_schema_1 = require("./schemas/defined-exports-schema");
const defined_service_schema_1 = require("./schemas/defined-service-schema");
const dependencies_schema_1 = require("./schemas/dependencies-schema");
const module_definition_input_schema_1 = require("./schemas/module-definition-input-schema");
const module_setup_result_schema_1 = require("./schemas/module-setup-result-schema");
function validateDependencies(input) {
    return (0, core_validation_1.parseDto)(dependencies_schema_1.DependenciesSchema, input);
}
function validateDefinedService(input) {
    return (0, core_validation_1.parseDto)(defined_service_schema_1.DefinedServiceSchema, input);
}
function validateDefinedExports(input) {
    return (0, core_validation_1.parseDto)(defined_exports_schema_1.DefinedExportsSchema, input);
}
function validateModuleDefinitionInput(input) {
    return (0, core_validation_1.parseDto)(module_definition_input_schema_1.ModuleDefinitionInputSchema, input);
}
function validateModuleSetupResult(input) {
    return (0, core_validation_1.parseDto)(module_setup_result_schema_1.ModuleSetupResultSchema, input);
}
//# sourceMappingURL=validate.js.map