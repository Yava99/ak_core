import type { IFrameworkKernelSnapshot, IModuleState } from "./types";
import type { ModuleRegistry } from "./module-registry";
import type { ServiceRegistry } from "./service-registry";

export function createKernelSnapshot(
  serviceRegistry: ServiceRegistry,
  moduleRegistry: ModuleRegistry,
  moduleStates: Map<string, IModuleState>
): IFrameworkKernelSnapshot {
  return {
    services: serviceRegistry.list(),
    registeredModules: moduleRegistry.list().map((module) => module.name),
    moduleStates: [...moduleStates.values()]
  };
}