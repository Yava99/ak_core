import type { IFrameworkModuleDefinition } from "./types";
import { Bootstrapper } from "./bootstrapper";
export declare function getBootstrapper(): Bootstrapper;
export declare function registerFrameworkModule(definition: IFrameworkModuleDefinition): void;
export declare function isFrameworkBootstrapped(): boolean;
export declare function getFrameworkSnapshot(): import("./types").IFrameworkKernelSnapshot;
