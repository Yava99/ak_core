"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createModuleSdkContext = createModuleSdkContext;
const public_api_1 = require("@fivem/core-config/server/public-api");
const db_1 = require("@fivem/core-db/server/db");
const public_api_2 = require("@fivem/core-logger/server/public-api");
function createModuleSdkContext(context) {
    const logger = (0, public_api_2.createCoreLogger)(context.moduleName);
    const config = (0, public_api_1.getAppConfig)();
    let db;
    try {
        db = (0, db_1.getDatabase)();
    }
    catch {
        db = undefined;
    }
    return {
        ...context,
        logger,
        config,
        db,
        services: context.services
    };
}
//# sourceMappingURL=setup-context.js.map