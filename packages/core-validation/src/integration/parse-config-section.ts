import type { BaseSchema } from "../core/base-schema";

export function parseConfigSection<TOutput, TInput = unknown>(
  schema: BaseSchema<TOutput, TInput>,
  config: TInput
): TOutput {
  return schema.parse(config);
}