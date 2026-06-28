import type { IAppConfig } from "../shared";
export type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};
export type AppConfigOverride = DeepPartial<IAppConfig>;
