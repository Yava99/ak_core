import { BaseSchema } from "../core/base-schema";
import { createIssue } from "../core/issue-factory";
import type { IParseContext } from "../core/parse-context";
import { FAIL, OK } from "../core/parse-status";
import type { InternalParseResult } from "../types/parse-result";
import { formatValue } from "../utils/format-value";

export class FunctionSchema<
  TFunction extends (...args: any[]) => any = (...args: any[]) => any
> extends BaseSchema<TFunction, unknown> {
  protected _parse(
    context: IParseContext,
    input: unknown
  ): InternalParseResult<TFunction> {
    if (typeof input !== "function") {
      context.issues.push(
        createIssue(
          context.path,
          "invalid_type",
          `Expected function, received ${formatValue(input)}`,
          {
            expected: "function",
            received: input
          }
        )
      );

      return FAIL;
    }

    return OK(input as TFunction);
  }
}