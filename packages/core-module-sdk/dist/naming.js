"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertValidModuleName = assertValidModuleName;
exports.assertValidServiceName = assertValidServiceName;
exports.assertValidExportName = assertValidExportName;
exports.buildQualifiedServiceName = buildQualifiedServiceName;
exports.buildQualifiedPublicServiceExportName = buildQualifiedPublicServiceExportName;
const core_errors_1 = require("@fivem/core-errors");
const MODULE_NAME_PATTERN = /^[a-z0-9-]+$/;
const SERVICE_NAME_PATTERN = /^[a-z0-9-]+$/;
const EXPORT_NAME_PATTERN = /^[A-Za-z][A-Za-z0-9]*$/;
function assertValidModuleName(name) {
    if (!MODULE_NAME_PATTERN.test(name)) {
        throw new core_errors_1.ValidationError("Invalid module name", {
            value: name,
            expected: "lowercase letters, numbers, dashes"
        });
    }
}
function assertValidServiceName(name) {
    if (!SERVICE_NAME_PATTERN.test(name)) {
        throw new core_errors_1.ValidationError("Invalid service name", {
            value: name,
            expected: "lowercase letters, numbers, dashes"
        });
    }
}
function assertValidExportName(name) {
    if (!EXPORT_NAME_PATTERN.test(name)) {
        throw new core_errors_1.ValidationError("Invalid export name", {
            value: name,
            expected: "camelCase or PascalCase-like identifier"
        });
    }
}
function buildQualifiedServiceName(moduleName, serviceName) {
    return `${moduleName}.${serviceName}`;
}
function buildQualifiedPublicServiceExportName(moduleName, serviceName) {
    return `${moduleName}.service.${serviceName}`;
}
//# sourceMappingURL=naming.js.map