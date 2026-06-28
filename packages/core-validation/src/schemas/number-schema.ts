import { BaseSchema } from "../core/base-schema";
import { createIssue } from "../core/issue-factory";
import type { IParseContext } from "../core/parse-context";
import { FAIL, OK } from "../core/parse-status";
import type { InternalParseResult } from "../types/parse-result";
import { formatValue } from "../utils/format-value";

type NumberConstraint =
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
      readonly kind: "int";
      readonly message?: string;
    }
  | {
      readonly kind: "positive";
      readonly message?: string;
    }
  | {
      readonly kind: "nonnegative";
      readonly message?: string;
    }
  | {
      readonly kind: "negative";
      readonly message?: string;
    }
  | {
      readonly kind: "nonpositive";
      readonly message?: string;
    }
  | {
      readonly kind: "finite";
      readonly message?: string;
    }
  | {
      readonly kind: "safe";
      readonly message?: string;
    };

export class NumberSchema extends BaseSchema<number> {
  private readonly constraints: readonly NumberConstraint[];

  public constructor(options?: { constraints?: readonly NumberConstraint[] }) {
    super();
    this.constraints = options?.constraints ?? [];
  }

  public min(value: number, message?: string): NumberSchema {
    this.assertValidNumber(value, "min");

    return this.withConstraint({
      kind: "min",
      value,
      message
    });
  }

  public max(value: number, message?: string): NumberSchema {
    this.assertValidNumber(value, "max");

    return this.withConstraint({
      kind: "max",
      value,
      message
    });
  }

  public int(message?: string): NumberSchema {
    return this.withConstraint({
      kind: "int",
      message
    });
  }

  public positive(message?: string): NumberSchema {
    return this.withConstraint({
      kind: "positive",
      message
    });
  }

  public nonnegative(message?: string): NumberSchema {
    return this.withConstraint({
      kind: "nonnegative",
      message
    });
  }

  public negative(message?: string): NumberSchema {
    return this.withConstraint({
      kind: "negative",
      message
    });
  }

  public nonpositive(message?: string): NumberSchema {
    return this.withConstraint({
      kind: "nonpositive",
      message
    });
  }

  public finite(message?: string): NumberSchema {
    return this.withConstraint({
      kind: "finite",
      message
    });
  }

  public safe(message?: string): NumberSchema {
    return this.withConstraint({
      kind: "safe",
      message
    });
  }

  protected _parse(
    context: IParseContext,
    input: unknown
  ): InternalParseResult<number> {
    if (typeof input !== "number") {
      context.issues.push(
        createIssue(
          context.path,
          "invalid_type",
          `Expected number, received ${formatValue(input)}`,
          {
            expected: "number",
            received: input
          }
        )
      );

      return FAIL;
    }

    const value = input;

    for (const constraint of this.constraints) {
      const result = this.applyConstraint(context, value, constraint);

      if (!result.success) {
        return FAIL;
      }
    }

    return OK(value);
  }

  private withConstraint(constraint: NumberConstraint): NumberSchema {
    return new NumberSchema({
      constraints: [...this.constraints, constraint]
    });
  }

  private applyConstraint(
    context: IParseContext,
    value: number,
    constraint: NumberConstraint
  ): InternalParseResult<number> {
    switch (constraint.kind) {
      case "min":
        return this.checkMin(context, value, constraint.value, constraint.message);

      case "max":
        return this.checkMax(context, value, constraint.value, constraint.message);

      case "int":
        return this.checkInt(context, value, constraint.message);

      case "positive":
        return this.checkPositive(context, value, constraint.message);

      case "nonnegative":
        return this.checkNonNegative(context, value, constraint.message);

      case "negative":
        return this.checkNegative(context, value, constraint.message);

      case "nonpositive":
        return this.checkNonPositive(context, value, constraint.message);

      case "finite":
        return this.checkFinite(context, value, constraint.message);

      case "safe":
        return this.checkSafe(context, value, constraint.message);

      default: {
        const exhaustiveCheck: never = constraint;
        throw new Error(`Unhandled number constraint: ${JSON.stringify(exhaustiveCheck)}`);
      }
    }
  }

