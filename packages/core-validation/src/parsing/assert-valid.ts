import type { BaseSchema } from "../core/base-schema";

export function assertValid<TOutput>(
  schema: BaseSchema<TOutput, any>,
  input: unknown
): void {
  schema.assert(input);
}