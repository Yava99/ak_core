import { schema, type BaseSchema } from "@fivem/core-validation";

export interface IRegisterModuleExportInput {
  moduleName: string;
  exportName: string;
  value: unknown | (() => unknown);
}

export const RegisterModuleExportSchema: BaseSchema<IRegisterModuleExportInput> = schema.object({
  moduleName: schema
    .string()
    .trim()
    .min(1)
    .regex(/^[a-z0-9-]+$/, "Invalid module name"),
  exportName: schema
    .string()
    .trim()
    .min(1)
    .regex(/^[A-Za-z][A-Za-z0-9]*$/, "Invalid export name"),
  value: schema.custom<unknown | (() => unknown)>(
    (value: unknown): value is unknown | (() => unknown) =>
      typeof value === "function" || value !== undefined,
    "Export value must be defined or be a function"
  )
}).strict();