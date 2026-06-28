import { DomainError, ERROR_CODES, InfrastructureError } from "@fivem/core-errors";
import { validateModuleDefinition } from "./validate";
import type { IModuleDefinition } from "./types";

export class ModuleRegistry {
  private readonly modules = new Map<string, IModuleDefinition>();

  public register(definition: IModuleDefinition): void {
    const validatedDefinition = validateModuleDefinition(definition);

    if (this.modules.has(validatedDefinition.name)) {
      throw new DomainError("Duplicate module registration", {
        module: "core-bootstrap",
        code: ERROR_CODES.DOMAIN_RULE_VIOLATION,
        moduleName: validatedDefinition.name
      });
    }

    this.modules.set(validatedDefinition.name, validatedDefinition);
  }

  public get(name: string): IModuleDefinition {
    const definition = this.modules.get(name);

    if (!definition) {
      throw new InfrastructureError("Module definition not found", {
        module: "core-bootstrap",
        code: ERROR_CODES.INFRASTRUCTURE_FAILURE,
        moduleName: name
      });
    }

    return definition;
  }

  public list(): IModuleDefinition[] {
    return [...this.modules.values()];
  }

  public listNames(): string[] {
    return [...this.modules.keys()];
  }

  public has(name: string): boolean {
    return this.modules.has(name);
  }
}