import {
  schema,
  type BaseSchema
} from "@fivem/core-validation";
import type { ExportValue } from "../types";
import { assertValidQualifiedExportName } from "../naming";

export const ExportValueSchema: BaseSchema<ExportValue> = schema.custom<ExportValue>(
  (value: unknown): value is ExportValue =>
    typeof value === "function" || value !== undefined,
  "Export value must be defined or be a function"
);

export const QualifiedExportNameSchema: BaseSchema<string> = schema.string()
  .refine(
    (value) => {
      try {
        assertValidQualifiedExportName(value);
        return true;
      } catch {
        return false;
      }
    },
    "Invalid qualified export name"
  );