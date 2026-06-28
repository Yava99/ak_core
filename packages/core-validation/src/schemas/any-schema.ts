import { BaseSchema } from "../core/base-schema";
import { OK } from "../core/parse-status";
import type { IParseContext } from "../core/parse-context";
import type { InternalParseResult } from "../types/parse-result";

export class AnySchema extends BaseSchema<any> {
  protected _parse(
    _context: IParseContext,
    input: unknown
  ): InternalParseResult<any> {
    return OK(input);
  }
}