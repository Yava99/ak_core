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

// src/server/public-api.ts
var public_api_exports = {};
__export(public_api_exports, {
  BaseLogger: () => BaseLogger,
  LOG_LEVELS: () => LOG_LEVELS,
  createCoreLogger: () => createCoreLogger,
  formatLog: () => formatLog
});
module.exports = __toCommonJS(public_api_exports);

// src/shared/log-level.ts
var LOG_LEVELS = {
  DEBUG: "debug",
  INFO: "info",
  WARN: "warn",
  ERROR: "error"
};

// src/shared/formatter.ts
function formatLog(input) {
  const base = `[${input.timestamp}] [${input.context}] [${input.level.toUpperCase()}] ${input.message}`;
  if (!input.details || Object.keys(input.details).length === 0) {
    return base;
  }
  return `${base} ${JSON.stringify(input.details)}`;
}

// src/shared/base-logger.ts
var LOG_LEVEL_ORDER = {
  [LOG_LEVELS.DEBUG]: 10,
  [LOG_LEVELS.INFO]: 20,
  [LOG_LEVELS.WARN]: 30,
  [LOG_LEVELS.ERROR]: 40
};
var BaseLogger = class _BaseLogger {
  constructor(writer, options = {}) {
    this.writer = writer;
    this.context = options.context ?? "app";
    this.minLevel = options.minLevel ?? LOG_LEVELS.INFO;
  }
  child(context) {
    return new _BaseLogger(this.writer, {
      context,
      minLevel: this.minLevel
    });
  }
  debug(message, details) {
    this.write(LOG_LEVELS.DEBUG, message, details);
  }
  info(message, details) {
    this.write(LOG_LEVELS.INFO, message, details);
  }
  warn(message, details) {
    this.writeUnknown(LOG_LEVELS.WARN, message, details);
  }
  error(message, details) {
    this.writeUnknown(LOG_LEVELS.ERROR, message, details);
  }
  writeUnknown(level, value, details) {
    if (typeof value === "string") {
      this.write(level, value, details);
      return;
    }
    if (value instanceof Error) {
      this.write(level, value.message, {
        ...details,
        error: this.serializeError(value)
      });
      return;
    }
    this.write(level, "Unknown error", {
      ...details,
      value
    });
  }
  serializeError(error) {
    const typedError = error;
    return {
      name: typedError.name,
      message: typedError.message,
      stack: typedError.stack,
      code: typedError.code,
      details: typedError.details,
      cause: typedError.cause
    };
  }
  write(level, message, details) {
    if (!this.shouldLog(level)) {
      return;
    }
    const formattedMessage = formatLog({
      level,
      context: this.context,
      message,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      details
    });
    this.writer(formattedMessage);
  }
  shouldLog(level) {
    return LOG_LEVEL_ORDER[level] >= LOG_LEVEL_ORDER[this.minLevel];
  }
};

// src/server/public-api.ts
function serverWriter(message) {
  console.log(message);
}
function createCoreLogger(context) {
  return new BaseLogger(serverWriter, {
    context,
    minLevel: LOG_LEVELS.DEBUG
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BaseLogger,
  LOG_LEVELS,
  createCoreLogger,
  formatLog
});