  private checkMin(
    context: IParseContext,
    value: number,
    min: number,
    message?: string
  ): InternalParseResult<number> {
    if (value >= min) return OK(value);

    context.issues.push(
      createIssue(
        context.path,
        "number_too_small",
        message ?? `Number must be >= ${min}`,
        {
          expected: `>= ${min}`,
          received: value
        }
      )
    );

    return FAIL;
  }

  private checkMax(
    context: IParseContext,
    value: number,
    max: number,
    message?: string
  ): InternalParseResult<number> {
    if (value <= max) return OK(value);

    context.issues.push(
      createIssue(
        context.path,
        "number_too_large",
        message ?? `Number must be <= ${max}`,
        {
          expected: `<= ${max}`,
          received: value
        }
      )
    );

    return FAIL;
  }

  private checkInt(
    context: IParseContext,
    value: number,
    message?: string
  ): InternalParseResult<number> {
    if (Number.isInteger(value)) return OK(value);

    context.issues.push(
      createIssue(
        context.path,
        "number_not_integer",
        message ?? "Expected integer",
        {
          expected: "integer",
          received: value
        }
      )
    );

    return FAIL;
  }

  private checkPositive(
    context: IParseContext,
    value: number,
    message?: string
  ): InternalParseResult<number> {
    if (value > 0) return OK(value);

    context.issues.push(
      createIssue(
        context.path,
        "number_too_small",
        message ?? "Expected positive number",
        {
          expected: "> 0",
          received: value
        }
      )
    );

    return FAIL;
  }

  private checkNonNegative(
    context: IParseContext,
    value: number,
    message?: string
  ): InternalParseResult<number> {
    if (value >= 0) return OK(value);

    context.issues.push(
      createIssue(
        context.path,
        "number_too_small",
        message ?? "Expected non-negative number",
        {
          expected: ">= 0",
          received: value
        }
      )
    );

    return FAIL;
  }

  private checkNegative(
    context: IParseContext,
    value: number,
    message?: string
  ): InternalParseResult<number> {
    if (value < 0) return OK(value);

    context.issues.push(
      createIssue(
        context.path,
        "number_too_large",
        message ?? "Expected negative number",
        {
          expected: "< 0",
          received: value
        }
      )
    );

    return FAIL;
  }

  private checkNonPositive(
    context: IParseContext,
    value: number,
    message?: string
  ): InternalParseResult<number> {
    if (value <= 0) return OK(value);

    context.issues.push(
      createIssue(
        context.path,
        "number_too_large",
        message ?? "Expected non-positive number",
        {
          expected: "<= 0",
          received: value
        }
      )
    );

    return FAIL;
  }

  private checkFinite(
    context: IParseContext,
    value: number,
    message?: string
  ): InternalParseResult<number> {
    if (Number.isFinite(value)) return OK(value);

    context.issues.push(
      createIssue(
        context.path,
        "number_not_finite",
        message ?? "Expected finite number",
        {
          expected: "finite number",
          received: value
        }
      )
    );

    return FAIL;
  }

  private checkSafe(
    context: IParseContext,
    value: number,
    message?: string
  ): InternalParseResult<number> {
    if (Number.isSafeInteger(value)) return OK(value);

    context.issues.push(
      createIssue(
        context.path,
        "number_not_integer",
        message ?? "Expected safe integer",
        {
          expected: "safe integer",
          received: value
        }
      )
    );

    return FAIL;
  }

  private assertValidNumber(value: number, method: string): void {
    if (typeof value !== "number" || Number.isNaN(value)) {
      throw new TypeError(`NumberSchema.${method} expected a valid number`);
    }
  }
}