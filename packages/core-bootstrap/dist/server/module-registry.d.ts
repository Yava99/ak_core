import type { IModuleDefinition } from "./types";
export declare class ModuleRegistry {
    private readonly modules;
    register(definition: IModuleDefinition): void;
    get(name: string): IModuleDefinition;
    list(): IModuleDefinition[];
    listNames(): string[];
    has(name: string): boolean;
}
