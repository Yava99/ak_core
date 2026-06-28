import { createCoreLogger } from "@fivem/core-logger/server/public-api";
import { getAppConfig } from "./config-runtime";

const logger = createCoreLogger("core-config");

logger.info("core-config started");

on("onResourceStart", (resourceName: string) => {
  if (resourceName !== GetCurrentResourceName()) {
    return;
  }

  try {
    const config = getAppConfig();

    logger.info("resource boot confirmed");
    logger.info("configuration loaded", {
      server: config.server,
      database: {
        ...config.database,
        password: config.database.password ? "***" : ""
      },
      modules: config.modules
    });
  } catch (error) {
    logger.error(error);
  }
});