"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfrastructureError = void 0;
const app_error_1 = require("../base/app-error");
const error_codes_1 = require("../codes/error-codes");
class InfrastructureError extends app_error_1.AppError {
    constructor(message, details, cause) {
        super(message, error_codes_1.ERROR_CODES.INFRASTRUCTURE_FAILURE, details, cause);
    }
}
exports.InfrastructureError = InfrastructureError;
//# sourceMappingURL=infrastructure-error.js.map