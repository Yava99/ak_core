import { schema, type BaseSchema } from "@fivem/core-validation";
import type { ModuleLifecycleState } from "../types";

export const ModuleLifecycleStateSchema: BaseSchema<ModuleLifecycleState> = schema.enum([
  "created",
  "registering",
  "registered",
  "starting",
  "started",
  "stopping",
  "stopped",
  "failed"
] as const);