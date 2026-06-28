import type { IFrameworkKernelSnapshot, IModuleState } from "./types";
import type { ModuleRegistry } from "./module-registry";
import type { ServiceRegistry } from "./service-registry";
export declare function createKernelSnapshot(serviceRegistry: ServiceRegistry, moduleRegistry: ModuleRegistry, moduleStates: Map<string, IModuleState>): IFrameworkKernelSnapshot;
