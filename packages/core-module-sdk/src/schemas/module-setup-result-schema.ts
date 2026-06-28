import {
  schema,
  type BaseSchema,
  EXPORT_NAME_PATTERN,
  SERVICE_NAME_PATTERN
} from "@fivem/core-validation";
import type { IDefinedExports, IDefinedService, IModuleSetupResult } from "../types";

const LifecycleFunctionSchema = schema.function<() => void | Promise<void>>();

const ServiceSchema: BaseSchema<IDefinedService> = schema.object({
  name: schema
    .string()
    .trim()
    .min(1)
    .regex(SERVICE_NAME_PATTERN, "Invalid service name"),
  instance: schema.unknown(),
  public: schema.boolean().optional()
}).strict();

const ExportValueSchema = schema.custom<unknown | (() => unknown)>(
  (value: unknown): value is unknown | (() => unknown) =>
    typeof value === "function" || value !== undefined,
  "Export value must be defined or be a function"
);

const DefinedExportsInlineSchema: BaseSchema<IDefinedExports> = schema.object({
  entries: schema.record(
    schema.string().regex(EXPORT_NAME_PATTERN, "Invalid export name"),
    ExportValueSchema
  )
}).strict();

export const ModuleSetupResultSchema: BaseSchema<IModuleSetupResult> = schema.object({
  services: schema.array(ServiceSchema).optional(),
  exports: DefinedExportsInlineSchema.optional(),
  start: LifecycleFunctionSchema.optional(),
  stop: LifecycleFunctionSchema.optional()
}).strict();