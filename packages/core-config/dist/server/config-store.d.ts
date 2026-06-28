import type { IAppConfig } from "../shared";
export declare class ConfigStore {
    private readonly config;
    constructor(config: IAppConfig);
    get(): Readonly<IAppConfig>;
}
