import type { AppConfigOverride } from "../types";

export function loadEnvConfig(): AppConfigOverride {
  const env = process.env;

  return {
    server: {
      name: env.FIVEM_SERVER_NAME,
      locale: env.FIVEM_SERVER_LOCALE,
      environment:
        env.FIVEM_SERVER_ENV === "development" ||
        env.FIVEM_SERVER_ENV === "staging" ||
        env.FIVEM_SERVER_ENV === "production"
          ? env.FIVEM_SERVER_ENV
          : undefined,
      maxClients: env.FIVEM_SERVER_MAX_CLIENTS
        ? Number(env.FIVEM_SERVER_MAX_CLIENTS)
        : undefined
    },
    database: {
      host: env.FIVEM_DB_HOST,
      port: env.FIVEM_DB_PORT ? Number(env.FIVEM_DB_PORT) : undefined,
      user: env.FIVEM_DB_USER,
      password: env.FIVEM_DB_PASSWORD,
      database: env.FIVEM_DB_NAME,
      connectionLimit: env.FIVEM_DB_CONNECTION_LIMIT
        ? Number(env.FIVEM_DB_CONNECTION_LIMIT)
        : undefined
    }
  };
}