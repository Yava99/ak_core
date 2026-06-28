import type { ErrorCode } from "../codes/error-codes";
import type { ErrorDetails } from "../types/error-details";
export declare class AppError extends Error {
    readonly code: ErrorCode;
    readonly details?: ErrorDetails;
    readonly cause?: unknown;
    constructor(message: string, code: ErrorCode, details?: ErrorDetails, cause?: unknown);
}
