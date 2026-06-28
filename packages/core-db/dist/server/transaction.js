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

// src/server/transaction.ts
var transaction_exports = {};
__export(transaction_exports, {
  DatabaseTransaction: () => DatabaseTransaction
});
module.exports = __toCommonJS(transaction_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DatabaseTransaction
});
