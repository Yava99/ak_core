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

// src/server/database.ts
var database_exports = {};
__export(database_exports, {
  Database: () => Database
});
module.exports = __toCommonJS(database_exports);

// src/server/transaction.ts
var DatabaseTransaction = class {
  constructor(connection) {
    this.connection = connection;
  }
  async query(sql, values = []) {
    const [rows] = await this.connection.query(sql, values);
    return rows;
  }
  async execute(sql, values = []) {
    const [result] = await this.connection.execute(sql, values);
    return result;
  }
  async commit() {
    await this.connection.commit();
  }
  async rollback() {
    await this.connection.rollback();
  }
  async release() {
    this.connection.release();
  }
};

// src/server/database.ts
var Database = class {
  constructor(pool) {
    this.pool = pool;
  }
  async query(sql, values = []) {
    const [rows] = await this.pool.query(sql, values);
    return rows;
  }
  async execute(sql, values = []) {
    const [result] = await this.pool.execute(sql, values);
    return result;
  }
  async ping() {
    await this.pool.query("SELECT 1");
  }
  async beginTransaction() {
    const connection = await this.pool.getConnection();
    await connection.beginTransaction();
    return new DatabaseTransaction(connection);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Database
});
