import { BaseSchema } from "../core/base-schema";
import { createIssue } from "../core/issue-factory";
import type { IParseContext } from "../core/parse-context";
import { FAIL, OK } from "../core/parse-status";
import type { InternalParseResult } from "../types/parse-result";

export type Effect =
  | {
      type: "refine";
      check: (value: any) => boolean;
      message?: string;
    }
  | {
      type: "refineAsync";
      check: (value: any) => Promise<boolean>;
      message?: string;
    }
  | {
      type: "transform";
      transform: (value: any) => any;
    }
  | {
      type: "transformAsync";
      transform: (value: any) => Promise<any>;
    }
  | {
      type: "superRefine";
      handler: (value: any, ctx: IParseContext) => void;
    }
  | {
      type: "superRefineAsync";
      handler: (value: any, ctx: IParseContext) => Promise<void>;
    };

export class EffectsSchema<TOutput, TInput = unknown> extends BaseSchema<
  TOutput,
  TInput
> {
  public constructor(
    private readonly baseSchema: BaseSchema<any, TInput>,
    private readonly effects: readonly Effect[]
  ) {
    super();
  }

  // =========================
  // SYNC
  // =========================

  protected _parse(
    context: IParseContext,
    input: unknown
  ): InternalParseResult<TOutput> {
    const baseResult = this.baseSchema["_parse"](context, input);

    if (!baseResult.success) {
      return FAIL;
    }

    let value: unknown = baseResult.data;

    for (const effect of this.effects) {
      if (effect.type === "refine") {
        if (!effect.check(value)) {
          context.issues.push(
            createIssue(context.path, "custom", effect.message ?? "Validation failed")
          );
          return FAIL;
        }
        continue;
      }

      if (effect.type === "transform") {
        value = effect.transform(value);
        continue;
      }

      if (effect.type === "superRefine") {
        effect.handler(value, context);

        if (context.issues.length > 0) {
          return FAIL;
        }

        continue;
      }

      // ignore async in sync mode
    }

    return OK(value as TOutput);
  }

  // =========================
  // ASYNC
  // =========================

  protected override async _parseAsync(
    context: IParseContext,
    input: unknown
  ): Promise<InternalParseResult<TOutput>> {
    const baseResult = await this.baseSchema["_parseAsync"](context, input);

    if (!baseResult.success) {
      return FAIL;
    }

    let value: unknown = baseResult.data;

    for (const effect of this.effects) {
      if (effect.type === "refine") {
        if (!effect.check(value)) {
          context.issues.push(
            createIssue(context.path, "custom", effect.message ?? "Validation failed")
          );
          return FAIL;
        }
        continue;
      }

      if (effect.type === "refineAsync") {
        if (!(await effect.check(value))) {
          context.issues.push(
            createIssue(context.path, "custom", effect.message ?? "Validation failed")
          );
          return FAIL;
        }
        continue;
      }

      if (effect.type === "transform") {
        value = effect.transform(value);
        continue;
      }

      if (effect.type === "transformAsync") {
        value = await effect.transform(value);
        continue;
      }

      if (effect.type === "superRefine") {
        effect.handler(value, context);
        if (context.issues.length > 0) {
          return FAIL;
        }
        continue;
      }

      if (effect.type === "superRefineAsync") {
        await effect.handler(value, context);
        if (context.issues.length > 0) {
          return FAIL;
        }
      }
    }

    return OK(value as TOutput);
  }

  // =========================
  // API
  // =========================

  public refine(
    check: (value: TOutput) => boolean,
    message?: string
  ): EffectsSchema<TOutput, TInput> {
    return new EffectsSchema(this.baseSchema, [
      ...this.effects,
      { type: "refine", check, message }
    ]);
  }

  public refineAsync(
    check: (value: TOutput) => Promise<boolean>,
    message?: string
  ): EffectsSchema<TOutput, TInput> {
    return new EffectsSchema(this.baseSchema, [
      ...this.effects,
      { type: "refineAsync", check, message }
    ]);
  }

  public transform<TNewOutput>(
    transform: (value: TOutput) => TNewOutput
  ): EffectsSchema<TNewOutput, TInput> {
    return new EffectsSchema(this.baseSchema, [
      ...this.effects,
      { type: "transform", transform }
    ]) as EffectsSchema<TNewOutput, TInput>;
  }

  public transformAsync<TNewOutput>(
    transform: (value: TOutput) => Promise<TNewOutput>
  ): EffectsSchema<TNewOutput, TInput> {
    return new EffectsSchema(this.baseSchema, [
      ...this.effects,
      { type: "transformAsync", transform }
    ]) as EffectsSchema<TNewOutput, TInput>;
  }

  public superRefine(
    handler: (value: TOutput, ctx: IParseContext) => void
  ): EffectsSchema<TOutput, TInput> {
    return new EffectsSchema(this.baseSchema, [
      ...this.effects,
      { type: "superRefine", handler }
    ]);
  }

  public superRefineAsync(
    handler: (value: TOutput, ctx: IParseContext) => Promise<void>
  ): EffectsSchema<TOutput, TInput> {
    return new EffectsSchema(this.baseSchema, [
      ...this.effects,
      { type: "superRefineAsync", handler }
    ]);
  }
}