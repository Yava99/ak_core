"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineDependencies = defineDependencies;
const validate_1 = require("./validate");
function defineDependencies(...dependencies) {
    return (0, validate_1.validateDependencies)(dependencies);
}
//# sourceMappingURL=define-dependencies.js.map