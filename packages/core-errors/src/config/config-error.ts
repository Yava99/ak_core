import { AppError } from "../base/app-error";
import { ERROR_CODES } from "../codes/error-codes";
import type { ErrorDetails } from "../types/error-details";

export class ConfigError extends AppError {
  public constructor(
    message: string,
    code:
      | typeof ERROR_CODES.CONFIG_MISSING
      | typeof ERROR_CODES.CONFIG_INVALID,
    details?: ErrorDetails,
    cause?: unknown
  ) {
    super(message, code, details, cause);
  }
}