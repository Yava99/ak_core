import { registerFrameworkModule } from "@fivem/core-bootstrap/server/public-api";
import {
  defineDependencies,
  defineExports,
  defineModule,
  defineService
} from "@fivem/core-module-sdk";

class TestService {
  public getValue(): number {
    return 42;
  }
}

const moduleDefinition = defineModule({
  name: "fw-test-module",
  dependencies: defineDependencies("core-config", "core-logger"),
  async setup(context) {
    context.logger.info("fw-test-module setup");

    const testService = new TestService();

    return {
      services: [
        defineService("test-service", testService, { public: true })
      ],
      exports: defineExports({
        getFrameworkTestValue: () => testService.getValue()
      }),
      async start() {
        context.logger.info("fw-test-module started", {
          environment: context.config.server.environment,
          hasDb: context.db !== undefined
        });
      },
      async stop() {
        context.logger.info("fw-test-module stopped");
      }
    };
  }
});

registerFrameworkModule(moduleDefinition);