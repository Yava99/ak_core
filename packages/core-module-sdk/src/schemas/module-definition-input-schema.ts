import {
  schema,
  type BaseSchema,
  MODULE_NAME_PATTERN
} from "@fivem/core-validation";
import type {
  IModuleSdkContext,
  IModuleSdkDefinitionInput,
  IModuleSetupResult
} from "../types";

const SetupFunctionSchema = schema.function<
  (context: IModuleSdkContext) => IModuleSetupResult | Promise<IModuleSetupResult>
>();

export const ModuleDefinitionInputSchema: BaseSchema<IModuleSdkDefinitionInput> = schema.object({
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
  setup: SetupFunctionSchema
}).strict();