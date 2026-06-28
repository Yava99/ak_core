import { createCoreLogger } from "@fivem/core-logger/server/public-api";
import type { Database } from "../database";
import { loadSeedFiles } from "./seed-loader";
import { SeedRepository } from "./seed-repository";

const logger = createCoreLogger("core-db:seeds");

export async function runSeeds(db: Database): Promise<void> {
  const repository = new SeedRepository(db);

  await repository.ensureSeedTable();

  const appliedKeys = await repository.getAppliedKeys();
  const seedFiles = loadSeedFiles();

  logger.info("loaded seed files", {
    count: seedFiles.length
  });

  for (const seed of seedFiles) {
    const seedKey = `${seed.moduleName}:${seed.version}`;

    if (appliedKeys.has(seedKey)) {
      logger.debug("seed already applied", {
        module: seed.moduleName,
        version: seed.version
      });
      continue;
    }

    logger.info("applying seed", {
      module: seed.moduleName,
      version: seed.version,
      fileName: seed.fileName
    });

    const transaction = await db.beginTransaction();

    try {
      const transactionRepository = new SeedRepository(transaction);

      await transaction.execute(seed.sql);
      await transactionRepository.markAsApplied(
        seed.moduleName,
        seed.version
      );

      await transaction.commit();
      appliedKeys.add(seedKey);

      logger.info("seed applied", {
        module: seed.moduleName,
        version: seed.version
      });
    } catch (error) {
      await transaction.rollback();

      logger.error("seed failed", {
        module: seed.moduleName,
        version: seed.version,
        fileName: seed.fileName,
        error
      });

      throw error;
    } finally {
      await transaction.release();
    }
  }

  logger.info("seed run complete");
}