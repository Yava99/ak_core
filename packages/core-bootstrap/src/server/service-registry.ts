import { InfrastructureError, ERROR_CODES } from "@fivem/core-errors";
import { validateServiceRegistration } from "./validate";
import type { IServiceRegistry } from "./types";

export class ServiceRegistry implements IServiceRegistry {
  private readonly services = new Map<string, unknown>();

  public register<TService>(name: string, service: TService): void {
    const validated = validateServiceRegistration({
      name,
      service
    });

    if (this.services.has(validated.name)) {
      throw new InfrastructureError(
        "Service is already registered",
        {
          module: "core-bootstrap",
          code: ERROR_CODES.INFRASTRUCTURE_FAILURE,
          service: validated.name
        }
      );
    }

    this.services.set(validated.name, validated.service);
  }

  public resolve<TService>(name: string): TService {
    const service = this.services.get(name);

    if (!service) {
      throw new InfrastructureError(
        "Service not found",
        {
          module: "core-bootstrap",
          code: ERROR_CODES.INFRASTRUCTURE_FAILURE,
          service: name
        }
      );
    }

    return service as TService;
  }

  public has(name: string): boolean {
    return this.services.has(name);
  }

  public list(): string[] {
    return [...this.services.keys()];
  }
}