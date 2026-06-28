import { InfrastructureError, ERROR_CODES } from "@fivem/core-errors";
import type { IDatabaseConfig } from "@fivem/core-config/server/public-api";
import { createConnection } from "./connection";
import { Database } from "./database";
import { runMigrations } from "./migrations/migration-runner";
import { runSeeds } from "./seeds/seed-runner";
import type { DatabaseTransaction } from "./transaction";

let db: Database | null = null;

export async function initDatabase(config: IDatabaseConfig): Promise<void> {
  const pool = await createConnection(config);
  const database = new Database(pool);

  await database.ping();
  await runMigrations(database);
  await runSeeds(database);

  db = database;
}

export function getDatabase(): Database {
  if (!db) {
    throw new InfrastructureError(
      "Database has not been initialized",
      {
        module: "core-db",
        code: ERROR_CODES.DATABASE_NOT_INITIALIZED
      }
    );
  }

  return db;
}

export async function withTransaction<T>(
  callback: (transaction: DatabaseTransaction) => Promise<T>
): Promise<T> {
  const database = getDatabase();
  const transaction = await database.beginTransaction();

  try {
    const result = await callback(transaction);
    await transaction.commit();
    return result;
  } catch (error) {
    await transaction.rollback();
    throw error;
  } finally {
    await transaction.release();
  }
}