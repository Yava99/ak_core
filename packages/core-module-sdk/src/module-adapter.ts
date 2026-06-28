import {
  registerFrameworkModule
} from "@fivem/core-bootstrap/server/public-api";

import {
  validateModuleDefinitionInput,
  validateModuleSetupResult
} from "./validate";

import type {
  IModuleSdkDefinitionInput,
  IModuleSdkContext
} from "./types";

export function registerSdkModule(
  definition: IModuleSdkDefinitionInput
): void {
  const validatedDef = validateModuleDefinitionInput(definition);

  registerFrameworkModule({
    name: validatedDef.name,
    dependencies: validatedDef.dependencies,

    async register(context) {
      const sdkContext: IModuleSdkContext = {
        ...context,
        logger: context.services.resolve("core.logger"),
        config: context.services.resolve("core.config"),
        db: context.services.has("core.db")
          ? context.services.resolve("core.db")
          : undefined
      };

      const setupResult = await validatedDef.setup(sdkContext);
      const validatedResult = validateModuleSetupResult(setupResult);

      // services
      if (validatedResult.services) {
        for (const service of validatedResult.services) {
          context.services.register(service.name, service.instance);
        }
      }

      // exports
      if (validatedResult.exports) {
        for (const [name, value] of Object.entries(validatedResult.exports.entries)) {
          context.services.register(`${validatedDef.name}.${name}`, value);
        }
      }

      // lifecycle
      if (validatedResult.start) {
        await validatedResult.start();
      }
    },

    async stop(context) {
      // optional future support
    }
  });
}