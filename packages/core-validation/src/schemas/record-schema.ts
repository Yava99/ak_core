import { BaseSchema } from "../core/base-schema";
import { createIssue } from "../core/issue-factory";
import type { IParseContext } from "../core/parse-context";
import { FAIL, OK } from "../core/parse-status";
import { popPath, pushPath } from "../core/schema-internal";
import type { InternalParseResult } from "../types/parse-result";
import { formatValue } from "../utils/format-value";
import { getObjectKeys } from "../utils/get-object-keys";
import { isPlainObject } from "../utils/is-plain-object";

export class RecordSchema<
  TValueOutput,
  TValueInput = unknown,
  TKey extends string = string
> extends BaseSchema<
  Record<TKey, TValueOutput>,
  Record<string, TValueInput>
> {
  public constructor(
    private readonly keySchema: BaseSchema<TKey, string>,
    private readonly valueSchema: BaseSchema<TValueOutput, TValueInput>
  ) {
    super();
  }

  protected _parse(
    context: IParseContext,
    input: unknown
  ): InternalParseResult<Record<TKey, TValueOutput>> {
    if (!isPlainObject(input)) {
      context.issues.push(
        createIssue(
          context.path,
          "invalid_type",
          `Expected record object, received ${formatValue(input)}`,
          {
            expected: "object",
            received: input
          }
        )
      );

      return FAIL;
    }

    const source = input as Record<string, TValueInput>;
    const output: Record<string, TValueOutput> = {};

    for (const key of getObjectKeys(source)) {
      const rawValue = source[key];

      const keyContext: IParseContext = {
        path: [...context.path, key],
        issues: []
      };

      const keyResult = this.keySchema["_parse"](keyContext, key);

      if (!keyResult.success) {
        context.issues.push(
          createIssue(
            [...context.path, key],
            "invalid_key",
            `Invalid key ${formatValue(key)}`,
            {
              expected: "valid key",
              received: key,
              metadata: {
                keyIssues: keyContext.issues
              }
            }
          )
        );

        return FAIL;
      }

      const parsedKey = keyResult.data;

      pushPath(context, key);
      const valueResult = this.valueSchema["_parse"](context, rawValue);
      popPath(context);

      if (!valueResult.success) {
        return FAIL;
      }

      output[parsedKey] = valueResult.data;
    }

    return OK(output as Record<TKey, TValueOutput>);
  }
}