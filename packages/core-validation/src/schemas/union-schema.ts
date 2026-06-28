import { BaseSchema } from "../core/base-schema";
import { createIssue } from "../core/issue-factory";
import type { IParseContext } from "../core/parse-context";
import { FAIL, OK } from "../core/parse-status";
import type { IValidationIssue } from "../types/issues";
import type { InternalParseResult } from "../types/parse-result";
import { formatValue } from "../utils/format-value";
import { getArrayItem } from "../utils/get-array-item";
import { getValidationRuntimeOptions } from "../core/validation-runtime";

type UnionOutput<TSchemas extends readonly BaseSchema<any, any>[]> =
  TSchemas[number] extends BaseSchema<infer TOutput, any>
    ? TOutput
    : never;

type UnionInput<TSchemas extends readonly BaseSchema<any, any>[]> =
  TSchemas[number] extends BaseSchema<any, infer TInput>
    ? TInput
    : never;

interface IUnionBranchFailure {
  index: number;
  issues: IValidationIssue[];
}

export class UnionSchema<
  TSchemas extends readonly [BaseSchema<any, any>, ...BaseSchema<any, any>[]]
> extends BaseSchema<UnionOutput<TSchemas>, UnionInput<TSchemas>> {
  public constructor(private readonly schemas: TSchemas) {
    super();
  }

  public getSchemas(): TSchemas {
    return this.schemas;
  }

  protected _parse(
    context: IParseContext,
    input: unknown
  ): InternalParseResult<UnionOutput<TSchemas>> {
    const branchFailures: IUnionBranchFailure[] = [];

    for (let index = 0; index < this.schemas.length; index++) {
      const schema = getArrayItem(this.schemas, index);

      const branchContext: IParseContext = {
        path: [...context.path],
        issues: []
      };

      const result = schema["_parse"](branchContext, input);

      if (result.success) {
        return OK(result.data as UnionOutput<TSchemas>);
      }

      branchFailures.push({
        index,
        issues: [...branchContext.issues]
      });
    }

    const runtimeOptions = getValidationRuntimeOptions();

    context.issues.push(
      createIssue(
        context.path,
        "invalid_union",
        `Input did not match any union branch, received ${formatValue(input)}`,
        {
          expected: "valid union branch",
          received: input,
          metadata: runtimeOptions.includeDebugMetadata
            ? {
                branchIssueCount: branchFailures.reduce(
                  (total, branch) => total + branch.issues.length,
                  0
                ),
                branchFailures
              }
            : {
                branchIssueCount: branchFailures.reduce(
                  (total, branch) => total + branch.issues.length,
                  0
                )
              }
        }
      )
    );

    return FAIL;
  }
}