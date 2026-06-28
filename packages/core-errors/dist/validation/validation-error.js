"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = void 0;
const app_error_1 = require("../base/app-error");
const error_codes_1 = require("../codes/error-codes");
class ValidationError extends app_error_1.AppError {
    constructor(message, details, cause) {
        super(message, error_codes_1.ERROR_CODES.VALIDATION_FAILED, details, cause);
    }
}
exports.ValidationError = ValidationError;
//# sourceMappingURL=validation-error.js.map