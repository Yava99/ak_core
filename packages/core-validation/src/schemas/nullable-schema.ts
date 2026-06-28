import { BaseSchema } from "../core/base-schema";
import type { IParseContext } from "../core/parse-context";
import type { InternalParseResult } from "../types/parse-result";
import { OK } from "../core/parse-status";

export class NullableSchema<TOutput, TInput = unknown> extends BaseSchema<
  TOutput | null,
  TInput | null
> {
  public constructor(
    private readonly innerSchema: BaseSchema<TOutput, TInput>
  ) {
    super();
  }

  protected _parse(
    context: IParseContext,
    input: unknown
  ): InternalParseResult<TOutput | null> {
    if (input === null) {
      return OK(null);
    }

    return this.innerSchema["_parse"](context, input);
  }
}