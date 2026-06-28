"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainError = void 0;
const app_error_1 = require("../base/app-error");
const error_codes_1 = require("../codes/error-codes");
class DomainError extends app_error_1.AppError {
    constructor(message, details, cause) {
        super(message, error_codes_1.ERROR_CODES.DOMAIN_RULE_VIOLATION, details, cause);
    }
}
exports.DomainError = DomainError;
//# sourceMappingURL=domain-error.js.map