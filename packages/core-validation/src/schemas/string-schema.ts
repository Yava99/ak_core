import { BaseSchema } from "../core/base-schema";
import { createIssue } from "../core/issue-factory";
import type { IParseContext } from "../core/parse-context";
import { FAIL, OK } from "../core/parse-status";
import type { InternalParseResult } from "../types/parse-result";
import { formatValue } from "../utils/format-value";

type StringConstraint =
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
    }
  | {
      readonly kind: "regex";
      readonly regex: RegExp;
      readonly message?: string;
    }
  | {
      readonly kind: "startsWith";
      readonly value: string;
      readonly message?: string;
    }
  | {
      readonly kind: "endsWith";
      readonly value: string;
      readonly message?: string;
    }
  | {
      readonly kind: "includes";
      readonly value: string;
      readonly message?: string;
    };

export class StringSchema extends BaseSchema<string> {
  private readonly shouldTrim: boolean;
  private readonly constraints: readonly StringConstraint[];

  public constructor(
    options?: {
      shouldTrim?: boolean;
      constraints?: readonly StringConstraint[];
    }
  ) {
    super();
    this.shouldTrim = options?.shouldTrim ?? false;
    this.constraints = options?.constraints ?? [];
  }

  public trim(): StringSchema {
    return new StringSchema({
      shouldTrim: true,
      constraints: this.constraints
    });
  }

  public min(length: number, message?: string): StringSchema {
    this.assertValidNonNegativeInteger(length, "min");

    return this.withConstraint({
      kind: "min",
      value: length,
      message
    });
  }

  public max(length: number, message?: string): StringSchema {
    this.assertValidNonNegativeInteger(length, "max");

    return this.withConstraint({
      kind: "max",
      value: length,
      message
    });
  }

  public length(length: number, message?: string): StringSchema {
    this.assertValidNonNegativeInteger(length, "length");

    return this.withConstraint({
      kind: "length",
      value: length,
      message
    });
  }

  public nonempty(message?: string): StringSchema {
    return this.min(1, message ?? "String must not be empty");
  }

  public regex(pattern: RegExp, message?: string): StringSchema {
    if (!(pattern instanceof RegExp)) {
      throw new TypeError("StringSchema.regex expected a RegExp instance");
    }

    return this.withConstraint({
      kind: "regex",
      regex: pattern,
      message
    });
  }

  public startsWith(prefix: string, message?: string): StringSchema {
    if (prefix.length === 0) {
      throw new TypeError("StringSchema.startsWith expected a non-empty prefix");
    }

    return this.withConstraint({
      kind: "startsWith",
      value: prefix,
      message
    });
  }

  public endsWith(suffix: string, message?: string): StringSchema {
    if (suffix.length === 0) {
      throw new TypeError("StringSchema.endsWith expected a non-empty suffix");
    }

    return this.withConstraint({
      kind: "endsWith",
      value: suffix,
      message
    });
  }

  public includes(search: string, message?: string): StringSchema {
    if (search.length === 0) {
      throw new TypeError("StringSchema.includes expected a non-empty search value");
    }

    return this.withConstraint({
      kind: "includes",
      value: search,
      message
    });
  }

  protected _parse(
    context: IParseContext,
    input: unknown
  ): InternalParseResult<string> {
    if (typeof input !== "string") {
      context.issues.push(
        createIssue(
          context.path,
          "invalid_type",
          `Expected string, received ${formatValue(input)}`,
          {
            expected: "string",
            received: input
          }
        )
      );

      return FAIL;
    }

    const value = this.shouldTrim ? input.trim() : input;

    for (const constraint of this.constraints) {
      const result = this.applyConstraint(context, value, constraint);

      if (!result.success) {
        return FAIL;
      }
    }

    return OK(value);
  }

  private withConstraint(constraint: StringConstraint): StringSchema {
    return new StringSchema({
      shouldTrim: this.shouldTrim,
      constraints: [...this.constraints, constraint]
    });
  }

