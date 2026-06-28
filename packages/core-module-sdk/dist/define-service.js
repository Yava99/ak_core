"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineService = defineService;
const validate_1 = require("./validate");
function defineService(name, instance, options) {
    return (0, validate_1.validateDefinedService)({
        name,
        instance,
        public: options?.public ?? false
    });
}
//# sourceMappingURL=define-service.js.map