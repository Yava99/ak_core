import { createCoreLogger } from "@fivem/core-logger/server/public-api";
import { createKernelSnapshot } from "./diagnostics";
import { ModuleContext } from "./module-context";
import { ModuleRegistry } from "./module-registry";
import { resolveModuleOrder } from "./module-order";
import { ServiceRegistry } from "./service-registry";
import { parseDto } from "@fivem/core-validation";
import { ModuleDefinitionSchema } from "./schemas/module-definition-schema";
import {
  registerService as registerQualifiedExport,
  buildQualifiedExportName
} from "@fivem/core-exports/server/public-api";
import {
  validateFrameworkKernelSnapshot,
  validateModuleLifecycleState,
  validateModuleState
} from "./validate";
import type {
  IFrameworkKernelSnapshot,
  IFrameworkModuleDefinition,
  IModuleDefinition,
  IModuleState,
  ModuleLifecycleState
} from "./types";

export class Bootstrapper {
  private readonly logger = createCoreLogger("core-bootstrap");
  private readonly services = new ServiceRegistry();
  private readonly modules = new ModuleRegistry();
  private readonly moduleStates = new Map<string, IModuleState>();
  private hasBootstrapped = false;

  public registerModuleDefinition(definition: IFrameworkModuleDefinition): void {
    const validated = parseDto(ModuleDefinitionSchema, definition);
    this.modules.register(validated);

    this.moduleStates.set(validated.name, validateModuleState({
      name: validated.name,
      state: "created",
      dependencies: validated.dependencies ?? []
    }));

    this.logger.debug("module definition registered", {
      module: validated.name,
      dependencies: validated.dependencies ?? []
    });
  }

  public async bootstrap(): Promise<void> {
    if (this.hasBootstrapped) {
      this.logger.warn("bootstrap already executed");
      return;
    }

    const orderedModules = resolveModuleOrder(this.modules.list());

    for (const moduleDefinition of orderedModules) {
      const context = new ModuleContext(moduleDefinition.name, this.services);

      try {
        this.setState(moduleDefinition.name, "registering");
        await moduleDefinition.register(context);
        this.setState(moduleDefinition.name, "registered");

        this.logger.info("module registered", {
          module: moduleDefinition.name
        });

        if (moduleDefinition.exports) {
          for (const [exportName, exportValue] of Object.entries(moduleDefinition.exports)) {
            const qualified = buildQualifiedExportName(moduleDefinition.name, exportName);

            registerQualifiedExport(qualified, exportValue);
          }

          this.logger.info("module exports registered", {
            module: moduleDefinition.name,
            exports: Object.keys(moduleDefinition.exports)
          });
        }

        if (moduleDefinition.start) {
          this.setState(moduleDefinition.name, "starting");
          await moduleDefinition.start(context);
          this.setState(moduleDefinition.name, "started");

          this.logger.info("module started", {
            module: moduleDefinition.name
          });
        }
      } catch (error) {
        this.setState(moduleDefinition.name, "failed");
        this.logger.error(error, {
          module: moduleDefinition.name
        });
        throw error;
      }
    }

    this.hasBootstrapped = true;
  }

  public async shutdown(): Promise<void> {
    const modules = [...this.modules.list()].reverse();

    for (const moduleDefinition of modules) {
      if (!moduleDefinition.stop) {
        continue;
      }

      const context = new ModuleContext(moduleDefinition.name, this.services);

      try {
        this.setState(moduleDefinition.name, "stopping");
        await moduleDefinition.stop(context);
        this.setState(moduleDefinition.name, "stopped");

        this.logger.info("module stopped", {
          module: moduleDefinition.name
        });
      } catch (error) {
        this.setState(moduleDefinition.name, "failed");
        this.logger.error(error, {
          module: moduleDefinition.name
        });
      }
    }
  }

  public getServiceRegistry(): ServiceRegistry {
    return this.services;
  }

  public getSnapshot(): IFrameworkKernelSnapshot {
    return validateFrameworkKernelSnapshot(
      createKernelSnapshot(this.services, this.modules, this.moduleStates)
    );
  }

  public isBootstrapped(): boolean {
    return this.hasBootstrapped;
  }

  private setState(name: string, state: ModuleLifecycleState): void {
    const existing = this.moduleStates.get(name);

    if (!existing) {
      return;
    }

    existing.state = validateModuleLifecycleState(state);
  }
}