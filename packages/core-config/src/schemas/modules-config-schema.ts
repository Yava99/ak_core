import { schema, type BaseSchema } from "@fivem/core-validation";
import type { IModulesConfig } from "../server/public-api";

export const ModulesConfigSchema: BaseSchema<IModulesConfig> = schema.object({
  coreDb: schema.object({
    enabled: schema.boolean()
  }).strict(),

  coreEvents: schema.object({
    enabled: schema.boolean()
  }).strict()
}).strict();