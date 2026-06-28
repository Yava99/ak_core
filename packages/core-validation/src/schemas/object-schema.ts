import { BaseSchema } from "../core/base-schema";
import { createIssue } from "../core/issue-factory";
import type { ObjectMode } from "../core/object-mode";
import type { IParseContext } from "../core/parse-context";
import { FAIL, OK } from "../core/parse-status";
import { popPath, pushPath } from "../core/schema-internal";
import type { OptionalSchema } from "./optional-schema";
import type {
  InputObjectFromShape,
  ObjectShape,
  OutputObjectFromShape
} from "../types/object-shape";
import type { InternalParseResult } from "../types/parse-result";
import { formatValue } from "../utils/format-value";
import { getObjectKeys } from "../utils/get-object-keys";
import { isPlainObject } from "../utils/is-plain-object";

type OptionalKeys<TShape extends ObjectShape> = {
  [K in keyof TShape]: TShape[K] extends { readonly __optionalBrand: true }
    ? K
    : never;
}[keyof TShape];

type RequiredKeys<TShape extends ObjectShape> = Exclude<keyof TShape, OptionalKeys<TShape>>;

type ObjectOutput<TShape extends ObjectShape> = {
  [K in RequiredKeys<TShape>]: OutputObjectFromShape<TShape>[K];
} & {
  [K in OptionalKeys<TShape>]?: Exclude<OutputObjectFromShape<TShape>[K], undefined>;
};

type ObjectInput<TShape extends ObjectShape> = {
  [K in RequiredKeys<TShape>]: InputObjectFromShape<TShape>[K];
} & {
  [K in OptionalKeys<TShape>]?: Exclude<InputObjectFromShape<TShape>[K], undefined>;
};

type PickShape<
  TShape extends ObjectShape,
  TKeys extends readonly (keyof TShape)[]
> = {
  [K in TKeys[number]]: TShape[K];
};

type OmitShape<
  TShape extends ObjectShape,
  TKeys extends readonly (keyof TShape)[]
> = {
  [K in Exclude<keyof TShape, TKeys[number]>]: TShape[K];
};

type PartializedShape<TShape extends ObjectShape> = {
  [K in keyof TShape]: OptionalSchema<
    OutputObjectFromShape<{ [P in K]: TShape[K] }>[K],
    InputObjectFromShape<{ [P in K]: TShape[K] }>[K]
  >;
};

export class ObjectSchema<TShape extends ObjectShape> extends BaseSchema<
  ObjectOutput<TShape>,
  ObjectInput<TShape>
> {
  private readonly shape: TShape;
  private readonly mode: ObjectMode;
  private readonly shapeKeys: Array<keyof TShape & string>;
  private readonly knownKeys: ReadonlySet<string>;

  public constructor(
    shape: TShape,
    options?: {
      mode?: ObjectMode;
    }
  ) {
    super();
    this.shape = shape;
    this.mode = options?.mode ?? "strict";
    this.shapeKeys = getObjectKeys(shape);
    this.knownKeys = new Set(this.shapeKeys);
  }

  public strict(): ObjectSchema<TShape> {
    return new ObjectSchema(this.shape, { mode: "strict" });
  }

  public strip(): ObjectSchema<TShape> {
    return new ObjectSchema(this.shape, { mode: "strip" });
  }

  public passthrough(): ObjectSchema<TShape> {
    return new ObjectSchema(this.shape, { mode: "passthrough" });
  }

  public extend<TExtension extends ObjectShape>(
    extension: TExtension
  ): ObjectSchema<TShape & TExtension> {
    return new ObjectSchema(
      {
        ...this.shape,
        ...extension
      } as TShape & TExtension,
      { mode: this.mode }
    );
  }

  public merge<TOtherShape extends ObjectShape>(
    other: ObjectSchema<TOtherShape>
  ): ObjectSchema<TShape & TOtherShape> {
    return new ObjectSchema(
      {
        ...this.shape,
        ...other.getShape()
      } as TShape & TOtherShape,
      { mode: this.mode }
    );
  }

  public pick<const TKeys extends readonly (keyof TShape)[]>(
    keys: TKeys
  ): ObjectSchema<PickShape<TShape, TKeys>> {
    const pickedShape = {} as PickShape<TShape, TKeys>;

    for (const key of keys) {
      pickedShape[key] = this.shape[key];
    }

    return new ObjectSchema(pickedShape, { mode: this.mode });
  }

  public omit<const TKeys extends readonly (keyof TShape)[]>(
    keys: TKeys
  ): ObjectSchema<OmitShape<TShape, TKeys>> {
    const omittedKeys = new Set<keyof TShape>(keys);
    const nextShape = {} as OmitShape<TShape, TKeys>;

    for (const key of getObjectKeys(this.shape)) {
      if (!omittedKeys.has(key)) {
        (nextShape as Record<string, unknown>)[key] = this.shape[key];
      }
    }

    return new ObjectSchema(nextShape, { mode: this.mode });
  }

  public partial(): ObjectSchema<PartializedShape<TShape>> {
    const nextShape = {} as PartializedShape<TShape>;

    for (const key of this.shapeKeys as Array<keyof TShape>) {
      const fieldSchema = this.shape[key] as TShape[keyof TShape];
      nextShape[key] = fieldSchema.optional() as PartializedShape<TShape>[typeof key];
    }

    return new ObjectSchema(nextShape, { mode: this.mode });
  }

  public getShape(): TShape {
    return this.shape;
  }

  protected _parse(
    context: IParseContext,
    input: unknown
  ): InternalParseResult<ObjectOutput<TShape>> {
    if (!isPlainObject(input)) {
      context.issues.push(
        createIssue(
          context.path,
          "invalid_type",
          `Expected object, received ${formatValue(input)}`,
          {
            expected: "object",
            received: input
          }
        )
      );

      return FAIL;
    }

    const source = input as Record<string, unknown>;
    const output: Record<string, unknown> = {};

    for (const key of this.shapeKeys as Array<keyof TShape>) {
      const fieldSchema = this.shape[key] as TShape[keyof TShape];
      const rawValue = source[key as string];

      pushPath(context, key as string);
      const result = fieldSchema["_parse"](context, rawValue);
      popPath(context);

      if (!result.success) {
        return FAIL;
      }

      if (result.data !== undefined) {
        output[key as string] = result.data;
      }
    }

    const inputKeys = getObjectKeys(source);

    for (const key of inputKeys) {
      if (this.knownKeys.has(key)) {
        continue;
      }

      if (this.mode === "passthrough") {
        output[key] = source[key];
        continue;
      }

      if (this.mode === "strip") {
        continue;
      }

      context.issues.push(
        createIssue(
          [...context.path, key],
          "unrecognized_key",
          `Unrecognized key ${formatValue(key)}`,
          {
            expected: "known object key",
            received: key
          }
        )
      );

      return FAIL;
    }

    return OK(output as ObjectOutput<TShape>);
  }
}