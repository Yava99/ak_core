"use strict";
(() => {
  // ../core-logger/dist/client/public-api.js
  var LOG_LEVELS = {
    DEBUG: "debug",
    INFO: "info",
    WARN: "warn",
    ERROR: "error"
  };
  function formatLog(input) {
    const base = `[${input.timestamp}] [${input.context}] [${input.level.toUpperCase()}] ${input.message}`;
    if (!input.details || Object.keys(input.details).length === 0) {
      return base;
    }
    return `${base} ${JSON.stringify(input.details)}`;
  }
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
  function clientWriter(message) {
    console.log(message);
  }
  function createClientLogger(context) {
    return new BaseLogger(clientWriter, {
      context,
      minLevel: LOG_LEVELS.DEBUG
    });
  }

  // src/client/index.ts
  var logger = createClientLogger("core-events");
  logger.info("client loaded");
})();
