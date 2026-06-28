import type { BaseSchema } from "../core/base-schema";
import type { SafeParseResult } from "../types/parse-result";

export function safeParse<TOutput>(
  schema: BaseSchema<TOutput, any>,
  input: unknown
): SafeParseResult<TOutput> {
  return schema.safeParse(input);
}