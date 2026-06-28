import type { IDefinedExports, IDefinedService, IModuleSdkDefinitionInput, IModuleSetupResult } from "./types";
export declare function validateDependencies(input: unknown): string[];
export declare function validateDefinedService<TInstance>(input: IDefinedService<TInstance>): IDefinedService<TInstance>;
export declare function validateDefinedExports(input: IDefinedExports): IDefinedExports;
export declare function validateModuleDefinitionInput(input: IModuleSdkDefinitionInput): IModuleSdkDefinitionInput;
export declare function validateModuleSetupResult(input: IModuleSetupResult): IModuleSetupResult;
