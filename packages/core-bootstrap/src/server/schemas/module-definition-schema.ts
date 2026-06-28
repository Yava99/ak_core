import {
  schema,
  type BaseSchema,
  MODULE_NAME_PATTERN
} from "@fivem/core-validation";
import type { IModuleContext, IFrameworkModuleDefinition } from "../types";

const LifecycleFn = schema.function<
  (context: IModuleContext) => void | Promise<void>
>();

export const ModuleDefinitionSchema: BaseSchema<IFrameworkModuleDefinition> = schema.object({
  sdkName: schema
    .string()
    .trim()
    .min(1)
    .regex(MODULE_NAME_PATTERN, "Invalid sdk module name")
    .optional(),

  name: schema
    .string()
    .trim()
    .min(1)
    .regex(MODULE_NAME_PATTERN, "Invalid module name"),

  dependencies: schema
    .array(
      schema.string().trim().min(1).regex(MODULE_NAME_PATTERN, "Invalid dependency module name")
    )
    .optional(),

  register: LifecycleFn,
  start: LifecycleFn.optional(),
  stop: LifecycleFn.optional(),

  exports: schema
    .record(schema.string(), schema.unknown())
    .optional()
}).strict();