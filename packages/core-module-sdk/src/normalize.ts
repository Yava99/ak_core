import type {
  IDefinedExports,
  IDefinedService
} from "./types";
import {
  assertValidExportName,
  assertValidModuleName,
  assertValidServiceName
} from "./naming";

export function normalizeModuleInput(moduleName: string): void {
  assertValidModuleName(moduleName);
}

export function normalizeServices(
  services: IDefinedService[] | undefined
): IDefinedService[] {
  if (!services) {
    return [];
  }

  for (const service of services) {
    assertValidServiceName(service.name);
  }

  return services;
}

export function normalizeExports(
  exportsDefinition: IDefinedExports | undefined
): Record<string, unknown | (() => unknown)> {
  if (!exportsDefinition) {
    return {};
  }

  for (const exportName of Object.keys(exportsDefinition.entries)) {
    assertValidExportName(exportName);
  }

  return exportsDefinition.entries;
}