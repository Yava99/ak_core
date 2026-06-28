import { createCoreLogger } from "./public-api";

const logger = createCoreLogger("core-logger");

logger.info("core-logger started");

on("onResourceStart", (resourceName: string) => {
  if (resourceName !== GetCurrentResourceName()) {
    return;
  }

  logger.info("resource boot confirmed");
});