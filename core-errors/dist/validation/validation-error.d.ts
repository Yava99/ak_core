import { AppError } from "../base/app-error";
import type { ErrorDetails } from "../types/error-details";
export declare class ValidationError extends AppError {
    constructor(message: string, details?: ErrorDetails, cause?: unknown);
}
