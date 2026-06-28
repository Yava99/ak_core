import { BaseSchema } from "../core/base-schema";
import type { IParseContext } from "../core/parse-context";
import type { InternalParseResult } from "../types/parse-result";
import { OK } from "../core/parse-status";

export class OptionalSchema<TOutput, TInput = unknown> extends BaseSchema<
  TOutput | undefined,
  TInput | undefined
> {
  public readonly __optionalBrand = true as const;

  public constructor(
    private readonly innerSchema: BaseSchema<TOutput, TInput>
  ) {
    super();
  }

  protected _parse(
    context: IParseContext,
    input: unknown
  ): InternalParseResult<TOutput | undefined> {
    if (input === undefined) {
      return OK(undefined);
    }

    return this.innerSchema["_parse"](context, input);
  }
}