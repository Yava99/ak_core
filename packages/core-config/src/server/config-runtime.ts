import { ConfigStore } from "./config-store";
import { buildConfig } from "./sources/build-config";
import type { IAppConfig } from "../shared";

const configStore = new ConfigStore(buildConfig());

export function getConfigStore(): ConfigStore {
  return configStore;
}

export function getAppConfig(): Readonly<IAppConfig> {
  return configStore.get();
}