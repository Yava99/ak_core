import {
  schema,
  type BaseSchema,
  SERVICE_NAME_PATTERN
} from "@fivem/core-validation";
import type { IDefinedService } from "../types";

export const DefinedServiceSchema: BaseSchema<IDefinedService> = schema.object({
  name: schema
    .string()
    .trim()
    .min(1)
    .regex(SERVICE_NAME_PATTERN, "Invalid service name"),
  instance: schema.unknown(),
  public: schema.boolean().optional()
}).strict();