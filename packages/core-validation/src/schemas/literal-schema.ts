import { BaseSchema } from "../core/base-schema";
import { createIssue } from "../core/issue-factory";
import type { IParseContext } from "../core/parse-context";
import { FAIL, OK } from "../core/parse-status";
import type { InternalParseResult } from "../types/parse-result";
import { formatValue } from "../utils/format-value";

export type LiteralValue = string | number | boolean | null;

export class LiteralSchema<TValue extends LiteralValue> extends BaseSchema<TValue> {
  public constructor(private readonly literal: TValue) {
    super();
  }

  public getValue(): TValue {
    return this.literal;
  }

  protected _parse(
    context: IParseContext,
    input: unknown
  ): InternalParseResult<TValue> {
    if (input !== this.literal) {
      context.issues.push(
        createIssue(
          context.path,
          "invalid_literal",
          `Expected literal ${formatValue(this.literal)}, received ${formatValue(input)}`,
          {
            expected: formatValue(this.literal),
            received: input,
            metadata: {
              literal: this.literal
            }
          }
        )
      );

      return FAIL;
    }

    return OK(this.literal);
  }
}