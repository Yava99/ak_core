import type { AppConfigOverride } from "../types";

function getStringConvar(name: string): string | undefined {
  const value = GetConvar(name, "");
  return value.trim() ? value : undefined;
}

function getNumberConvar(name: string): number | undefined {
  const value = GetConvar(name, "");
  if (!value.trim()) {
    return undefined;
  }

  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
}

export function loadConvarConfig(): AppConfigOverride {
  return {
    server: {
      name: getStringConvar("app_server_name"),
      locale: getStringConvar("app_server_locale"),
      environment: (() => {
        const value = getStringConvar("app_server_environment");

        return value === "development" ||
          value === "staging" ||
          value === "production"
          ? value
          : undefined;
      })(),
      maxClients: getNumberConvar("app_server_max_clients")
    },
    database: {
      host: getStringConvar("app_db_host"),
      port: getNumberConvar("app_db_port"),
      user: getStringConvar("app_db_user"),
      password: getStringConvar("app_db_password"),
      database: getStringConvar("app_db_name"),
      connectionLimit: getNumberConvar("app_db_connection_limit")
    }
  };
}