import { AppError } from "../base/app-error";
import { ERROR_CODES } from "../codes/error-codes";
import type { ErrorDetails } from "../types/error-details";

export class InfrastructureError extends AppError {
  public constructor(message: string, details?: ErrorDetails, cause?: unknown) {
    super(message, ERROR_CODES.INFRASTRUCTURE_FAILURE, details, cause);
  }
}