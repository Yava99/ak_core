"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError extends Error {
    constructor(message, code, details, cause) {
        super(message);
        this.name = new.target.name;
        this.code = code;
        this.details = details;
        this.cause = cause;
    }
}
exports.AppError = AppError;
//# sourceMappingURL=app-error.js.map