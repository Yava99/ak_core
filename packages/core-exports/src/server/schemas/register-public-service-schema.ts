import { schema, type BaseSchema } from "@fivem/core-validation";

export interface IRegisterPublicServiceInput {
  moduleName: string;
  serviceName: string;
  service: unknown | (() => unknown);
}

export const RegisterPublicServiceSchema: BaseSchema<IRegisterPublicServiceInput> = schema.object({
  moduleName: schema
    .string()
    .trim()
    .min(1)
    .regex(/^[a-z0-9-]+$/, "Invalid module name"),
  serviceName: schema
    .string()
    .trim()
    .min(1)
    .regex(/^[a-z0-9-]+$/, "Invalid service name"),
  service: schema.custom<unknown | (() => unknown)>(
    (value: unknown): value is unknown | (() => unknown) =>
      typeof value === "function" || value !== undefined,
    "Service value must be defined or be a function"
  )
}).strict();