import { schema, type BaseSchema } from "@fivem/core-validation";
import type { ExportValue } from "../types";

export const ExportValueSchema: BaseSchema<ExportValue> = schema.custom<ExportValue>(
  (value: unknown): value is ExportValue =>
    typeof value === "function" || value !== undefined,
  "Export value must be defined or be a function"
);