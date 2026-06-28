"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineModule = defineModule;
const module_factory_1 = require("./module-factory");
const validate_1 = require("./validate");
function defineModule(input) {
    return (0, module_factory_1.createModuleDefinition)((0, validate_1.validateModuleDefinitionInput)(input));
}
//# sourceMappingURL=define-module.js.map