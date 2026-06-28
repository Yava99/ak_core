import { schema, type BaseSchema } from "@fivem/core-validation";

export const QualifiedExportNameSchema: BaseSchema<string> = schema
  .string()
  .trim()
  .min(1)
  .refine(
    (value) =>
      /^[a-z0-9-]+\.[A-Za-z][A-Za-z0-9]*$/.test(value) ||
      /^[a-z0-9-]+\.service\.[a-z0-9-]+$/.test(value),
    "Invalid qualified export name"
  );