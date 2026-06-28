import type { BaseSchema } from "../core/base-schema";
import type { ObjectShape } from "../types/object-shape";
import { AnySchema } from "./any-schema";
import { ArraySchema } from "./array-schema";
import { BooleanSchema } from "./boolean-schema";
import { CustomSchema } from "./custom-schema";
import { EnumSchema } from "./enum-schema";
import { LiteralSchema, type LiteralValue } from "./literal-schema";
import { NeverSchema } from "./never-schema";
import { NullableSchema } from "./nullable-schema";
import { NumberSchema } from "./number-schema";
import { ObjectSchema } from "./object-schema";
import { OptionalSchema } from "./optional-schema";
import { RecordSchema } from "./record-schema";
import { StringSchema } from "./string-schema";
import { TupleSchema } from "./tuple-schema";
import { UnionSchema } from "./union-schema";
import { UnknownSchema } from "./unknown-schema";
import { FunctionSchema } from "./function-schema";
import { LazySchema } from "./lazy-schema";

const defaultRecordKeySchema = new StringSchema();

function recordFactory<TOutput, TInput = unknown>(
  valueSchema: BaseSchema<TOutput, TInput>
): RecordSchema<TOutput, TInput, string>;
function recordFactory<TKey extends string, TOutput, TInput = unknown>(
  keySchema: BaseSchema<TKey, string>,
  valueSchema: BaseSchema<TOutput, TInput>
): RecordSchema<TOutput, TInput, TKey>;
function recordFactory<TKey extends string, TOutput, TInput = unknown>(
  keyOrValueSchema: BaseSchema<TKey, string> | BaseSchema<TOutput, TInput>,
  maybeValueSchema?: BaseSchema<TOutput, TInput>
): RecordSchema<TOutput, TInput, string> | RecordSchema<TOutput, TInput, TKey> {
  if (maybeValueSchema) {
    return new RecordSchema(
      keyOrValueSchema as BaseSchema<TKey, string>,
      maybeValueSchema
    );
  }

  return new RecordSchema(
    defaultRecordKeySchema,
    keyOrValueSchema as BaseSchema<TOutput, TInput>
  );
}

export const schema = {
  string(): StringSchema {
    return new StringSchema();
  },

  number(): NumberSchema {
    return new NumberSchema();
  },

  boolean(): BooleanSchema {
    return new BooleanSchema();
  },

  any(): AnySchema {
    return new AnySchema();
  },

  unknown(): UnknownSchema {
    return new UnknownSchema();
  },

  never(): NeverSchema {
    return new NeverSchema();
  },

  literal<TValue extends LiteralValue>(value: TValue): LiteralSchema<TValue> {
    return new LiteralSchema(value);
  },

  enum<TValues extends readonly [string, ...string[]]>(
    values: TValues
  ): EnumSchema<TValues> {
    return new EnumSchema(values);
  },

  object<TShape extends ObjectShape>(shape: TShape): ObjectSchema<TShape> {
    return new ObjectSchema(shape);
  },

  array<TOutput, TInput = unknown>(
    itemSchema: BaseSchema<TOutput, TInput>
  ): ArraySchema<TOutput, TInput> {
    return new ArraySchema(itemSchema);
  },

  union<
    TSchemas extends readonly [BaseSchema<any, any>, ...BaseSchema<any, any>[]]
  >(schemas: TSchemas): UnionSchema<TSchemas> {
    return new UnionSchema(schemas);
  },

  optional<TOutput, TInput = unknown>(
    innerSchema: BaseSchema<TOutput, TInput>
  ): OptionalSchema<TOutput, TInput> {
    return new OptionalSchema(innerSchema);
  },

  nullable<TOutput, TInput = unknown>(
    innerSchema: BaseSchema<TOutput, TInput>
  ): NullableSchema<TOutput, TInput> {
    return new NullableSchema(innerSchema);
  },

  tuple<
    TSchemas extends readonly [BaseSchema<any, any>, ...BaseSchema<any, any>[]]
  >(schemas: TSchemas): TupleSchema<TSchemas> {
    return new TupleSchema(schemas);
  },

  record: recordFactory,

  custom<TOutput>(
    check: (value: unknown) => value is TOutput,
    message: string
  ): CustomSchema<TOutput> {
    return new CustomSchema(check, message);
  },
  function<TFunction extends (...args: any[]) => any>(): FunctionSchema<TFunction> {
    return new FunctionSchema<TFunction>();
  },
  lazy<TOutput, TInput = unknown>(
    getter: () => BaseSchema<TOutput, TInput>
  ): LazySchema<TOutput, TInput> {
    return new LazySchema(getter);
  },
};