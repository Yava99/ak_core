import { BaseSchema } from "../core/base-schema";
import { createIssue } from "../core/issue-factory";
import type { IParseContext } from "../core/parse-context";
import { FAIL, OK } from "../core/parse-status";
import type { InternalParseResult } from "../types/parse-result";
import { formatValue } from "../utils/format-value";

export class EnumSchema<TValues extends readonly [string, ...string[]]> extends BaseSchema<TValues[number]> {
  private readonly valuesSet: ReadonlySet<string>;

  public constructor(private readonly values: TValues) {
    super();
    this.valuesSet = new Set(values);
  }

  public getValues(): TValues {
    return this.values;
  }

  protected _parse(
    context: IParseContext,
    input: unknown
  ): InternalParseResult<TValues[number]> {
    if (typeof input !== "string") {
      context.issues.push(
        createIssue(
          context.path,
          "invalid_type",
          `Expected enum string, received ${formatValue(input)}`,
          {
            expected: `one of: ${this.values.join(", ")}`,
            received: input,
            metadata: {
              allowedValues: [...this.values]
            }
          }
        )
      );

      return FAIL;
    }

    if (!this.valuesSet.has(input)) {
      context.issues.push(
        createIssue(
          context.path,
          "invalid_enum_value",
          `Expected one of ${this.values.map((value) => formatValue(value)).join(", ")}, received ${formatValue(input)}`,
          {
            expected: `one of: ${this.values.join(", ")}`,
            received: input,
            metadata: {
              allowedValues: [...this.values]
            }
          }
        )
      );

      return FAIL;
    }

    return OK(input as TValues[number]);
  }
}