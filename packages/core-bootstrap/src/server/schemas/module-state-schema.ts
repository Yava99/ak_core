import { schema, type BaseSchema } from "@fivem/core-validation";
import type { IModuleState } from "../types";
import { ModuleLifecycleStateSchema } from "./module-lifecycle-state-schema";

export const ModuleStateSchema: BaseSchema<IModuleState> = schema.object({
  name: schema.string().trim().min(1).regex(/^[a-z0-9-]+$/, "Invalid module name"),
  state: ModuleLifecycleStateSchema,
  dependencies: schema.array(
    schema.string().trim().min(1).regex(/^[a-z0-9-]+$/, "Invalid dependency module name")
  )
}).strict();