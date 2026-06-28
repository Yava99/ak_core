import { getAppConfig } from "@fivem/core-config/server/public-api";
import { getDatabase } from "@fivem/core-db/server/db";
import { createCoreLogger } from "@fivem/core-logger/server/public-api";
import type { IModuleContext } from "@fivem/core-bootstrap/server/public-api";
import type { IModuleSdkContext } from "./types";

export function createModuleSdkContext(context: IModuleContext): IModuleSdkContext {
  const logger = createCoreLogger(context.moduleName);
  const config = getAppConfig();

  let db;
  try {
    db = getDatabase();
  } catch {
    db = undefined;
  }

  return {
    ...context,
    logger,
    config,
    db,
    services: context.services
  };
}