import type { BaseSchema } from "../core/base-schema";

export type InputOf<TSchema extends BaseSchema<any, any>> =
  TSchema extends BaseSchema<any, infer TInput> ? TInput : never;