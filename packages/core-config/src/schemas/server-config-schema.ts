import { schema, type BaseSchema } from "@fivem/core-validation";
import type { IServerCoreConfig } from "../server/public-api";

export const ServerConfigSchema: BaseSchema<IServerCoreConfig> = schema.object({
  name: schema.string().trim().min(1).max(100),
  locale: schema.string().trim().min(2).max(16),
  maxClients: schema.number().int().min(1).max(2048),
  environment: schema.enum([
    "development",
    "staging",
    "production"
  ] as const)
}).strict();