import { createCoreLogger } from "@fivem/core-logger/server/public-api";
import { getBootstrapper, getFrameworkSnapshot } from "@fivem/core-bootstrap/server/public-api";

const logger = createCoreLogger("fw-kernel-entry");
const bootstrapper = getBootstrapper();

logger.info("fw-kernel-entry started");

on("onResourceStart", async (resourceName: string) => {
  if (resourceName !== GetCurrentResourceName()) {
    return;
  }

  try {
    logger.info("resource boot confirmed");

    await bootstrapper.bootstrap();

    logger.info("framework bootstrap complete", {
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

    logger.info("framework shutdown complete", {
      snapshot: getFrameworkSnapshot()
    });
  } catch (error) {
    logger.error(error);
  }
});