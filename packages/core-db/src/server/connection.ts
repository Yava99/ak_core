import mysql, { type Pool } from "mysql2/promise";
import { InfrastructureError, ERROR_CODES } from "@fivem/core-errors";
import type { IDatabaseConfig } from "@fivem/core-config/server/public-api";

export async function createConnection(config: IDatabaseConfig): Promise<Pool> {
  try {
    return mysql.createPool({
      host: config.host,
      port: config.port,
      user: config.user,
      password: config.password,
      database: config.database,
      connectionLimit: config.connectionLimit
    });
  } catch (cause) {
    throw new InfrastructureError(
      "Failed to create database pool",
      {
        module: "core-db",
        code: ERROR_CODES.DATABASE_CONNECTION_FAILED
      },
      cause
    );
  }
}