import { parseDto } from "@fivem/core-validation";
import { DefinedExportsSchema } from "./schemas/defined-exports-schema";
import { DefinedServiceSchema } from "./schemas/defined-service-schema";
import { DependenciesSchema } from "./schemas/dependencies-schema";
import { ModuleDefinitionInputSchema } from "./schemas/module-definition-input-schema";
import { ModuleSetupResultSchema } from "./schemas/module-setup-result-schema";
import type {
  IDefinedExports,
  IDefinedService,
  IModuleSdkDefinitionInput,
  IModuleSetupResult
} from "./types";

export function validateDependencies(input: unknown): string[] {
  return parseDto(DependenciesSchema, input);
}

export function validateDefinedService<TInstance>(
  input: IDefinedService<TInstance>
): IDefinedService<TInstance> {
  return parseDto(DefinedServiceSchema, input) as IDefinedService<TInstance>;
}

export function validateDefinedExports(input: IDefinedExports): IDefinedExports {
  return parseDto(DefinedExportsSchema, input);
}

export function validateModuleDefinitionInput(
  input: IModuleSdkDefinitionInput
): IModuleSdkDefinitionInput {
  return parseDto(ModuleDefinitionInputSchema, input);
}

export function validateModuleSetupResult(
  input: IModuleSetupResult
): IModuleSetupResult {
  return parseDto(ModuleSetupResultSchema, input);
}