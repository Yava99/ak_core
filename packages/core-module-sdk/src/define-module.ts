import { createModuleDefinition } from "./module-factory";
import type { IModuleSdkDefinitionInput, IResolvedModuleDefinition } from "./types";
import { validateModuleDefinitionInput } from "./validate";

export function defineModule(
  input: IModuleSdkDefinitionInput
): IResolvedModuleDefinition {
  return createModuleDefinition(validateModuleDefinitionInput(input));
}