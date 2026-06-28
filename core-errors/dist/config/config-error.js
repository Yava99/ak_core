"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigError = void 0;
const app_error_1 = require("../base/app-error");
class ConfigError extends app_error_1.AppError {
    constructor(message, code, details, cause) {
        super(message, code, details, cause);
    }
}
exports.ConfigError = ConfigError;
//# sourceMappingURL=config-error.js.map