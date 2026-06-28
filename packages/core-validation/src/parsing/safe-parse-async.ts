import type { BaseSchema } from "../core/base-schema";
import type { SafeParseResult } from "../types/parse-result";

export async function safeParseAsync<TOutput>(
  schema: BaseSchema<TOutput, any>,
  input: unknown
): Promise<SafeParseResult<TOutput>> {
  return schema.safeParseAsync(input);
}