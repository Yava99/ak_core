import type { IModuleContext, IServiceRegistry } from "./types";

export class ModuleContext implements IModuleContext {
  public constructor(
    public readonly moduleName: string,
    public readonly services: IServiceRegistry
  ) {}
}