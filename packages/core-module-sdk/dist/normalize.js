"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeModuleInput = normalizeModuleInput;
exports.normalizeServices = normalizeServices;
exports.normalizeExports = normalizeExports;
const naming_1 = require("./naming");
function normalizeModuleInput(moduleName) {
    (0, naming_1.assertValidModuleName)(moduleName);
}
function normalizeServices(services) {
    if (!services) {
        return [];
    }
    for (const service of services) {
        (0, naming_1.assertValidServiceName)(service.name);
    }
    return services;
}
function normalizeExports(exportsDefinition) {
    if (!exportsDefinition) {
        return {};
    }
    for (const exportName of Object.keys(exportsDefinition.entries)) {
        (0, naming_1.assertValidExportName)(exportName);
    }
    return exportsDefinition.entries;
}
//# sourceMappingURL=normalize.js.map