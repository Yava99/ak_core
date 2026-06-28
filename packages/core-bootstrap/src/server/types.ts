export interface IModuleDefinition {
  name: string;
  dependencies?: string[];
  register(context: IModuleContext): void | Promise<void>;
  start?(context: IModuleContext): void | Promise<void>;
  stop?(context: IModuleContext): void | Promise<void>;
  exports?: Record<string, unknown | (() => unknown)>;
}

export interface IServiceRegistry {
  register<TService>(name: string, service: TService): void;
  resolve<TService>(name: string): TService;
  has(name: string): boolean;
  list(): string[];
}

export interface IModuleContext {
  moduleName: string;
  services: IServiceRegistry;
}

export type ModuleLifecycleState =
  | "created"
  | "registering"
  | "registered"
  | "starting"
  | "started"
  | "stopping"
  | "stopped"
  | "failed";

export interface IModuleState {
  name: string;
  state: ModuleLifecycleState;
  dependencies: string[];
}

export interface IFrameworkKernelSnapshot {
  services: string[];
  moduleStates: IModuleState[];
  registeredModules: string[];
}

export interface IFrameworkModuleDefinition extends IModuleDefinition {
  sdkName?: string;
}