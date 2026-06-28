import type { IDefinedExports, IDefinedService } from "./types";
export declare function normalizeModuleInput(moduleName: string): void;
export declare function normalizeServices(services: IDefinedService[] | undefined): IDefinedService[];
export declare function normalizeExports(exportsDefinition: IDefinedExports | undefined): Record<string, unknown | (() => unknown)>;
