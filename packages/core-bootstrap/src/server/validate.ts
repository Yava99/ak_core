import { parseDto } from "@fivem/core-validation";
import { FrameworkKernelSnapshotSchema } from "./schemas/framework-kernel-snapshot-schema";
import { ModuleDefinitionSchema } from "./schemas/module-definition-schema";
import { ModuleLifecycleStateSchema } from "./schemas/module-lifecycle-state-schema";
import { ModuleStateSchema } from "./schemas/module-state-schema";
import {
  ServiceRegistrationSchema,
  type IServiceRegistrationInput
} from "./schemas/service-registration-schema";
import type {
  IFrameworkKernelSnapshot,
  IModuleDefinition,
  IModuleState,
  ModuleLifecycleState
} from "./types";

export function validateModuleDefinition(
  input: IModuleDefinition
): IModuleDefinition {
  return parseDto(ModuleDefinitionSchema, input);
}

export function validateModuleState(
  input: IModuleState
): IModuleState {
  return parseDto(ModuleStateSchema, input);
}

export function validateModuleLifecycleState(
  input: ModuleLifecycleState
): ModuleLifecycleState {
  return parseDto(ModuleLifecycleStateSchema, input);
}

export function validateFrameworkKernelSnapshot(
  input: IFrameworkKernelSnapshot
): IFrameworkKernelSnapshot {
  return parseDto(FrameworkKernelSnapshotSchema, input);
}

export function validateServiceRegistration(
  input: IServiceRegistrationInput
): IServiceRegistrationInput {
  return parseDto(ServiceRegistrationSchema, input);
}