import type { BaseSchema } from "../core/base-schema";

export type ObjectShape = Record<string, BaseSchema<any, any>>;

export type OutputObjectFromShape<TShape extends ObjectShape> = {
  [K in keyof TShape]: TShape[K] extends BaseSchema<infer TOutput, any>
    ? TOutput
    : never;
};

export type InputObjectFromShape<TShape extends ObjectShape> = {
  [K in keyof TShape]: TShape[K] extends BaseSchema<any, infer TInput>
    ? TInput
    : never;
};

export type PartialShape<TShape extends ObjectShape> = {
  [K in keyof TShape]?: TShape[K];
};