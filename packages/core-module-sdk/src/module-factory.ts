import type {
  IModuleContext
} from "@fivem/core-bootstrap/server/public-api";
import {
  buildQualifiedPublicServiceExportName,
  buildQualifiedServiceName
} from "./naming";
import {
  normalizeExports,
  normalizeModuleInput,
  normalizeServices
} from "./normalize";
import { createModuleSdkContext } from "./setup-context";
import { validateModuleSetupResult } from "./validate";
import type {
  IDefinedService,
  IModuleSdkDefinitionInput,
  IModuleSetupResult,
  IResolvedModuleDefinition
} from "./types";

interface ICachedModuleSetup {
  result: IModuleSetupResult;
  services: IDefinedService[];
  exports: Record<string, unknown | (() => unknown)>;
}

export function createModuleDefinition(
  input: IModuleSdkDefinitionInput
): IResolvedModuleDefinition {
  normalizeModuleInput(input.name);

  let cached: ICachedModuleSetup | null = null;

  async function ensureSetup(context: IModuleContext): Promise<ICachedModuleSetup> {
    if (cached) {
      return cached;
    }

    const sdkContext = createModuleSdkContext(context);
    const rawResult = await input.setup(sdkContext);
    const result = validateModuleSetupResult(rawResult);

    const normalizedServices = normalizeServices(result.services);
    const normalizedExports = normalizeExports(result.exports);

    for (const service of normalizedServices) {
      context.services.register(
        buildQualifiedServiceName(input.name, service.name),
        service.instance
      );

      if (service.public) {
        normalizedExports[buildQualifiedPublicServiceExportName(input.name, service.name)] =
          () => service.instance;
      }
    }

    cached = {
      result,
      services: normalizedServices,
      exports: normalizedExports
    };

    return cached;
  }

  return {
    sdkName: input.name,
    name: input.name,
    dependencies: input.dependencies ?? [],
    async register(context: IModuleContext) {
      await ensureSetup(context);
    },
    async start(context: IModuleContext) {
      const setup = await ensureSetup(context);
      if (setup.result.start) {
        await setup.result.start();
      }
    },
    async stop(context: IModuleContext) {
      const setup = await ensureSetup(context);
      if (setup.result.stop) {
        await setup.result.stop();
      }
    },
    get exports() {
      return cached?.exports ?? {};
    }
  };
}