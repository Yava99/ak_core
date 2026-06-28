import { BaseSchema } from "../core/base-schema";
import type { IParseContext } from "../core/parse-context";
import type { InternalParseResult } from "../types/parse-result";

export class LazySchema<TOutput, TInput = unknown> extends BaseSchema<TOutput, TInput> {
  public constructor(
    private readonly getter: () => BaseSchema<TOutput, TInput>
  ) {
    super();
  }

  protected _parse(
    context: IParseContext,
    input: unknown
  ): InternalParseResult<TOutput> {
    const schema = this.getter();
    return schema["_parse"](context, input);
  }
}