import { createCoreLogger } from "@fivem/core-logger/server/public-api";
import type { Database } from "../database";
import { loadMigrationFiles } from "./migration-loader";
import { MigrationRepository } from "./migration-repository";

const logger = createCoreLogger("core-db:migrations");

export async function runMigrations(db: Database): Promise<void> {
  const repository = new MigrationRepository(db);

  await repository.ensureMigrationTable();

  const appliedKeys = await repository.getAppliedKeys();
  const migrationFiles = loadMigrationFiles();

  logger.info("loaded migration files", {
    count: migrationFiles.length
  });

  for (const migration of migrationFiles) {
    const migrationKey = `${migration.moduleName}:${migration.version}`;

    if (appliedKeys.has(migrationKey)) {
      logger.debug("migration already applied", {
        module: migration.moduleName,
        version: migration.version
      });
      continue;
    }

    logger.info("applying migration", {
      module: migration.moduleName,
      version: migration.version,
      fileName: migration.fileName
    });

    const transaction = await db.beginTransaction();

    try {
      const transactionRepository = new MigrationRepository(transaction);

      await transaction.execute(migration.sql);
      await transactionRepository.markAsApplied(
        migration.moduleName,
        migration.version
      );

      await transaction.commit();
      appliedKeys.add(migrationKey);

      logger.info("migration applied", {
        module: migration.moduleName,
        version: migration.version
      });
    } catch (error) {
      await transaction.rollback();

      logger.error("migration failed", {
        module: migration.moduleName,
        version: migration.version,
        fileName: migration.fileName,
        error
      });

      throw error;
    } finally {
      await transaction.release();
    }
  }

  logger.info("migration run complete");
}