import type { IValidationIssue, ValidationIssueCode } from "../types/issues";
import type { SchemaPath } from "../types/path";

export function createIssue(
  path: SchemaPath,
  code: ValidationIssueCode,
  message: string,
  options?: {
    expected?: string;
    received?: unknown;
    metadata?: Record<string, unknown>;
  }
): IValidationIssue {
  return {
    path: [...path],
    code,
    message,
    expected: options?.expected,
    received: options?.received,
    metadata: options?.metadata
  };
}