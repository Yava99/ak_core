import { createCoreLogger } from "@fivem/core-logger/server/public-api";
import {
  getExportSnapshot,
  hasService,
  listServices,
  registerModuleExport,
  registerPublicService,
  registerService,
  resolveService
} from "./runtime";

const logger = createCoreLogger("core-exports");

exports("registerService", registerService);
exports("registerModuleExport", registerModuleExport);
exports("registerPublicService", registerPublicService);
exports("resolveService", resolveService);
exports("hasService", hasService);
exports("listServices", listServices);
exports("getExportSnapshot", getExportSnapshot);

logger.info("core-exports started");

on("onResourceStart", (resourceName: string) => {
  if (resourceName !== GetCurrentResourceName()) {
    return;
  }

  try {
    logger.info("resource boot confirmed");
    logger.info("available services", {
      snapshot: getExportSnapshot()
    });
  } catch (error) {
    logger.error(error);
  }
});