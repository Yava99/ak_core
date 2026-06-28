import type { SchemaPath } from "./path";

export type ValidationIssueCode =
  | "invalid_type"
  | "required"
  | "string_too_short"
  | "string_too_long"
  | "string_invalid_format"
  | "string_invalid_starts_with"
  | "string_invalid_ends_with"
  | "string_invalid_includes"
  | "number_too_small"
  | "number_too_large"
  | "number_not_integer"
  | "number_not_finite"
  | "invalid_literal"
  | "invalid_enum_value"
  | "invalid_union"
  | "invalid_key"
  | "unrecognized_key"
  | "array_too_short"
  | "array_too_long"
  | "custom";

export interface IValidationIssue {
  path: SchemaPath;
  code: ValidationIssueCode;
  message: string;
  expected?: string;
  received?: unknown;
  metadata?: Record<string, unknown>;
}