  private applyConstraint(
    context: IParseContext,
    value: string,
    constraint: StringConstraint
  ): InternalParseResult<string> {
    switch (constraint.kind) {
      case "min":
        return this.checkMin(context, value, constraint.value as number, constraint.message);

      case "max":
        return this.checkMax(context, value, constraint.value as number, constraint.message);

      case "length":
        return this.checkLength(context, value, constraint.value as number, constraint.message);

      case "regex":
        return this.checkRegex(context, value, constraint.regex as RegExp, constraint.message);

      case "startsWith":
        return this.checkStartsWith(context, value, constraint.value as string, constraint.message);

      case "endsWith":
        return this.checkEndsWith(context, value, constraint.value as string, constraint.message);

      case "includes":
        return this.checkIncludes(context, value, constraint.value as string, constraint.message);

      default: {
        const exhaustiveCheck: never = constraint;
        throw new Error(`Unhandled string constraint: ${JSON.stringify(exhaustiveCheck)}`);
      }
    }
  }

  private checkMin(
    context: IParseContext,
    value: string,
    minLength: number,
    message?: string
  ): InternalParseResult<string> {
    if (value.length >= minLength) {
      return OK(value);
    }

    context.issues.push(
      createIssue(
        context.path,
        "string_too_short",
        message ?? `String must contain at least ${minLength} character(s)`,
        {
          expected: `length >= ${minLength}`,
          received: value,
          metadata: {
            minLength,
            actualLength: value.length
          }
        }
      )
    );

    return FAIL;
  }

  private checkMax(
    context: IParseContext,
    value: string,
    maxLength: number,
    message?: string
  ): InternalParseResult<string> {
    if (value.length <= maxLength) {
      return OK(value);
    }

    context.issues.push(
      createIssue(
        context.path,
        "string_too_long",
        message ?? `String must contain at most ${maxLength} character(s)`,
        {
          expected: `length <= ${maxLength}`,
          received: value,
          metadata: {
            maxLength,
            actualLength: value.length
          }
        }
      )
    );

    return FAIL;
  }

  private checkLength(
    context: IParseContext,
    value: string,
    exactLength: number,
    message?: string
  ): InternalParseResult<string> {
    if (value.length === exactLength) {
      return OK(value);
    }

    const code = value.length < exactLength ? "string_too_short" : "string_too_long";

    context.issues.push(
      createIssue(
        context.path,
        code,
        message ?? `String must contain exactly ${exactLength} character(s)`,
        {
          expected: `length === ${exactLength}`,
          received: value,
          metadata: {
            exactLength,
            actualLength: value.length
          }
        }
      )
    );

    return FAIL;
  }

  private checkRegex(
    context: IParseContext,
    value: string,
    pattern: RegExp,
    message?: string
  ): InternalParseResult<string> {
    pattern.lastIndex = 0;

    if (pattern.test(value)) {
      return OK(value);
    }

    context.issues.push(
      createIssue(
        context.path,
        "string_invalid_format",
        message ?? `String does not match required pattern ${pattern.toString()}`,
        {
          expected: pattern.toString(),
          received: value,
          metadata: {
            pattern: pattern.toString()
          }
        }
      )
    );

    return FAIL;
  }

  private checkStartsWith(
    context: IParseContext,
    value: string,
    prefix: string,
    message?: string
  ): InternalParseResult<string> {
    if (value.startsWith(prefix)) {
      return OK(value);
    }

    context.issues.push(
      createIssue(
        context.path,
        "string_invalid_starts_with",
        message ?? `String must start with ${formatValue(prefix)}`,
        {
          expected: `startsWith(${prefix})`,
          received: value,
          metadata: {
            prefix
          }
        }
      )
    );

    return FAIL;
  }

  private checkEndsWith(
    context: IParseContext,
    value: string,
    suffix: string,
    message?: string
  ): InternalParseResult<string> {
    if (value.endsWith(suffix)) {
      return OK(value);
    }

    context.issues.push(
      createIssue(
        context.path,
        "string_invalid_ends_with",
        message ?? `String must end with ${formatValue(suffix)}`,
        {
          expected: `endsWith(${suffix})`,
          received: value,
          metadata: {
            suffix
          }
        }
      )
    );

    return FAIL;
  }

  private checkIncludes(
    context: IParseContext,
    value: string,
    search: string,
    message?: string
  ): InternalParseResult<string> {
    if (value.includes(search)) {
      return OK(value);
    }

    context.issues.push(
      createIssue(
        context.path,
        "string_invalid_includes",
        message ?? `String must include ${formatValue(search)}`,
        {
          expected: `includes(${search})`,
          received: value,
          metadata: {
            search
          }
        }
      )
    );

    return FAIL;
  }

  private assertValidNonNegativeInteger(value: number, methodName: string): void {
    if (!Number.isInteger(value) || value < 0) {
      throw new TypeError(`StringSchema.${methodName} expected a non-negative integer`);
    }
  }
}