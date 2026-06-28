import { createCoreLogger } from "@fivem/core-logger/server/public-api";
import { getBootstrapper, getFrameworkSnapshot } from "./runtime";

const logger = createCoreLogger("core-bootstrap");
const bootstrapper = getBootstrapper();

logger.info("core-bootstrap started");

on("onResourceStart", async (resourceName: string) => {
  if (resourceName !== GetCurrentResourceName()) {
    return;
  }

  try {
    logger.info("resource boot confirmed");

    logger.info("bootstrap complete", {
      snapshot: getFrameworkSnapshot()
    });
  } catch (error) {
    logger.error(error);
  }
});

on("onResourceStop", async (resourceName: string) => {
  if (resourceName !== GetCurrentResourceName()) {
    return;
  }

  try {
    await bootstrapper.shutdown();

    logger.info("bootstrap shutdown complete", {
      snapshot: getFrameworkSnapshot()
    });
  } catch (error) {
    logger.error(error);
  }
});