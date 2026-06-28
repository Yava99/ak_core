import { ValidationError } from "@fivem/core-errors";

const MODULE_NAME_PATTERN = /^[a-z0-9-]+$/;
const SERVICE_NAME_PATTERN = /^[a-z0-9-]+$/;
const EXPORT_NAME_PATTERN = /^[A-Za-z][A-Za-z0-9]*$/;

export function assertValidModuleName(name: string): void {
  if (!MODULE_NAME_PATTERN.test(name)) {
    throw new ValidationError("Invalid module name", {
      value: name,
      expected: "lowercase letters, numbers, dashes"
    });
  }
}

export function assertValidServiceName(name: string): void {
  if (!SERVICE_NAME_PATTERN.test(name)) {
    throw new ValidationError("Invalid service name", {
      value: name,
      expected: "lowercase letters, numbers, dashes"
    });
  }
}

export function assertValidExportName(name: string): void {
  if (!EXPORT_NAME_PATTERN.test(name)) {
    throw new ValidationError("Invalid export name", {
      value: name,
      expected: "camelCase or PascalCase-like identifier"
    });
  }
}

export function buildQualifiedServiceName(
  moduleName: string,
  serviceName: string
): string {
  return `${moduleName}.${serviceName}`;
}

export function buildQualifiedPublicServiceExportName(
  moduleName: string,
  serviceName: string
): string {
  return `${moduleName}.service.${serviceName}`;
}