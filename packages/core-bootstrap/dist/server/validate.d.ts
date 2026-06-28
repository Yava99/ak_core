import { type IServiceRegistrationInput } from "./schemas/service-registration-schema";
import type { IFrameworkKernelSnapshot, IModuleDefinition, IModuleState, ModuleLifecycleState } from "./types";
export declare function validateModuleDefinition(input: IModuleDefinition): IModuleDefinition;
export declare function validateModuleState(input: IModuleState): IModuleState;
export declare function validateModuleLifecycleState(input: ModuleLifecycleState): ModuleLifecycleState;
export declare function validateFrameworkKernelSnapshot(input: IFrameworkKernelSnapshot): IFrameworkKernelSnapshot;
export declare function validateServiceRegistration(input: IServiceRegistrationInput): IServiceRegistrationInput;
