import { BaseSchema } from "./base-schema";
import { EffectsSchema } from "../schemas/effects-schema";
import { NullableSchema } from "../schemas/nullable-schema";
import { OptionalSchema } from "../schemas/optional-schema";
import { IParseContext } from "./parse-context";

declare module "./base-schema" {
  interface BaseSchema<TOutput, TInput = unknown> {
    optional(): OptionalSchema<TOutput, TInput>;
    nullable(): NullableSchema<TOutput, TInput>;
    refine(
      check: (value: TOutput) => boolean,
      message?: string
    ): EffectsSchema<TOutput, TInput>;
    transform<TNewOutput>(
      transform: (value: TOutput) => TNewOutput
    ): EffectsSchema<TNewOutput, TInput>;
    superRefine(
      handler: (value: TOutput, ctx: IParseContext) => void
    ): EffectsSchema<TOutput, TInput>;
    parseAsync(input: TInput): Promise<TOutput>;
    safeParseAsync(input: TInput): Promise<import("../types/parse-result").SafeParseResult<TOutput>>;

    refineAsync(
      check: (value: TOutput) => Promise<boolean>,
      message?: string
    ): EffectsSchema<TOutput, TInput>;

    transformAsync<TNewOutput>(
      transform: (value: TOutput) => Promise<TNewOutput>
    ): EffectsSchema<TNewOutput, TInput>;

    superRefineAsync(
      handler: (value: TOutput, ctx: IParseContext) => Promise<void>
    ): EffectsSchema<TOutput, TInput>;
  }
}

BaseSchema.prototype.optional = function <TOutput, TInput>(
  this: BaseSchema<TOutput, TInput>
): OptionalSchema<TOutput, TInput> {
  return new OptionalSchema(this);
};

BaseSchema.prototype.nullable = function <TOutput, TInput>(
  this: BaseSchema<TOutput, TInput>
): NullableSchema<TOutput, TInput> {
  return new NullableSchema(this);
};

BaseSchema.prototype.refine = function <TOutput, TInput>(
  this: BaseSchema<TOutput, TInput>,
  check: (value: TOutput) => boolean,
  message?: string
): EffectsSchema<TOutput, TInput> {
  return new EffectsSchema(this, [
    {
      type: "refine",
      check,
      message
    }
  ]);
};

BaseSchema.prototype.transform = function <TOutput, TInput, TNewOutput>(
  this: BaseSchema<TOutput, TInput>,
  transform: (value: TOutput) => TNewOutput
): EffectsSchema<TNewOutput, TInput> {
  return new EffectsSchema(this as BaseSchema<any, TInput>, [
    {
      type: "transform",
      transform
    }
  ]) as EffectsSchema<TNewOutput, TInput>;
};

BaseSchema.prototype.superRefine = function <
  TOutput,
  TInput
>(
  this: BaseSchema<TOutput, TInput>,
  handler: (value: TOutput, ctx: IParseContext) => void
): EffectsSchema<TOutput, TInput> {
  return new EffectsSchema(this, [
    {
      type: "superRefine",
      handler
    }
  ]);
};

BaseSchema.prototype.refineAsync = function (check, message) {
  return new EffectsSchema(this, [
    { type: "refineAsync", check, message }
  ]);
};

BaseSchema.prototype.transformAsync = function (transform) {
  return new EffectsSchema(this, [
    { type: "transformAsync", transform }
  ]);
};

BaseSchema.prototype.superRefineAsync = function (handler) {
  return new EffectsSchema(this, [
    { type: "superRefineAsync", handler }
  ]);
};