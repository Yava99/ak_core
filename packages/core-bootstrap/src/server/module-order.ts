import { DomainError, ERROR_CODES } from "@fivem/core-errors";
import type { IModuleDefinition } from "./types";

export function resolveModuleOrder(modules: IModuleDefinition[]): IModuleDefinition[] {
  const ordered: IModuleDefinition[] = [];
  const visited = new Set<string>();
  const visiting = new Set<string>();
  const byName = new Map(modules.map((module) => [module.name, module]));

  function visit(module: IModuleDefinition): void {
    if (visited.has(module.name)) {
      return;
    }

    if (visiting.has(module.name)) {
      throw new DomainError("Circular module dependency detected", {
        code: ERROR_CODES.DOMAIN_RULE_VIOLATION,
        moduleName: module.name
      });
    }

    visiting.add(module.name);

    for (const dependencyName of module.dependencies ?? []) {
      const dependency = byName.get(dependencyName);

      if (!dependency) {
        throw new DomainError("Missing module dependency", {
          code: ERROR_CODES.DOMAIN_RULE_VIOLATION,
          moduleName: module.name,
          dependencyName
        });
      }

      visit(dependency);
    }

    visiting.delete(module.name);
    visited.add(module.name);
    ordered.push(module);
  }

  for (const module of modules) {
    visit(module);
  }

  return ordered;
}