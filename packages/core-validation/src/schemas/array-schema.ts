import { BaseSchema } from "../core/base-schema";
import { createIssue } from "../core/issue-factory";
import type { IParseContext } from "../core/parse-context";
import { FAIL, OK } from "../core/parse-status";
import { popPath, pushPath } from "../core/schema-internal";
import type { InternalParseResult } from "../types/parse-result";
import { formatValue } from "../utils/format-value";

type ArrayConstraint =
  | {
      readonly kind: "min";
      readonly value: number;
      readonly message?: string;
    }
  | {
      readonly kind: "max";
      readonly value: number;
      readonly message?: string;
    }
  | {
      readonly kind: "length";
      readonly value: number;
      readonly message?: string;
    };

export class ArraySchema<TItemOutput, TItemInput = unknown> extends BaseSchema<
  TItemOutput[],
  TItemInput[]
> {
  private readonly itemSchema: BaseSchema<TItemOutput, TItemInput>;
  private readonly constraints: readonly ArrayConstraint[];

  public constructor(
    itemSchema: BaseSchema<TItemOutput, TItemInput>,
    options?: {
      constraints?: readonly ArrayConstraint[];
    }
  ) {
    super();
    this.itemSchema = itemSchema;
    this.constraints = options?.constraints ?? [];
  }

  public min(length: number, message?: string): ArraySchema<TItemOutput, TItemInput> {
    this.assertValidNonNegativeInteger(length, "min");

    return this.withConstraint({
      kind: "min",
      value: length,
      message
    });
  }

  public max(length: number, message?: string): ArraySchema<TItemOutput, TItemInput> {
    this.assertValidNonNegativeInteger(length, "max");

    return this.withConstraint({
      kind: "max",
      value: length,
      message
    });
  }

  public length(length: number, message?: string): ArraySchema<TItemOutput, TItemInput> {
    this.assertValidNonNegativeInteger(length, "length");

    return this.withConstraint({
      kind: "length",
      value: length,
      message
    });
  }

  public nonempty(message?: string): ArraySchema<TItemOutput, TItemInput> {
    return this.min(1, message ?? "Array must not be empty");
  }

  protected _parse(
    context: IParseContext,
    input: unknown
  ): InternalParseResult<TItemOutput[]> {
    if (!Array.isArray(input)) {
      context.issues.push(
        createIssue(
          context.path,
          "invalid_type",
          `Expected array, received ${formatValue(input)}`,
          {
            expected: "array",
            received: input
          }
        )
      );

      return FAIL;
    }

    const array = input as TItemInput[];

    // contraintes globales
    for (const constraint of this.constraints) {
      const result = this.applyConstraint(context, array, constraint);

      if (!result.success) {
        return FAIL;
      }
    }

    const output: TItemOutput[] = [];

    for (let i = 0; i < array.length; i++) {
      const item = array[i];

      pushPath(context, i);
      const result = this.itemSchema["_parse"](context, item);
      popPath(context);

      if (!result.success) {
        return FAIL;
      }

      output.push(result.data);
    }

    return OK(output);
  }

  private withConstraint(
    constraint: ArrayConstraint
  ): ArraySchema<TItemOutput, TItemInput> {
    return new ArraySchema(this.itemSchema, {
      constraints: [...this.constraints, constraint]
    });
  }

  private applyConstraint(
    context: IParseContext,
    array: unknown[],
    constraint: ArrayConstraint
  ): InternalParseResult<TItemOutput[]> {
    switch (constraint.kind) {
      case "min":
        return this.checkMin(context, array, constraint.value, constraint.message);

      case "max":
        return this.checkMax(context, array, constraint.value, constraint.message);

      case "length":
        return this.checkLength(context, array, constraint.value, constraint.message);

      default: {
        const exhaustiveCheck: never = constraint;
        throw new Error(`Unhandled array constraint: ${JSON.stringify(exhaustiveCheck)}`);
      }
    }
  }

  private checkMin(
    context: IParseContext,
    array: unknown[],
    min: number,
    message?: string
  ): InternalParseResult<TItemOutput[]> {
    if (array.length >= min) {
      return OK(array as TItemOutput[]);
    }

    context.issues.push(
      createIssue(
        context.path,
        "array_too_short",
        message ?? `Array must contain at least ${min} item(s)`,
        {
          expected: `length >= ${min}`,
          received: array,
          metadata: {
            minLength: min,
            actualLength: array.length
          }
        }
      )
    );

    return FAIL;
  }

  private checkMax(
    context: IParseContext,
    array: unknown[],
    max: number,
    message?: string
  ): InternalParseResult<TItemOutput[]> {
    if (array.length <= max) {
      return OK(array as TItemOutput[]);
    }

    context.issues.push(
      createIssue(
        context.path,
        "array_too_long",
        message ?? `Array must contain at most ${max} item(s)`,
        {
          expected: `length <= ${max}`,
          received: array,
          metadata: {
            maxLength: max,
            actualLength: array.length
          }
        }
      )
    );

    return FAIL;
  }

  private checkLength(
    context: IParseContext,
    array: unknown[],
    length: number,
    message?: string
  ): InternalParseResult<TItemOutput[]> {
    if (array.length === length) {
      return OK(array as TItemOutput[]);
    }

    const code =
      array.length < length ? "array_too_short" : "array_too_long";

    context.issues.push(
      createIssue(
        context.path,
        code,
        message ?? `Array must contain exactly ${length} item(s)`,
        {
          expected: `length === ${length}`,
          received: array,
          metadata: {
            expectedLength: length,
            actualLength: array.length
          }
        }
      )
    );

    return FAIL;
  }

  private assertValidNonNegativeInteger(value: number, method: string): void {
    if (!Number.isInteger(value) || value < 0) {
      throw new TypeError(`ArraySchema.${method} expected a non-negative integer`);
    }
  }
}