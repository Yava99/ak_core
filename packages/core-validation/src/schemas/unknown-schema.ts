import { BaseSchema } from "../core/base-schema";
import { OK } from "../core/parse-status";
import type { IParseContext } from "../core/parse-context";
import type { InternalParseResult } from "../types/parse-result";

export class UnknownSchema extends BaseSchema<unknown> {
  protected _parse(
    _context: IParseContext,
    input: unknown
  ): InternalParseResult<unknown> {
    return OK(input);
  }
}