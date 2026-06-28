import type { IParseContext } from "./parse-context";
import type {
  InternalParseResult,
  SafeParseResult
} from "../types/parse-result";
import { ValidationError } from "../errors/validation-error";

export abstract class BaseSchema<TOutput, TInput = unknown> {
  // =========================
  // SYNC
  // =========================

  public parse(input: TInput): TOutput {
    const result = this.safeParse(input);

    if (!result.success) {
      throw result.error;
    }

    return result.data;
  }

  public safeParse(input: TInput): SafeParseResult<TOutput> {
    const context: IParseContext = {
      path: [],
      issues: []
    };

    const result = this._parse(context, input);

    if (!result.success) {
      return {
        success: false,
        error: new ValidationError("Validation failed", context.issues)
      };
    }

    return {
      success: true,
      data: result.data
    };
  }

  public assert(input: TInput): void {
    const result = this.safeParse(input);

    if (!result.success) {
      throw result.error;
    }
  }

  // =========================
  // ASYNC
  // =========================

  public async parseAsync(input: TInput): Promise<TOutput> {
    const result = await this.safeParseAsync(input);

    if (!result.success) {
      throw result.error;
    }

    return result.data;
  }

  public async safeParseAsync(input: TInput): Promise<SafeParseResult<TOutput>> {
    const context: IParseContext = {
      path: [],
      issues: []
    };

    const result = await this._parseAsync(context, input);

    if (!result.success) {
      return {
        success: false,
        error: new ValidationError("Validation failed", context.issues)
      };
    }

    return {
      success: true,
      data: result.data
    };
  }

  // =========================
  // INTERNAL
  // =========================

  protected abstract _parse(
    context: IParseContext,
    input: unknown
  ): InternalParseResult<TOutput>;

  protected async _parseAsync(
    context: IParseContext,
    input: unknown
  ): Promise<InternalParseResult<TOutput>> {
    // fallback → sync
    return this._parse(context, input);
  }
}