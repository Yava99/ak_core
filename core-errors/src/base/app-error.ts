import type { ErrorCode } from "../codes/error-codes";
import type { ErrorDetails } from "../types/error-details";

export class AppError extends Error {
  public readonly code: ErrorCode;
  public readonly details?: ErrorDetails;
  public readonly cause?: unknown;

  public constructor(
    message: string,
    code: ErrorCode,
    details?: ErrorDetails,
    cause?: unknown
  ) {
    super(message);
    this.name = new.target.name;
    this.code = code;
    this.details = details;
    this.cause = cause;
  }
}