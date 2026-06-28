import type { IFrameworkModuleDefinition } from "./types";
import { Bootstrapper } from "./bootstrapper";
import { InfrastructureError, ERROR_CODES } from "@fivem/core-errors";

const bootstrapper = new Bootstrapper();

export function getBootstrapper(): Bootstrapper {
  return bootstrapper;
}

export function registerFrameworkModule(definition: IFrameworkModuleDefinition): void {
  if (bootstrapper.isBootstrapped()) {
    throw new InfrastructureError(
      "Cannot register framework module after bootstrap",
      {
        module: "core-bootstrap",
        code: ERROR_CODES.INFRASTRUCTURE_FAILURE,
        moduleName: definition.name
      }
    );
  }

  bootstrapper.registerModuleDefinition(definition);
}

export function isFrameworkBootstrapped(): boolean {
  return bootstrapper.isBootstrapped();
}

export function getFrameworkSnapshot() {
  return bootstrapper.getSnapshot();
}