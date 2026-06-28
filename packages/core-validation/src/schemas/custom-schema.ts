import { BaseSchema } from "../core/base-schema";
import { createIssue } from "../core/issue-factory";
import type { IParseContext } from "../core/parse-context";
import { FAIL, OK } from "../core/parse-status";
import type { InternalParseResult } from "../types/parse-result";

export class CustomSchema<TOutput, TInput = unknown> extends BaseSchema<TOutput, TInput> {
  public constructor(
    private readonly check: (value: unknown) => value is TOutput,
    private readonly message: string
  ) {
    super();
  }

  protected _parse(
    context: IParseContext,
    input: unknown
  ): InternalParseResult<TOutput> {
    if (!this.check(input)) {
      context.issues.push(
        createIssue(
          context.path,
          "custom",
          this.message,
          {
            received: input
          }
        )
      );

      return FAIL;
    }

    return OK(input);
  }
}