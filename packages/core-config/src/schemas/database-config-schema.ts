import { schema, type BaseSchema } from "@fivem/core-validation";
import type { IDatabaseConfig } from "../server/public-api";

export const DatabaseConfigSchema: BaseSchema<IDatabaseConfig> = schema.object({
  host: schema.string().trim().min(1).max(255),
  port: schema.number().int().min(1).max(65535),
  user: schema.string().trim().min(1).max(255),
  password: schema.string(),
  database: schema.string().trim().min(1).max(255),
  connectionLimit: schema.number().int().min(1).max(100)
}).strict();