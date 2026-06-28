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

// src/server/repository/base-repository.ts
var base_repository_exports = {};
__export(base_repository_exports, {
  BaseRepository: () => BaseRepository
});
module.exports = __toCommonJS(base_repository_exports);

// src/server/query-helpers.ts
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

// src/server/repository/base-repository.ts
var BaseRepository = class {
  constructor(executor) {
    this.executor = executor;
  }
  async queryMany(sql, values = []) {
    return queryMany(this.executor, sql, values);
  }
  async queryOne(sql, values = []) {
    return queryOne(this.executor, sql, values);
  }
  async execute(sql, values = []) {
    return executeStatement(this.executor, sql, values);
  }
  async exists(sql, values = []) {
    return exists(this.executor, sql, values);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BaseRepository
});
