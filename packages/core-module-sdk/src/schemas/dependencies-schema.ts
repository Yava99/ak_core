import {
  schema,
  type BaseSchema,
  MODULE_NAME_PATTERN
} from "@fivem/core-validation";

export const DependenciesSchema: BaseSchema<string[]> = schema.array(
  schema.string().trim().min(1).regex(MODULE_NAME_PATTERN, "Invalid dependency module name")
);