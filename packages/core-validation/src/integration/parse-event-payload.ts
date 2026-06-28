import type { BaseSchema } from "../core/base-schema";

export function parseEventPayload<TOutput, TInput = unknown>(
  schema: BaseSchema<TOutput, TInput>,
  payload: TInput
): TOutput {
  return schema.parse(payload);
}