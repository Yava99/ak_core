import type { BaseSchema } from "../core/base-schema";

export function parseDto<TOutput, TInput = unknown>(
  schema: BaseSchema<TOutput, TInput>,
  input: TInput
): TOutput {
  return schema.parse(input);
}