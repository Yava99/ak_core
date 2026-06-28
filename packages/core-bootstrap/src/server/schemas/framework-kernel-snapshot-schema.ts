import { schema, type BaseSchema } from "@fivem/core-validation";
import type { IFrameworkKernelSnapshot } from "../types";
import { ModuleStateSchema } from "./module-state-schema";

export const FrameworkKernelSnapshotSchema: BaseSchema<IFrameworkKernelSnapshot> = schema.object({
  services: schema.array(schema.string().trim().min(1)),
  moduleStates: schema.array(ModuleStateSchema),
  registeredModules: schema.array(
    schema.string().trim().min(1).regex(/^[a-z0-9-]+$/, "Invalid module name")
  )
}).strict();