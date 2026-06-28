"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createModuleDefinition = createModuleDefinition;
const naming_1 = require("./naming");
const normalize_1 = require("./normalize");
const setup_context_1 = require("./setup-context");
const validate_1 = require("./validate");
function createModuleDefinition(input) {
    (0, normalize_1.normalizeModuleInput)(input.name);
    let cached = null;
    async function ensureSetup(context) {
        if (cached) {
            return cached;
        }
        const sdkContext = (0, setup_context_1.createModuleSdkContext)(context);
        const rawResult = await input.setup(sdkContext);
        const result = (0, validate_1.validateModuleSetupResult)(rawResult);
        const normalizedServices = (0, normalize_1.normalizeServices)(result.services);
        const normalizedExports = (0, normalize_1.normalizeExports)(result.exports);
        for (const service of normalizedServices) {
            context.services.register((0, naming_1.buildQualifiedServiceName)(input.name, service.name), service.instance);
            if (service.public) {
                normalizedExports[(0, naming_1.buildQualifiedPublicServiceExportName)(input.name, service.name)] =
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
        async register(context) {
            await ensureSetup(context);
        },
        async start(context) {
            const setup = await ensureSetup(context);
            if (setup.result.start) {
                await setup.result.start();
            }
        },
        async stop(context) {
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
//# sourceMappingURL=module-factory.js.map