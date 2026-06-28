import { createCoreLogger } from "@fivem/core-logger/server/public-api";
import { exportRegistry } from "./export-registry";
import {
  buildQualifiedExportName,
  buildQualifiedServiceExportName
} from "./naming";
import type { IExportSnapshot } from "./types";
import {
  validateRegisterModuleExportInput,
  validateRegisterPublicServiceInput
} from "./validate";
import { ERROR_CODES, InfrastructureError } from "@fivem/core-errors";

const logger = createCoreLogger("core-exports");

function registerService<TService>(name: string, service: TService): void {
  exportRegistry.register(name, service);
  logger.debug("service export registered", { name });
}

function registerModuleExport<TValue>(
  moduleName: string,
  exportName: string,
  value: TValue
): string {
  const validated = validateRegisterModuleExportInput({
    moduleName,
    exportName,
    value
  });

  const qualifiedName = buildQualifiedExportName(
    validated.moduleName,
    validated.exportName
  );

  exportRegistry.register(qualifiedName, validated.value);
  logger.debug("custom export registered", { name: qualifiedName });
  return qualifiedName;
}

function registerPublicService<TService>(
  moduleName: string,
  serviceName: string,
  service: TService
): string {
  const validated = validateRegisterPublicServiceInput({
    moduleName,
    serviceName,
    service
  });

  const qualifiedName = buildQualifiedServiceExportName(
    validated.moduleName,
    validated.serviceName
  );

  exportRegistry.register(qualifiedName, validated.service);
  logger.debug("public service export registered", { name: qualifiedName });
  return qualifiedName;
}

function resolveService<TService>(name: string): TService {
  if (!name.includes(".service.")) {
    throw new InfrastructureError("Invalid service name", {
      module: "core-exports",
      code: ERROR_CODES.INFRASTRUCTURE_FAILURE,
      name
    });
  }

  return exportRegistry.resolve<TService>(name);
}

function hasService(name: string): boolean {
  return exportRegistry.has(name);
}

function listServices(): string[] {
  return exportRegistry.listByKind("service");
}

function getExportSnapshot(): IExportSnapshot {
  return {
    exports: exportRegistry.list(),
    services: exportRegistry.listByKind("service")
  };
}

export {
  exportRegistry,
  registerService,
  registerModuleExport,
  registerPublicService,
  resolveService,
  hasService,
  listServices,
  getExportSnapshot
};