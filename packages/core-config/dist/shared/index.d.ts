export interface IServerCoreConfig {
    name: string;
    locale: string;
    maxClients: number;
    environment: "development" | "staging" | "production";
}
export interface IDatabaseConfig {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
    connectionLimit: number;
}
export interface IModulesConfig {
    coreDb: {
        enabled: boolean;
    };
    coreEvents: {
        enabled: boolean;
    };
}
export interface IAppConfig {
    server: IServerCoreConfig;
    database: IDatabaseConfig;
    modules: IModulesConfig;
}
