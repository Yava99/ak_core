import { InfrastructureError, ERROR_CODES } from "@fivem/core-errors";
import type { ExportValue, InternalExport } from "./types";
import {
  validateExportValue,
  validateQualifiedExportName
} from "./validate";

export class ExportRegistry {
  private readonly exports = new Map<string, InternalExport>();

  public register(name: string, value: ExportValue): void {
    const validatedName = validateQualifiedExportName(name);
    const validatedValue = validateExportValue(value);
    const kind = validatedName.includes(".service.") ? "service" : "custom";

    if (this.exports.has(validatedName)) {
      throw new InfrastructureError("Export is already registered", {
        module: "core-exports",
        code: ERROR_CODES.INFRASTRUCTURE_FAILURE,
        exportName: validatedName
      });
    }

    this.exports.set(validatedName, {
      name: validatedName,
      value: validatedValue,
      kind
    });
  }

  public resolve<TValue = unknown>(name: string): TValue {
    const entry = this.exports.get(name);

    if (!entry) {
      throw new InfrastructureError("Export not found", {
        module: "core-exports",
        code: ERROR_CODES.INFRASTRUCTURE_FAILURE,
        exportName: name
      });
    }

    return entry.value as TValue;
  }

  public has(name: string): boolean {
    return this.exports.has(name);
  }

  public list(): string[] {
    return [...this.exports.keys()].sort((a, b) => a.localeCompare(b));
  }

  public listByKind(kind: "service" | "custom"): string[] {
    return [...this.exports.values()]
      .filter((entry) => entry.kind === kind)
      .map((entry) => entry.name)
      .sort((a, b) => a.localeCompare(b));
  }
}

export const exportRegistry = new ExportRegistry();