export { getConfigStore, getAppConfig } from "./config-runtime";
export { ConfigStore } from "./config-store";
export { buildConfig } from "./sources/build-config";
export { createDefaultConfig } from "./defaults";
export { mergeConfig } from "./merge-config";
export type { DeepPartial, AppConfigOverride } from "./types";
export type { IAppConfig, IServerCoreConfig, IDatabaseConfig, IModulesConfig } from "../shared";
