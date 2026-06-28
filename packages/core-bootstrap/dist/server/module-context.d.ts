import type { IModuleContext, IServiceRegistry } from "./types";
export declare class ModuleContext implements IModuleContext {
    readonly moduleName: string;
    readonly services: IServiceRegistry;
    constructor(moduleName: string, services: IServiceRegistry);
}
