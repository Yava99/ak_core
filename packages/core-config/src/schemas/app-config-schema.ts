import { schema, type BaseSchema } from "@fivem/core-validation";
import type { IAppConfig } from "../server/public-api";
import { DatabaseConfigSchema } from "./database-config-schema";
import { ModulesConfigSchema } from "./modules-config-schema";
import { ServerConfigSchema } from "./server-config-schema";

export const AppConfigSchema: BaseSchema<IAppConfig> = schema.object({
  server: ServerConfigSchema,
  database: DatabaseConfigSchema,
  modules: ModulesConfigSchema
}).strict();