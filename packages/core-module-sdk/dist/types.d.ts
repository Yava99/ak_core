import type { IModuleContext, IModuleDefinition, IServiceRegistry } from "@fivem/core-bootstrap/server/public-api";
import type { IAppConfig } from "@fivem/core-config/server/public-api";
import type { Database } from "@fivem/core-db/server/database";
import type { BaseLogger } from "@fivem/core-logger/server/public-api";
export interface IDefinedService<TInstance = unknown> {
    name: string;
    instance: TInstance;
    public?: boolean;
}
export interface IDefinedExports {
    entries: Record<string, unknown | (() => unknown)>;
}
export interface IModuleSdkContext extends IModuleContext {
    logger: BaseLogger;
    config: Readonly<IAppConfig>;
    db?: Database;
    services: IServiceRegistry;
}
export interface IModuleSetupLifecycle {
    start?(): void | Promise<void>;
    stop?(): void | Promise<void>;
}
export interface IModuleSetupResult extends IModuleSetupLifecycle {
    services?: IDefinedService[];
    exports?: IDefinedExports;
}
export interface IModuleSdkDefinitionInput {
    name: string;
    dependencies?: string[];
    setup(context: IModuleSdkContext): IModuleSetupResult | Promise<IModuleSetupResult>;
}
export interface IResolvedModuleDefinition extends IModuleDefinition {
    readonly sdkName: string;
}
