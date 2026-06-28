import type { BaseSchema } from "../core/base-schema";

export type OutputOf<TSchema extends BaseSchema<any, any>> =
  TSchema extends BaseSchema<infer TOutput, any> ? TOutput : never;