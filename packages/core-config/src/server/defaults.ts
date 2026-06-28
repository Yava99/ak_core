import type { IAppConfig } from "../shared";

export function createDefaultConfig(): IAppConfig {
  return {
    server: {
      name: "Mon projet FiveM",
      locale: "fr-FR",
      maxClients: 8,
      environment: "development"
    },
    database: {
      host: "127.0.0.1",
      port: 3306,
      user: "root",
      password: "",
      database: "fivem",
      connectionLimit: 10
    },
    modules: {
      coreDb: {
        enabled: true
      },
      coreEvents: {
        enabled: true
      }
    }
  };
}