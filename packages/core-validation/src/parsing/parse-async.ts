import type { BaseSchema } from "../core/base-schema";

export async function parseAsync<TOutput>(
  schema: BaseSchema<TOutput, any>,
  input: unknown
): Promise<TOutput> {
  return schema.parseAsync(input);
}