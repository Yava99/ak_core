import { BaseSchema } from "../core/base-schema";
import { createIssue } from "../core/issue-factory";
import type { IParseContext } from "../core/parse-context";
import { FAIL, OK } from "../core/parse-status";
import { popPath, pushPath } from "../core/schema-internal";
import type { InternalParseResult } from "../types/parse-result";
import { formatValue } from "../utils/format-value";
import { getArrayItem } from "../utils/get-array-item";

type TupleOutput<TSchemas extends readonly BaseSchema<any, any>[]> = {
  [K in keyof TSchemas]: TSchemas[K] extends BaseSchema<infer TOutput, any>
    ? TOutput
    : never;
};

type TupleInput<TSchemas extends readonly BaseSchema<any, any>[]> = {
  [K in keyof TSchemas]: TSchemas[K] extends BaseSchema<any, infer TInput>
    ? TInput
    : never;
};

export class TupleSchema<
  TSchemas extends readonly BaseSchema<any, any>[]
> extends BaseSchema<TupleOutput<TSchemas>, TupleInput<TSchemas>> {
  public constructor(private readonly schemas: TSchemas) {
    super();
  }

  protected _parse(
    context: IParseContext,
    input: unknown
  ): InternalParseResult<TupleOutput<TSchemas>> {
    if (!Array.isArray(input)) {
      context.issues.push(
        createIssue(
          context.path,
          "invalid_type",
          `Expected tuple (array), received ${formatValue(input)}`,
          {
            expected: "tuple",
            received: input
          }
        )
      );

      return FAIL;
    }

    const array = input as unknown[];

    if (array.length !== this.schemas.length) {
      context.issues.push(
        createIssue(
          context.path,
          "array_too_short",
          `Expected tuple length ${this.schemas.length}, received ${array.length}`,
          {
            expected: `length === ${this.schemas.length}`,
            received: array
          }
        )
      );

      return FAIL;
    }

    const output: unknown[] = [];

    for (let i = 0; i < this.schemas.length; i++) {
        const schema = getArrayItem(this.schemas, i);
        const value = array[i];

        pushPath(context, i);
        const result = schema["_parse"](context, value);
        popPath(context);

        if (!result.success) {
            return FAIL;
        }

        output.push(result.data);
    }

    return OK(output as TupleOutput<TSchemas>);
  }
}