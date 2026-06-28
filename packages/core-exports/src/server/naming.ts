import {
  validateCustomExportName,
  validateQualifiedExportName,
  validateServiceExportName
} from "./validate";

export function assertValidCustomExportName(name: string): void {
  validateCustomExportName(name);
}

export function assertValidServiceExportName(name: string): void {
  validateServiceExportName(name);
}

export function assertValidQualifiedExportName(name: string): void {
  validateQualifiedExportName(name);
}

export function buildQualifiedExportName(
  moduleName: string,
  exportName: string
): string {
  const fullName = `${moduleName}.${exportName}`;
  validateCustomExportName(fullName);
  return fullName;
}

export function buildQualifiedServiceExportName(
  moduleName: string,
  serviceName: string
): string {
  const fullName = `${moduleName}.service.${serviceName}`;
  validateServiceExportName(fullName);
  return fullName;
}

export const QUALIFIED_EXPORT_PATTERN =
  /^[a-z0-9-]+\.(service\.)?[a-zA-Z0-9-]+$/;