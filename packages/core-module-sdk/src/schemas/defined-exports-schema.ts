import {
  schema,
  type BaseSchema,
  EXPORT_NAME_PATTERN
} from "@fivem/core-validation";
import type { IDefinedExports } from "../types";

const ExportValueSchema = schema.custom<unknown | (() => unknown)>(
  (value: unknown): value is unknown | (() => unknown) =>
    typeof value === "function" || value !== undefined,
  "Export value must be defined or be a function"
);

export const DefinedExportsSchema: BaseSchema<IDefinedExports> = schema.object({
  entries: schema.record(
    schema.string().regex(EXPORT_NAME_PATTERN, "Invalid export name"),
    ExportValueSchema
  )
}).strict();