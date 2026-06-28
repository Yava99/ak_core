import { ServiceRegistry } from "./service-registry";
import type { IFrameworkKernelSnapshot, IFrameworkModuleDefinition } from "./types";
export declare class Bootstrapper {
    private readonly logger;
    private readonly services;
    private readonly modules;
    private readonly moduleStates;
    private hasBootstrapped;
    registerModuleDefinition(definition: IFrameworkModuleDefinition): void;
    bootstrap(): Promise<void>;
    shutdown(): Promise<void>;
    getServiceRegistry(): ServiceRegistry;
    getSnapshot(): IFrameworkKernelSnapshot;
    isBootstrapped(): boolean;
    private setState;
}
