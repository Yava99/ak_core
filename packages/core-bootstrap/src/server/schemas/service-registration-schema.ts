import { schema, type BaseSchema } from "@fivem/core-validation";

export interface IServiceRegistrationInput {
  name: string;
  service: unknown;
}

export const ServiceRegistrationSchema: BaseSchema<IServiceRegistrationInput> = schema.object({
  name: schema.string().trim().min(1),
  service: schema.custom<unknown>(
    (value: unknown): value is unknown => value !== undefined,
    "Service value must be defined"
  )
}).strict();