import { BaseSchema } from "../core/base-schema";
import { createIssue } from "../core/issue-factory";
import type { IParseContext } from "../core/parse-context";
import { FAIL } from "../core/parse-status";
import type { InternalParseResult } from "../types/parse-result";
import { formatValue } from "../utils/format-value";

export class NeverSchema extends BaseSchema<never> {
  protected _parse(
    context: IParseContext,
    input: unknown
  ): InternalParseResult<never> {
    context.issues.push(
      createIssue(
        context.path,
        "invalid_type",
        `Expected never, received ${formatValue(input)}`,
        {
          expected: "never",
          received: input
        }
      )
    );

    return FAIL;
  }
}