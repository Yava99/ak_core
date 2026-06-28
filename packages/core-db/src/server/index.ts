import { createCoreLogger } from "@fivem/core-logger/server/public-api";
import { getAppConfig } from "@fivem/core-config/server/public-api";
import { initDatabase } from "./db";

const logger = createCoreLogger("core-db");

logger.info("core-db starting");

on("onResourceStart", async (resourceName: string) => {
  if (resourceName !== GetCurrentResourceName()) {
    return;
  }

  try {
    const config = getAppConfig();

    if (!config.modules.coreDb.enabled) {
      logger.warn("core-db is disabled by configuration");
      return;
    }

    await initDatabase(config.database);

    logger.info("database connected", {
      host: config.database.host,
      port: config.database.port,
      database: config.database.database,
      user: config.database.user
    });
  } catch (error) {
    logger.error(error);
  }
});