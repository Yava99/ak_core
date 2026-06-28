import { schema, type BaseSchema } from "@fivem/core-validation";

export const CustomExportNameSchema: BaseSchema<string> = schema
  .string()
  .trim()
  .min(1)
  .regex(/^[a-z0-9-]+\.[A-Za-z][A-Za-z0-9]*$/, "Invalid custom export name");