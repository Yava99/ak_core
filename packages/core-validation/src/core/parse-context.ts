import type { IValidationIssue } from "../types/issues";
import type { SchemaPath } from "../types/path";

export interface IParseContext {
  path: SchemaPath;
  issues: IValidationIssue[];
}