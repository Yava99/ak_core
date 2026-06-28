import { InfrastructureError } from "@fivem/core-errors";
import type { IValidationIssue } from "../types/issues";
import { joinPath } from "../utils/join-path";

export interface IFlattenedValidationError {
  formErrors: string[];
  fieldErrors: Record<string, string[]>;
}

export class ValidationError extends InfrastructureError {
  public readonly issues: IValidationIssue[];

  public constructor(message: string, issues: IValidationIssue[]) {
    super(
      message,
      {
        module: "core-validation",
        code: "VALIDATION_FAILED"
      }
    );

    this.name = "ValidationError";
    this.issues = issues;
  }

  public format(): string {
    if (this.issues.length === 0) {
      return this.message;
    }

    const lines = this.issues.map((issue, index) => {
      const path = joinPath(issue.path);
      const location = path.length > 0 ? path : "<root>";

      return `${index + 1}. ${location}: ${issue.message}`;
    });

    return [this.message, ...lines].join("\n");
  }

  public flatten(): IFlattenedValidationError {
    const formErrors: string[] = [];
    const fieldErrors: Record<string, string[]> = {};

    for (const issue of this.issues) {
      const path = joinPath(issue.path);

      if (path.length === 0) {
        formErrors.push(issue.message);
        continue;
      }

      if (!fieldErrors[path]) {
        fieldErrors[path] = [];
      }

      fieldErrors[path].push(issue.message);
    }

    return {
      formErrors,
      fieldErrors
    };
  }

  public getFieldErrors(): Record<string, string[]> {
    return this.flatten().fieldErrors;
  }

  public getFormErrors(): string[] {
    return this.flatten().formErrors;
  }

  public override toString(): string {
    return this.format();
  }
}