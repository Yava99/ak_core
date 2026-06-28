"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupBy = groupBy;
function groupBy(items, getKey) {
    return items.reduce((accumulator, item) => {
        const key = getKey(item);
        if (!accumulator[key]) {
            accumulator[key] = [];
        }
        accumulator[key].push(item);
        return accumulator;
    }, {});
}
//# sourceMappingURL=group-by.js.map