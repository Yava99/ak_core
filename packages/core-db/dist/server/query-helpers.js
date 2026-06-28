"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/server/query-helpers.ts
var query_helpers_exports = {};
__export(query_helpers_exports, {
  executeStatement: () => executeStatement,
  exists: () => exists,
  queryMany: () => queryMany,
  queryOne: () => queryOne
});
module.exports = __toCommonJS(query_helpers_exports);
async function queryMany(executor, sql, values = []) {
  return executor.query(sql, values);
}
async function queryOne(executor, sql, values = []) {
  const rows = await executor.query(sql, values);
  return rows[0] ?? null;
}
async function executeStatement(executor, sql, values = []) {
  return executor.execute(sql, values);
}
async function exists(executor, sql, values = []) {
  const row = await queryOne(executor, sql, values);
  return Boolean(row);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  executeStatement,
  exists,
  queryMany,
  queryOne
});
