import type { BaseSchema } from "../core/base-schema";

export function parse<TOutput>(
  schema: BaseSchema<TOutput, any>,
  input: unknown
): TOutput {
  return schema.parse(input);
}