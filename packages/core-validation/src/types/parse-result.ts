import type { ValidationError } from "../errors/validation-error";

export type InternalParseSuccess<T> = {
  success: true;
  data: T;
};

export type InternalParseFailure = {
  success: false;
};

export type InternalParseResult<T> =
  | InternalParseSuccess<T>
  | InternalParseFailure;

export type SafeParseResult<T> =
  | { success: true; data: T }
  | { success: false; error: ValidationError };