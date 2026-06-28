import { BaseSchema } from "../core/base-schema";
import { createIssue } from "../core/issue-factory";
import type { IParseContext } from "../core/parse-context";
import { FAIL, OK } from "../core/parse-status";
import type { InternalParseResult } from "../types/parse-result";
import { formatValue } from "../utils/format-value";

export class BooleanSchema extends BaseSchema<boolean> {
  protected _parse(
    context: IParseContext,
    input: unknown
  ): InternalParseResult<boolean> {
    if (typeof input !== "boolean") {
      context.issues.push(
        createIssue(
          context.path,
          "invalid_type",
          `Expected boolean, received ${formatValue(input)}`,
          {
            expected: "boolean",
            received: input
          }
        )
      );

      return FAIL;
    }

    return OK(input);
  }
}