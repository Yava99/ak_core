import { schema, type BaseSchema } from "@fivem/core-validation";

export const ServiceExportNameSchema: BaseSchema<string> = schema
  .string()
  .trim()
  .min(1)
  .regex(/^[a-z0-9-]+\.service\.[a-z0-9-]+$/, "Invalid service export name");