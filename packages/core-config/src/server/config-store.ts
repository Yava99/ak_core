import type { IAppConfig } from "../shared";

export class ConfigStore {
  private readonly config: IAppConfig;

  public constructor(config: IAppConfig) {
    this.config = config;
  }

  public get(): Readonly<IAppConfig> {
    return this.config;
  }
}