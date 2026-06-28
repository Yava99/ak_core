"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSdkModule = registerSdkModule;
const public_api_1 = require("@fivem/core-bootstrap/server/public-api");
const validate_1 = require("./validate");
function registerSdkModule(definition) {
    const validatedDef = (0, validate_1.validateModuleDefinitionInput)(definition);
    (0, public_api_1.registerFrameworkModule)({
        name: validatedDef.name,
        dependencies: validatedDef.dependencies,
        async register(context) {
            const sdkContext = {
                ...context,
                logger: context.services.resolve("core.logger"),
                config: context.services.resolve("core.config"),
                db: context.services.has("core.db")
                    ? context.services.resolve("core.db")
                    : undefined
            };
            const setupResult = await validatedDef.setup(sdkContext);
            const validatedResult = (0, validate_1.validateModuleSetupResult)(setupResult);
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
//# sourceMappingURL=module-adapter.js.map