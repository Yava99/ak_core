"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// ../core-logger/dist/server/public-api.js
var require_public_api = __commonJS({
  "../core-logger/dist/server/public-api.js"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var public_api_exports = {};
    __export(public_api_exports, {
      BaseLogger: () => BaseLogger,
      LOG_LEVELS: () => LOG_LEVELS,
      createCoreLogger: () => createCoreLogger3,
      formatLog: () => formatLog
    });
    module2.exports = __toCommonJS(public_api_exports);
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
    function serverWriter(message) {
      console.log(message);
    }
    function createCoreLogger3(context) {
      return new BaseLogger(serverWriter, {
        context,
        minLevel: LOG_LEVELS.DEBUG
      });
    }
  }
});

// ../core-errors/dist/types/error-details.js
var require_error_details = __commonJS({
  "../core-errors/dist/types/error-details.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
  }
});

// ../core-errors/dist/codes/error-codes.js
var require_error_codes = __commonJS({
  "../core-errors/dist/codes/error-codes.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ERROR_CODES = void 0;
    exports2.ERROR_CODES = {
      UNKNOWN: "UNKNOWN",
      VALIDATION_FAILED: "VALIDATION_FAILED",
      CONFIG_MISSING: "CONFIG_MISSING",
      CONFIG_INVALID: "CONFIG_INVALID",
      INFRASTRUCTURE_FAILURE: "INFRASTRUCTURE_FAILURE",
      DATABASE_NOT_INITIALIZED: "DATABASE_NOT_INITIALIZED",
      DATABASE_CONNECTION_FAILED: "DATABASE_CONNECTION_FAILED",
      DOMAIN_RULE_VIOLATION: "DOMAIN_RULE_VIOLATION"
    };
  }
});

// ../core-errors/dist/base/app-error.js
var require_app_error = __commonJS({
  "../core-errors/dist/base/app-error.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.AppError = void 0;
    var AppError = class extends Error {
      constructor(message, code, details, cause) {
        super(message);
        this.name = new.target.name;
        this.code = code;
        this.details = details;
        this.cause = cause;
      }
    };
    exports2.AppError = AppError;
  }
});

// ../core-errors/dist/validation/validation-error.js
var require_validation_error = __commonJS({
  "../core-errors/dist/validation/validation-error.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ValidationError = void 0;
    var app_error_1 = require_app_error();
    var error_codes_1 = require_error_codes();
    var ValidationError = class extends app_error_1.AppError {
      constructor(message, details, cause) {
        super(message, error_codes_1.ERROR_CODES.VALIDATION_FAILED, details, cause);
      }
    };
    exports2.ValidationError = ValidationError;
  }
});

// ../core-errors/dist/config/config-error.js
var require_config_error = __commonJS({
  "../core-errors/dist/config/config-error.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ConfigError = void 0;
    var app_error_1 = require_app_error();
    var ConfigError = class extends app_error_1.AppError {
      constructor(message, code, details, cause) {
        super(message, code, details, cause);
      }
    };
    exports2.ConfigError = ConfigError;
  }
});

// ../core-errors/dist/infrastructure/infrastructure-error.js
var require_infrastructure_error = __commonJS({
  "../core-errors/dist/infrastructure/infrastructure-error.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.InfrastructureError = void 0;
    var app_error_1 = require_app_error();
    var error_codes_1 = require_error_codes();
    var InfrastructureError4 = class extends app_error_1.AppError {
      constructor(message, details, cause) {
        super(message, error_codes_1.ERROR_CODES.INFRASTRUCTURE_FAILURE, details, cause);
      }
    };
    exports2.InfrastructureError = InfrastructureError4;
  }
});

// ../core-errors/dist/domain/domain-error.js
var require_domain_error = __commonJS({
  "../core-errors/dist/domain/domain-error.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.DomainError = void 0;
    var app_error_1 = require_app_error();
    var error_codes_1 = require_error_codes();
    var DomainError3 = class extends app_error_1.AppError {
      constructor(message, details, cause) {
        super(message, error_codes_1.ERROR_CODES.DOMAIN_RULE_VIOLATION, details, cause);
      }
    };
    exports2.DomainError = DomainError3;
  }
});

// ../core-errors/dist/index.js
var require_dist = __commonJS({
  "../core-errors/dist/index.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __exportStar = exports2 && exports2.__exportStar || function(m, exports3) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p)) __createBinding(exports3, m, p);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    __exportStar(require_error_details(), exports2);
    __exportStar(require_error_codes(), exports2);
    __exportStar(require_app_error(), exports2);
    __exportStar(require_validation_error(), exports2);
    __exportStar(require_config_error(), exports2);
    __exportStar(require_infrastructure_error(), exports2);
    __exportStar(require_domain_error(), exports2);
  }
});

// ../core-validation/dist/utils/join-path.js
var require_join_path = __commonJS({
  "../core-validation/dist/utils/join-path.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.joinPath = joinPath;
    function joinPath(path) {
      if (path.length === 0) {
        return "";
      }
      let result = "";
      for (const segment of path) {
        if (typeof segment === "number") {
          result += `[${segment}]`;
          continue;
        }
        if (result.length === 0) {
          result += segment;
          continue;
        }
        result += `.${segment}`;
      }
      return result;
    }
  }
});

// ../core-validation/dist/errors/validation-error.js
var require_validation_error2 = __commonJS({
  "../core-validation/dist/errors/validation-error.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ValidationError = void 0;
    var core_errors_1 = require_dist();
    var join_path_1 = require_join_path();
    var ValidationError = class extends core_errors_1.InfrastructureError {
      constructor(message, issues) {
        super(message, {
          module: "core-validation",
          code: "VALIDATION_FAILED"
        });
        this.name = "ValidationError";
        this.issues = issues;
      }
      format() {
        if (this.issues.length === 0) {
          return this.message;
        }
        const lines = this.issues.map((issue, index) => {
          const path = (0, join_path_1.joinPath)(issue.path);
          const location = path.length > 0 ? path : "<root>";
          return `${index + 1}. ${location}: ${issue.message}`;
        });
        return [this.message, ...lines].join("\n");
      }
      flatten() {
        const formErrors = [];
        const fieldErrors = {};
        for (const issue of this.issues) {
          const path = (0, join_path_1.joinPath)(issue.path);
          if (path.length === 0) {
            formErrors.push(issue.message);
            continue;
          }
          if (!fieldErrors[path]) {
            fieldErrors[path] = [];
          }
          fieldErrors[path].push(issue.message);
        }
        return {
          formErrors,
          fieldErrors
        };
      }
      getFieldErrors() {
        return this.flatten().fieldErrors;
      }
      getFormErrors() {
        return this.flatten().formErrors;
      }
      toString() {
        return this.format();
      }
    };
    exports2.ValidationError = ValidationError;
  }
});

// ../core-validation/dist/core/base-schema.js
var require_base_schema = __commonJS({
  "../core-validation/dist/core/base-schema.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.BaseSchema = void 0;
    var validation_error_1 = require_validation_error2();
    var BaseSchema = class {
      // =========================
      // SYNC
      // =========================
      parse(input) {
        const result = this.safeParse(input);
        if (!result.success) {
          throw result.error;
        }
        return result.data;
      }
      safeParse(input) {
        const context = {
          path: [],
          issues: []
        };
        const result = this._parse(context, input);
        if (!result.success) {
          return {
            success: false,
            error: new validation_error_1.ValidationError("Validation failed", context.issues)
          };
        }
        return {
          success: true,
          data: result.data
        };
      }
      assert(input) {
        const result = this.safeParse(input);
        if (!result.success) {
          throw result.error;
        }
      }
      // =========================
      // ASYNC
      // =========================
      async parseAsync(input) {
        const result = await this.safeParseAsync(input);
        if (!result.success) {
          throw result.error;
        }
        return result.data;
      }
      async safeParseAsync(input) {
        const context = {
          path: [],
          issues: []
        };
        const result = await this._parseAsync(context, input);
        if (!result.success) {
          return {
            success: false,
            error: new validation_error_1.ValidationError("Validation failed", context.issues)
          };
        }
        return {
          success: true,
          data: result.data
        };
      }
      async _parseAsync(context, input) {
        return this._parse(context, input);
      }
    };
    exports2.BaseSchema = BaseSchema;
  }
});

// ../core-validation/dist/core/issue-factory.js
var require_issue_factory = __commonJS({
  "../core-validation/dist/core/issue-factory.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.createIssue = createIssue;
    function createIssue(path, code, message, options) {
      return {
        path: [...path],
        code,
        message,
        expected: options?.expected,
        received: options?.received,
        metadata: options?.metadata
      };
    }
  }
});

// ../core-validation/dist/core/parse-status.js
var require_parse_status = __commonJS({
  "../core-validation/dist/core/parse-status.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.FAIL = exports2.OK = void 0;
    var OK = (data) => ({
      success: true,
      data
    });
    exports2.OK = OK;
    exports2.FAIL = {
      success: false
    };
  }
});

// ../core-validation/dist/schemas/effects-schema.js
var require_effects_schema = __commonJS({
  "../core-validation/dist/schemas/effects-schema.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.EffectsSchema = void 0;
    var base_schema_1 = require_base_schema();
    var issue_factory_1 = require_issue_factory();
    var parse_status_1 = require_parse_status();
    var EffectsSchema = class _EffectsSchema extends base_schema_1.BaseSchema {
      constructor(baseSchema, effects) {
        super();
        this.baseSchema = baseSchema;
        this.effects = effects;
      }
      // =========================
      // SYNC
      // =========================
      _parse(context, input) {
        const baseResult = this.baseSchema["_parse"](context, input);
        if (!baseResult.success) {
          return parse_status_1.FAIL;
        }
        let value = baseResult.data;
        for (const effect of this.effects) {
          if (effect.type === "refine") {
            if (!effect.check(value)) {
              context.issues.push((0, issue_factory_1.createIssue)(context.path, "custom", effect.message ?? "Validation failed"));
              return parse_status_1.FAIL;
            }
            continue;
          }
          if (effect.type === "transform") {
            value = effect.transform(value);
            continue;
          }
          if (effect.type === "superRefine") {
            effect.handler(value, context);
            if (context.issues.length > 0) {
              return parse_status_1.FAIL;
            }
            continue;
          }
        }
        return (0, parse_status_1.OK)(value);
      }
      // =========================
      // ASYNC
      // =========================
      async _parseAsync(context, input) {
        const baseResult = await this.baseSchema["_parseAsync"](context, input);
        if (!baseResult.success) {
          return parse_status_1.FAIL;
        }
        let value = baseResult.data;
        for (const effect of this.effects) {
          if (effect.type === "refine") {
            if (!effect.check(value)) {
              context.issues.push((0, issue_factory_1.createIssue)(context.path, "custom", effect.message ?? "Validation failed"));
              return parse_status_1.FAIL;
            }
            continue;
          }
          if (effect.type === "refineAsync") {
            if (!await effect.check(value)) {
              context.issues.push((0, issue_factory_1.createIssue)(context.path, "custom", effect.message ?? "Validation failed"));
              return parse_status_1.FAIL;
            }
            continue;
          }
          if (effect.type === "transform") {
            value = effect.transform(value);
            continue;
          }
          if (effect.type === "transformAsync") {
            value = await effect.transform(value);
            continue;
          }
          if (effect.type === "superRefine") {
            effect.handler(value, context);
            if (context.issues.length > 0) {
              return parse_status_1.FAIL;
            }
            continue;
          }
          if (effect.type === "superRefineAsync") {
            await effect.handler(value, context);
            if (context.issues.length > 0) {
              return parse_status_1.FAIL;
            }
          }
        }
        return (0, parse_status_1.OK)(value);
      }
      // =========================
      // API
      // =========================
      refine(check, message) {
        return new _EffectsSchema(this.baseSchema, [
          ...this.effects,
          { type: "refine", check, message }
        ]);
      }
      refineAsync(check, message) {
        return new _EffectsSchema(this.baseSchema, [
          ...this.effects,
          { type: "refineAsync", check, message }
        ]);
      }
      transform(transform) {
        return new _EffectsSchema(this.baseSchema, [
          ...this.effects,
          { type: "transform", transform }
        ]);
      }
      transformAsync(transform) {
        return new _EffectsSchema(this.baseSchema, [
          ...this.effects,
          { type: "transformAsync", transform }
        ]);
      }
      superRefine(handler) {
        return new _EffectsSchema(this.baseSchema, [
          ...this.effects,
          { type: "superRefine", handler }
        ]);
      }
      superRefineAsync(handler) {
        return new _EffectsSchema(this.baseSchema, [
          ...this.effects,
          { type: "superRefineAsync", handler }
        ]);
      }
    };
    exports2.EffectsSchema = EffectsSchema;
  }
});

// ../core-validation/dist/schemas/nullable-schema.js
var require_nullable_schema = __commonJS({
  "../core-validation/dist/schemas/nullable-schema.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.NullableSchema = void 0;
    var base_schema_1 = require_base_schema();
    var parse_status_1 = require_parse_status();
    var NullableSchema = class extends base_schema_1.BaseSchema {
      constructor(innerSchema) {
        super();
        this.innerSchema = innerSchema;
      }
      _parse(context, input) {
        if (input === null) {
          return (0, parse_status_1.OK)(null);
        }
        return this.innerSchema["_parse"](context, input);
      }
    };
    exports2.NullableSchema = NullableSchema;
  }
});

// ../core-validation/dist/schemas/optional-schema.js
var require_optional_schema = __commonJS({
  "../core-validation/dist/schemas/optional-schema.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.OptionalSchema = void 0;
    var base_schema_1 = require_base_schema();
    var parse_status_1 = require_parse_status();
    var OptionalSchema = class extends base_schema_1.BaseSchema {
      constructor(innerSchema) {
        super();
        this.innerSchema = innerSchema;
        this.__optionalBrand = true;
      }
      _parse(context, input) {
        if (input === void 0) {
          return (0, parse_status_1.OK)(void 0);
        }
        return this.innerSchema["_parse"](context, input);
      }
    };
    exports2.OptionalSchema = OptionalSchema;
  }
});

// ../core-validation/dist/core/base-schema-extensions.js
var require_base_schema_extensions = __commonJS({
  "../core-validation/dist/core/base-schema-extensions.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var base_schema_1 = require_base_schema();
    var effects_schema_1 = require_effects_schema();
    var nullable_schema_1 = require_nullable_schema();
    var optional_schema_1 = require_optional_schema();
    base_schema_1.BaseSchema.prototype.optional = function() {
      return new optional_schema_1.OptionalSchema(this);
    };
    base_schema_1.BaseSchema.prototype.nullable = function() {
      return new nullable_schema_1.NullableSchema(this);
    };
    base_schema_1.BaseSchema.prototype.refine = function(check, message) {
      return new effects_schema_1.EffectsSchema(this, [
        {
          type: "refine",
          check,
          message
        }
      ]);
    };
    base_schema_1.BaseSchema.prototype.transform = function(transform) {
      return new effects_schema_1.EffectsSchema(this, [
        {
          type: "transform",
          transform
        }
      ]);
    };
    base_schema_1.BaseSchema.prototype.superRefine = function(handler) {
      return new effects_schema_1.EffectsSchema(this, [
        {
          type: "superRefine",
          handler
        }
      ]);
    };
    base_schema_1.BaseSchema.prototype.refineAsync = function(check, message) {
      return new effects_schema_1.EffectsSchema(this, [
        { type: "refineAsync", check, message }
      ]);
    };
    base_schema_1.BaseSchema.prototype.transformAsync = function(transform) {
      return new effects_schema_1.EffectsSchema(this, [
        { type: "transformAsync", transform }
      ]);
    };
    base_schema_1.BaseSchema.prototype.superRefineAsync = function(handler) {
      return new effects_schema_1.EffectsSchema(this, [
        { type: "superRefineAsync", handler }
      ]);
    };
  }
});

// ../core-validation/dist/schemas/any-schema.js
var require_any_schema = __commonJS({
  "../core-validation/dist/schemas/any-schema.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.AnySchema = void 0;
    var base_schema_1 = require_base_schema();
    var parse_status_1 = require_parse_status();
    var AnySchema = class extends base_schema_1.BaseSchema {
      _parse(_context, input) {
        return (0, parse_status_1.OK)(input);
      }
    };
    exports2.AnySchema = AnySchema;
  }
});

// ../core-validation/dist/core/schema-internal.js
var require_schema_internal = __commonJS({
  "../core-validation/dist/core/schema-internal.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.pushPath = pushPath;
    exports2.popPath = popPath;
    function pushPath(ctx, key) {
      ctx.path.push(key);
    }
    function popPath(ctx) {
      ctx.path.pop();
    }
  }
});

// ../core-validation/dist/utils/format-value.js
var require_format_value = __commonJS({
  "../core-validation/dist/utils/format-value.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.formatValue = formatValue;
    function formatValue(value) {
      if (typeof value === "string") {
        return `"${value}"`;
      }
      if (typeof value === "number" || typeof value === "boolean" || value === null || value === void 0) {
        return String(value);
      }
      if (typeof value === "bigint") {
        return `${value}n`;
      }
      if (typeof value === "symbol") {
        return value.toString();
      }
      if (typeof value === "function") {
        return `[Function ${value.name || "anonymous"}]`;
      }
      if (value instanceof Date) {
        return `Date(${value.toISOString()})`;
      }
      try {
        return JSON.stringify(value);
      } catch {
        return Object.prototype.toString.call(value);
      }
    }
  }
});

// ../core-validation/dist/schemas/array-schema.js
var require_array_schema = __commonJS({
  "../core-validation/dist/schemas/array-schema.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ArraySchema = void 0;
    var base_schema_1 = require_base_schema();
    var issue_factory_1 = require_issue_factory();
    var parse_status_1 = require_parse_status();
    var schema_internal_1 = require_schema_internal();
    var format_value_1 = require_format_value();
    var ArraySchema = class _ArraySchema extends base_schema_1.BaseSchema {
      constructor(itemSchema, options) {
        super();
        this.itemSchema = itemSchema;
        this.constraints = options?.constraints ?? [];
      }
      min(length, message) {
        this.assertValidNonNegativeInteger(length, "min");
        return this.withConstraint({
          kind: "min",
          value: length,
          message
        });
      }
      max(length, message) {
        this.assertValidNonNegativeInteger(length, "max");
        return this.withConstraint({
          kind: "max",
          value: length,
          message
        });
      }
      length(length, message) {
        this.assertValidNonNegativeInteger(length, "length");
        return this.withConstraint({
          kind: "length",
          value: length,
          message
        });
      }
      nonempty(message) {
        return this.min(1, message ?? "Array must not be empty");
      }
      _parse(context, input) {
        if (!Array.isArray(input)) {
          context.issues.push((0, issue_factory_1.createIssue)(context.path, "invalid_type", `Expected array, received ${(0, format_value_1.formatValue)(input)}`, {
            expected: "array",
            received: input
          }));
          return parse_status_1.FAIL;
        }
        const array = input;
        for (const constraint of this.constraints) {
          const result = this.applyConstraint(context, array, constraint);
          if (!result.success) {
            return parse_status_1.FAIL;
          }
        }
        const output = [];
        for (let i = 0; i < array.length; i++) {
          const item = array[i];
          (0, schema_internal_1.pushPath)(context, i);
          const result = this.itemSchema["_parse"](context, item);
          (0, schema_internal_1.popPath)(context);
          if (!result.success) {
            return parse_status_1.FAIL;
          }
          output.push(result.data);
        }
        return (0, parse_status_1.OK)(output);
      }
      withConstraint(constraint) {
        return new _ArraySchema(this.itemSchema, {
          constraints: [...this.constraints, constraint]
        });
      }
      applyConstraint(context, array, constraint) {
        switch (constraint.kind) {
          case "min":
            return this.checkMin(context, array, constraint.value, constraint.message);
          case "max":
            return this.checkMax(context, array, constraint.value, constraint.message);
          case "length":
            return this.checkLength(context, array, constraint.value, constraint.message);
          default: {
            const exhaustiveCheck = constraint;
            throw new Error(`Unhandled array constraint: ${JSON.stringify(exhaustiveCheck)}`);
          }
        }
      }
      checkMin(context, array, min, message) {
        if (array.length >= min) {
          return (0, parse_status_1.OK)(array);
        }
        context.issues.push((0, issue_factory_1.createIssue)(context.path, "array_too_short", message ?? `Array must contain at least ${min} item(s)`, {
          expected: `length >= ${min}`,
          received: array,
          metadata: {
            minLength: min,
            actualLength: array.length
          }
        }));
        return parse_status_1.FAIL;
      }
      checkMax(context, array, max, message) {
        if (array.length <= max) {
          return (0, parse_status_1.OK)(array);
        }
        context.issues.push((0, issue_factory_1.createIssue)(context.path, "array_too_long", message ?? `Array must contain at most ${max} item(s)`, {
          expected: `length <= ${max}`,
          received: array,
          metadata: {
            maxLength: max,
            actualLength: array.length
          }
        }));
        return parse_status_1.FAIL;
      }
      checkLength(context, array, length, message) {
        if (array.length === length) {
          return (0, parse_status_1.OK)(array);
        }
        const code = array.length < length ? "array_too_short" : "array_too_long";
        context.issues.push((0, issue_factory_1.createIssue)(context.path, code, message ?? `Array must contain exactly ${length} item(s)`, {
          expected: `length === ${length}`,
          received: array,
          metadata: {
            expectedLength: length,
            actualLength: array.length
          }
        }));
        return parse_status_1.FAIL;
      }
      assertValidNonNegativeInteger(value, method) {
        if (!Number.isInteger(value) || value < 0) {
          throw new TypeError(`ArraySchema.${method} expected a non-negative integer`);
        }
      }
    };
    exports2.ArraySchema = ArraySchema;
  }
});

// ../core-validation/dist/schemas/boolean-schema.js
var require_boolean_schema = __commonJS({
  "../core-validation/dist/schemas/boolean-schema.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.BooleanSchema = void 0;
    var base_schema_1 = require_base_schema();
    var issue_factory_1 = require_issue_factory();
    var parse_status_1 = require_parse_status();
    var format_value_1 = require_format_value();
    var BooleanSchema = class extends base_schema_1.BaseSchema {
      _parse(context, input) {
        if (typeof input !== "boolean") {
          context.issues.push((0, issue_factory_1.createIssue)(context.path, "invalid_type", `Expected boolean, received ${(0, format_value_1.formatValue)(input)}`, {
            expected: "boolean",
            received: input
          }));
          return parse_status_1.FAIL;
        }
        return (0, parse_status_1.OK)(input);
      }
    };
    exports2.BooleanSchema = BooleanSchema;
  }
});

// ../core-validation/dist/schemas/custom-schema.js
var require_custom_schema = __commonJS({
  "../core-validation/dist/schemas/custom-schema.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.CustomSchema = void 0;
    var base_schema_1 = require_base_schema();
    var issue_factory_1 = require_issue_factory();
    var parse_status_1 = require_parse_status();
    var CustomSchema = class extends base_schema_1.BaseSchema {
      constructor(check, message) {
        super();
        this.check = check;
        this.message = message;
      }
      _parse(context, input) {
        if (!this.check(input)) {
          context.issues.push((0, issue_factory_1.createIssue)(context.path, "custom", this.message, {
            received: input
          }));
          return parse_status_1.FAIL;
        }
        return (0, parse_status_1.OK)(input);
      }
    };
    exports2.CustomSchema = CustomSchema;
  }
});

// ../core-validation/dist/schemas/enum-schema.js
var require_enum_schema = __commonJS({
  "../core-validation/dist/schemas/enum-schema.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.EnumSchema = void 0;
    var base_schema_1 = require_base_schema();
    var issue_factory_1 = require_issue_factory();
    var parse_status_1 = require_parse_status();
    var format_value_1 = require_format_value();
    var EnumSchema = class extends base_schema_1.BaseSchema {
      constructor(values) {
        super();
        this.values = values;
        this.valuesSet = new Set(values);
      }
      getValues() {
        return this.values;
      }
      _parse(context, input) {
        if (typeof input !== "string") {
          context.issues.push((0, issue_factory_1.createIssue)(context.path, "invalid_type", `Expected enum string, received ${(0, format_value_1.formatValue)(input)}`, {
            expected: `one of: ${this.values.join(", ")}`,
            received: input,
            metadata: {
              allowedValues: [...this.values]
            }
          }));
          return parse_status_1.FAIL;
        }
        if (!this.valuesSet.has(input)) {
          context.issues.push((0, issue_factory_1.createIssue)(context.path, "invalid_enum_value", `Expected one of ${this.values.map((value) => (0, format_value_1.formatValue)(value)).join(", ")}, received ${(0, format_value_1.formatValue)(input)}`, {
            expected: `one of: ${this.values.join(", ")}`,
            received: input,
            metadata: {
              allowedValues: [...this.values]
            }
          }));
          return parse_status_1.FAIL;
        }
        return (0, parse_status_1.OK)(input);
      }
    };
    exports2.EnumSchema = EnumSchema;
  }
});

// ../core-validation/dist/schemas/literal-schema.js
var require_literal_schema = __commonJS({
  "../core-validation/dist/schemas/literal-schema.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.LiteralSchema = void 0;
    var base_schema_1 = require_base_schema();
    var issue_factory_1 = require_issue_factory();
    var parse_status_1 = require_parse_status();
    var format_value_1 = require_format_value();
    var LiteralSchema = class extends base_schema_1.BaseSchema {
      constructor(literal) {
        super();
        this.literal = literal;
      }
      getValue() {
        return this.literal;
      }
      _parse(context, input) {
        if (input !== this.literal) {
          context.issues.push((0, issue_factory_1.createIssue)(context.path, "invalid_literal", `Expected literal ${(0, format_value_1.formatValue)(this.literal)}, received ${(0, format_value_1.formatValue)(input)}`, {
            expected: (0, format_value_1.formatValue)(this.literal),
            received: input,
            metadata: {
              literal: this.literal
            }
          }));
          return parse_status_1.FAIL;
        }
        return (0, parse_status_1.OK)(this.literal);
      }
    };
    exports2.LiteralSchema = LiteralSchema;
  }
});

// ../core-validation/dist/schemas/never-schema.js
var require_never_schema = __commonJS({
  "../core-validation/dist/schemas/never-schema.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.NeverSchema = void 0;
    var base_schema_1 = require_base_schema();
    var issue_factory_1 = require_issue_factory();
    var parse_status_1 = require_parse_status();
    var format_value_1 = require_format_value();
    var NeverSchema = class extends base_schema_1.BaseSchema {
      _parse(context, input) {
        context.issues.push((0, issue_factory_1.createIssue)(context.path, "invalid_type", `Expected never, received ${(0, format_value_1.formatValue)(input)}`, {
          expected: "never",
          received: input
        }));
        return parse_status_1.FAIL;
      }
    };
    exports2.NeverSchema = NeverSchema;
  }
});

// ../core-validation/dist/schemas/number-schema.js
var require_number_schema = __commonJS({
  "../core-validation/dist/schemas/number-schema.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.NumberSchema = void 0;
    var base_schema_1 = require_base_schema();
    var issue_factory_1 = require_issue_factory();
    var parse_status_1 = require_parse_status();
    var format_value_1 = require_format_value();
    var NumberSchema = class _NumberSchema extends base_schema_1.BaseSchema {
      constructor(options) {
        super();
        this.constraints = options?.constraints ?? [];
      }
      min(value, message) {
        this.assertValidNumber(value, "min");
        return this.withConstraint({
          kind: "min",
          value,
          message
        });
      }
      max(value, message) {
        this.assertValidNumber(value, "max");
        return this.withConstraint({
          kind: "max",
          value,
          message
        });
      }
      int(message) {
        return this.withConstraint({
          kind: "int",
          message
        });
      }
      positive(message) {
        return this.withConstraint({
          kind: "positive",
          message
        });
      }
      nonnegative(message) {
        return this.withConstraint({
          kind: "nonnegative",
          message
        });
      }
      negative(message) {
        return this.withConstraint({
          kind: "negative",
          message
        });
      }
      nonpositive(message) {
        return this.withConstraint({
          kind: "nonpositive",
          message
        });
      }
      finite(message) {
        return this.withConstraint({
          kind: "finite",
          message
        });
      }
      safe(message) {
        return this.withConstraint({
          kind: "safe",
          message
        });
      }
      _parse(context, input) {
        if (typeof input !== "number") {
          context.issues.push((0, issue_factory_1.createIssue)(context.path, "invalid_type", `Expected number, received ${(0, format_value_1.formatValue)(input)}`, {
            expected: "number",
            received: input
          }));
          return parse_status_1.FAIL;
        }
        const value = input;
        for (const constraint of this.constraints) {
          const result = this.applyConstraint(context, value, constraint);
          if (!result.success) {
            return parse_status_1.FAIL;
          }
        }
        return (0, parse_status_1.OK)(value);
      }
      withConstraint(constraint) {
        return new _NumberSchema({
          constraints: [...this.constraints, constraint]
        });
      }
      applyConstraint(context, value, constraint) {
        switch (constraint.kind) {
          case "min":
            return this.checkMin(context, value, constraint.value, constraint.message);
          case "max":
            return this.checkMax(context, value, constraint.value, constraint.message);
          case "int":
            return this.checkInt(context, value, constraint.message);
          case "positive":
            return this.checkPositive(context, value, constraint.message);
          case "nonnegative":
            return this.checkNonNegative(context, value, constraint.message);
          case "negative":
            return this.checkNegative(context, value, constraint.message);
          case "nonpositive":
            return this.checkNonPositive(context, value, constraint.message);
          case "finite":
            return this.checkFinite(context, value, constraint.message);
          case "safe":
            return this.checkSafe(context, value, constraint.message);
          default: {
            const exhaustiveCheck = constraint;
            throw new Error(`Unhandled number constraint: ${JSON.stringify(exhaustiveCheck)}`);
          }
        }
      }
      checkMin(context, value, min, message) {
        if (value >= min)
          return (0, parse_status_1.OK)(value);
        context.issues.push((0, issue_factory_1.createIssue)(context.path, "number_too_small", message ?? `Number must be >= ${min}`, {
          expected: `>= ${min}`,
          received: value
        }));
        return parse_status_1.FAIL;
      }
      checkMax(context, value, max, message) {
        if (value <= max)
          return (0, parse_status_1.OK)(value);
        context.issues.push((0, issue_factory_1.createIssue)(context.path, "number_too_large", message ?? `Number must be <= ${max}`, {
          expected: `<= ${max}`,
          received: value
        }));
        return parse_status_1.FAIL;
      }
      checkInt(context, value, message) {
        if (Number.isInteger(value))
          return (0, parse_status_1.OK)(value);
        context.issues.push((0, issue_factory_1.createIssue)(context.path, "number_not_integer", message ?? "Expected integer", {
          expected: "integer",
          received: value
        }));
        return parse_status_1.FAIL;
      }
      checkPositive(context, value, message) {
        if (value > 0)
          return (0, parse_status_1.OK)(value);
        context.issues.push((0, issue_factory_1.createIssue)(context.path, "number_too_small", message ?? "Expected positive number", {
          expected: "> 0",
          received: value
        }));
        return parse_status_1.FAIL;
      }
      checkNonNegative(context, value, message) {
        if (value >= 0)
          return (0, parse_status_1.OK)(value);
        context.issues.push((0, issue_factory_1.createIssue)(context.path, "number_too_small", message ?? "Expected non-negative number", {
          expected: ">= 0",
          received: value
        }));
        return parse_status_1.FAIL;
      }
      checkNegative(context, value, message) {
        if (value < 0)
          return (0, parse_status_1.OK)(value);
        context.issues.push((0, issue_factory_1.createIssue)(context.path, "number_too_large", message ?? "Expected negative number", {
          expected: "< 0",
          received: value
        }));
        return parse_status_1.FAIL;
      }
      checkNonPositive(context, value, message) {
        if (value <= 0)
          return (0, parse_status_1.OK)(value);
        context.issues.push((0, issue_factory_1.createIssue)(context.path, "number_too_large", message ?? "Expected non-positive number", {
          expected: "<= 0",
          received: value
        }));
        return parse_status_1.FAIL;
      }
      checkFinite(context, value, message) {
        if (Number.isFinite(value))
          return (0, parse_status_1.OK)(value);
        context.issues.push((0, issue_factory_1.createIssue)(context.path, "number_not_finite", message ?? "Expected finite number", {
          expected: "finite number",
          received: value
        }));
        return parse_status_1.FAIL;
      }
      checkSafe(context, value, message) {
        if (Number.isSafeInteger(value))
          return (0, parse_status_1.OK)(value);
        context.issues.push((0, issue_factory_1.createIssue)(context.path, "number_not_integer", message ?? "Expected safe integer", {
          expected: "safe integer",
          received: value
        }));
        return parse_status_1.FAIL;
      }
      assertValidNumber(value, method) {
        if (typeof value !== "number" || Number.isNaN(value)) {
          throw new TypeError(`NumberSchema.${method} expected a valid number`);
        }
      }
    };
    exports2.NumberSchema = NumberSchema;
  }
});

// ../core-validation/dist/utils/get-object-keys.js
var require_get_object_keys = __commonJS({
  "../core-validation/dist/utils/get-object-keys.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getObjectKeys = getObjectKeys;
    function getObjectKeys(value) {
      return Object.keys(value);
    }
  }
});

// ../core-validation/dist/utils/is-plain-object.js
var require_is_plain_object = __commonJS({
  "../core-validation/dist/utils/is-plain-object.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.isPlainObject = isPlainObject;
    function isPlainObject(value) {
      if (typeof value !== "object" || value === null) {
        return false;
      }
      const prototype = Object.getPrototypeOf(value);
      return prototype === Object.prototype || prototype === null;
    }
  }
});

// ../core-validation/dist/schemas/object-schema.js
var require_object_schema = __commonJS({
  "../core-validation/dist/schemas/object-schema.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ObjectSchema = void 0;
    var base_schema_1 = require_base_schema();
    var issue_factory_1 = require_issue_factory();
    var parse_status_1 = require_parse_status();
    var schema_internal_1 = require_schema_internal();
    var format_value_1 = require_format_value();
    var get_object_keys_1 = require_get_object_keys();
    var is_plain_object_1 = require_is_plain_object();
    var ObjectSchema = class _ObjectSchema extends base_schema_1.BaseSchema {
      constructor(shape, options) {
        super();
        this.shape = shape;
        this.mode = options?.mode ?? "strict";
        this.shapeKeys = (0, get_object_keys_1.getObjectKeys)(shape);
        this.knownKeys = new Set(this.shapeKeys);
      }
      strict() {
        return new _ObjectSchema(this.shape, { mode: "strict" });
      }
      strip() {
        return new _ObjectSchema(this.shape, { mode: "strip" });
      }
      passthrough() {
        return new _ObjectSchema(this.shape, { mode: "passthrough" });
      }
      extend(extension) {
        return new _ObjectSchema({
          ...this.shape,
          ...extension
        }, { mode: this.mode });
      }
      merge(other) {
        return new _ObjectSchema({
          ...this.shape,
          ...other.getShape()
        }, { mode: this.mode });
      }
      pick(keys) {
        const pickedShape = {};
        for (const key of keys) {
          pickedShape[key] = this.shape[key];
        }
        return new _ObjectSchema(pickedShape, { mode: this.mode });
      }
      omit(keys) {
        const omittedKeys = new Set(keys);
        const nextShape = {};
        for (const key of (0, get_object_keys_1.getObjectKeys)(this.shape)) {
          if (!omittedKeys.has(key)) {
            nextShape[key] = this.shape[key];
          }
        }
        return new _ObjectSchema(nextShape, { mode: this.mode });
      }
      partial() {
        const nextShape = {};
        for (const key of this.shapeKeys) {
          const fieldSchema = this.shape[key];
          nextShape[key] = fieldSchema.optional();
        }
        return new _ObjectSchema(nextShape, { mode: this.mode });
      }
      getShape() {
        return this.shape;
      }
      _parse(context, input) {
        if (!(0, is_plain_object_1.isPlainObject)(input)) {
          context.issues.push((0, issue_factory_1.createIssue)(context.path, "invalid_type", `Expected object, received ${(0, format_value_1.formatValue)(input)}`, {
            expected: "object",
            received: input
          }));
          return parse_status_1.FAIL;
        }
        const source = input;
        const output = {};
        for (const key of this.shapeKeys) {
          const fieldSchema = this.shape[key];
          const rawValue = source[key];
          (0, schema_internal_1.pushPath)(context, key);
          const result = fieldSchema["_parse"](context, rawValue);
          (0, schema_internal_1.popPath)(context);
          if (!result.success) {
            return parse_status_1.FAIL;
          }
          if (result.data !== void 0) {
            output[key] = result.data;
          }
        }
        const inputKeys = (0, get_object_keys_1.getObjectKeys)(source);
        for (const key of inputKeys) {
          if (this.knownKeys.has(key)) {
            continue;
          }
          if (this.mode === "passthrough") {
            output[key] = source[key];
            continue;
          }
          if (this.mode === "strip") {
            continue;
          }
          context.issues.push((0, issue_factory_1.createIssue)([...context.path, key], "unrecognized_key", `Unrecognized key ${(0, format_value_1.formatValue)(key)}`, {
            expected: "known object key",
            received: key
          }));
          return parse_status_1.FAIL;
        }
        return (0, parse_status_1.OK)(output);
      }
    };
    exports2.ObjectSchema = ObjectSchema;
  }
});

// ../core-validation/dist/schemas/record-schema.js
var require_record_schema = __commonJS({
  "../core-validation/dist/schemas/record-schema.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.RecordSchema = void 0;
    var base_schema_1 = require_base_schema();
    var issue_factory_1 = require_issue_factory();
    var parse_status_1 = require_parse_status();
    var schema_internal_1 = require_schema_internal();
    var format_value_1 = require_format_value();
    var get_object_keys_1 = require_get_object_keys();
    var is_plain_object_1 = require_is_plain_object();
    var RecordSchema = class extends base_schema_1.BaseSchema {
      constructor(keySchema, valueSchema) {
        super();
        this.keySchema = keySchema;
        this.valueSchema = valueSchema;
      }
      _parse(context, input) {
        if (!(0, is_plain_object_1.isPlainObject)(input)) {
          context.issues.push((0, issue_factory_1.createIssue)(context.path, "invalid_type", `Expected record object, received ${(0, format_value_1.formatValue)(input)}`, {
            expected: "object",
            received: input
          }));
          return parse_status_1.FAIL;
        }
        const source = input;
        const output = {};
        for (const key of (0, get_object_keys_1.getObjectKeys)(source)) {
          const rawValue = source[key];
          const keyContext = {
            path: [...context.path, key],
            issues: []
          };
          const keyResult = this.keySchema["_parse"](keyContext, key);
          if (!keyResult.success) {
            context.issues.push((0, issue_factory_1.createIssue)([...context.path, key], "invalid_key", `Invalid key ${(0, format_value_1.formatValue)(key)}`, {
              expected: "valid key",
              received: key,
              metadata: {
                keyIssues: keyContext.issues
              }
            }));
            return parse_status_1.FAIL;
          }
          const parsedKey = keyResult.data;
          (0, schema_internal_1.pushPath)(context, key);
          const valueResult = this.valueSchema["_parse"](context, rawValue);
          (0, schema_internal_1.popPath)(context);
          if (!valueResult.success) {
            return parse_status_1.FAIL;
          }
          output[parsedKey] = valueResult.data;
        }
        return (0, parse_status_1.OK)(output);
      }
    };
    exports2.RecordSchema = RecordSchema;
  }
});

// ../core-validation/dist/schemas/string-schema.js
var require_string_schema = __commonJS({
  "../core-validation/dist/schemas/string-schema.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.StringSchema = void 0;
    var base_schema_1 = require_base_schema();
    var issue_factory_1 = require_issue_factory();
    var parse_status_1 = require_parse_status();
    var format_value_1 = require_format_value();
    var StringSchema = class _StringSchema extends base_schema_1.BaseSchema {
      constructor(options) {
        super();
        this.shouldTrim = options?.shouldTrim ?? false;
        this.constraints = options?.constraints ?? [];
      }
      trim() {
        return new _StringSchema({
          shouldTrim: true,
          constraints: this.constraints
        });
      }
      min(length, message) {
        this.assertValidNonNegativeInteger(length, "min");
        return this.withConstraint({
          kind: "min",
          value: length,
          message
        });
      }
      max(length, message) {
        this.assertValidNonNegativeInteger(length, "max");
        return this.withConstraint({
          kind: "max",
          value: length,
          message
        });
      }
      length(length, message) {
        this.assertValidNonNegativeInteger(length, "length");
        return this.withConstraint({
          kind: "length",
          value: length,
          message
        });
      }
      nonempty(message) {
        return this.min(1, message ?? "String must not be empty");
      }
      regex(pattern, message) {
        if (!(pattern instanceof RegExp)) {
          throw new TypeError("StringSchema.regex expected a RegExp instance");
        }
        return this.withConstraint({
          kind: "regex",
          regex: pattern,
          message
        });
      }
      startsWith(prefix, message) {
        if (prefix.length === 0) {
          throw new TypeError("StringSchema.startsWith expected a non-empty prefix");
        }
        return this.withConstraint({
          kind: "startsWith",
          value: prefix,
          message
        });
      }
      endsWith(suffix, message) {
        if (suffix.length === 0) {
          throw new TypeError("StringSchema.endsWith expected a non-empty suffix");
        }
        return this.withConstraint({
          kind: "endsWith",
          value: suffix,
          message
        });
      }
      includes(search, message) {
        if (search.length === 0) {
          throw new TypeError("StringSchema.includes expected a non-empty search value");
        }
        return this.withConstraint({
          kind: "includes",
          value: search,
          message
        });
      }
      _parse(context, input) {
        if (typeof input !== "string") {
          context.issues.push((0, issue_factory_1.createIssue)(context.path, "invalid_type", `Expected string, received ${(0, format_value_1.formatValue)(input)}`, {
            expected: "string",
            received: input
          }));
          return parse_status_1.FAIL;
        }
        const value = this.shouldTrim ? input.trim() : input;
        for (const constraint of this.constraints) {
          const result = this.applyConstraint(context, value, constraint);
          if (!result.success) {
            return parse_status_1.FAIL;
          }
        }
        return (0, parse_status_1.OK)(value);
      }
      withConstraint(constraint) {
        return new _StringSchema({
          shouldTrim: this.shouldTrim,
          constraints: [...this.constraints, constraint]
        });
      }
      applyConstraint(context, value, constraint) {
        switch (constraint.kind) {
          case "min":
            return this.checkMin(context, value, constraint.value, constraint.message);
          case "max":
            return this.checkMax(context, value, constraint.value, constraint.message);
          case "length":
            return this.checkLength(context, value, constraint.value, constraint.message);
          case "regex":
            return this.checkRegex(context, value, constraint.regex, constraint.message);
          case "startsWith":
            return this.checkStartsWith(context, value, constraint.value, constraint.message);
          case "endsWith":
            return this.checkEndsWith(context, value, constraint.value, constraint.message);
          case "includes":
            return this.checkIncludes(context, value, constraint.value, constraint.message);
          default: {
            const exhaustiveCheck = constraint;
            throw new Error(`Unhandled string constraint: ${JSON.stringify(exhaustiveCheck)}`);
          }
        }
      }
      checkMin(context, value, minLength, message) {
        if (value.length >= minLength) {
          return (0, parse_status_1.OK)(value);
        }
        context.issues.push((0, issue_factory_1.createIssue)(context.path, "string_too_short", message ?? `String must contain at least ${minLength} character(s)`, {
          expected: `length >= ${minLength}`,
          received: value,
          metadata: {
            minLength,
            actualLength: value.length
          }
        }));
        return parse_status_1.FAIL;
      }
      checkMax(context, value, maxLength, message) {
        if (value.length <= maxLength) {
          return (0, parse_status_1.OK)(value);
        }
        context.issues.push((0, issue_factory_1.createIssue)(context.path, "string_too_long", message ?? `String must contain at most ${maxLength} character(s)`, {
          expected: `length <= ${maxLength}`,
          received: value,
          metadata: {
            maxLength,
            actualLength: value.length
          }
        }));
        return parse_status_1.FAIL;
      }
      checkLength(context, value, exactLength, message) {
        if (value.length === exactLength) {
          return (0, parse_status_1.OK)(value);
        }
        const code = value.length < exactLength ? "string_too_short" : "string_too_long";
        context.issues.push((0, issue_factory_1.createIssue)(context.path, code, message ?? `String must contain exactly ${exactLength} character(s)`, {
          expected: `length === ${exactLength}`,
          received: value,
          metadata: {
            exactLength,
            actualLength: value.length
          }
        }));
        return parse_status_1.FAIL;
      }
      checkRegex(context, value, pattern, message) {
        pattern.lastIndex = 0;
        if (pattern.test(value)) {
          return (0, parse_status_1.OK)(value);
        }
        context.issues.push((0, issue_factory_1.createIssue)(context.path, "string_invalid_format", message ?? `String does not match required pattern ${pattern.toString()}`, {
          expected: pattern.toString(),
          received: value,
          metadata: {
            pattern: pattern.toString()
          }
        }));
        return parse_status_1.FAIL;
      }
      checkStartsWith(context, value, prefix, message) {
        if (value.startsWith(prefix)) {
          return (0, parse_status_1.OK)(value);
        }
        context.issues.push((0, issue_factory_1.createIssue)(context.path, "string_invalid_starts_with", message ?? `String must start with ${(0, format_value_1.formatValue)(prefix)}`, {
          expected: `startsWith(${prefix})`,
          received: value,
          metadata: {
            prefix
          }
        }));
        return parse_status_1.FAIL;
      }
      checkEndsWith(context, value, suffix, message) {
        if (value.endsWith(suffix)) {
          return (0, parse_status_1.OK)(value);
        }
        context.issues.push((0, issue_factory_1.createIssue)(context.path, "string_invalid_ends_with", message ?? `String must end with ${(0, format_value_1.formatValue)(suffix)}`, {
          expected: `endsWith(${suffix})`,
          received: value,
          metadata: {
            suffix
          }
        }));
        return parse_status_1.FAIL;
      }
      checkIncludes(context, value, search, message) {
        if (value.includes(search)) {
          return (0, parse_status_1.OK)(value);
        }
        context.issues.push((0, issue_factory_1.createIssue)(context.path, "string_invalid_includes", message ?? `String must include ${(0, format_value_1.formatValue)(search)}`, {
          expected: `includes(${search})`,
          received: value,
          metadata: {
            search
          }
        }));
        return parse_status_1.FAIL;
      }
      assertValidNonNegativeInteger(value, methodName) {
        if (!Number.isInteger(value) || value < 0) {
          throw new TypeError(`StringSchema.${methodName} expected a non-negative integer`);
        }
      }
    };
    exports2.StringSchema = StringSchema;
  }
});

// ../core-validation/dist/utils/get-array-item.js
var require_get_array_item = __commonJS({
  "../core-validation/dist/utils/get-array-item.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getArrayItem = getArrayItem;
    function getArrayItem(array, index) {
      const item = array[index];
      if (item === void 0) {
        throw new Error(`Missing array item at index ${index}`);
      }
      return item;
    }
  }
});

// ../core-validation/dist/schemas/tuple-schema.js
var require_tuple_schema = __commonJS({
  "../core-validation/dist/schemas/tuple-schema.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.TupleSchema = void 0;
    var base_schema_1 = require_base_schema();
    var issue_factory_1 = require_issue_factory();
    var parse_status_1 = require_parse_status();
    var schema_internal_1 = require_schema_internal();
    var format_value_1 = require_format_value();
    var get_array_item_1 = require_get_array_item();
    var TupleSchema = class extends base_schema_1.BaseSchema {
      constructor(schemas) {
        super();
        this.schemas = schemas;
      }
      _parse(context, input) {
        if (!Array.isArray(input)) {
          context.issues.push((0, issue_factory_1.createIssue)(context.path, "invalid_type", `Expected tuple (array), received ${(0, format_value_1.formatValue)(input)}`, {
            expected: "tuple",
            received: input
          }));
          return parse_status_1.FAIL;
        }
        const array = input;
        if (array.length !== this.schemas.length) {
          context.issues.push((0, issue_factory_1.createIssue)(context.path, "array_too_short", `Expected tuple length ${this.schemas.length}, received ${array.length}`, {
            expected: `length === ${this.schemas.length}`,
            received: array
          }));
          return parse_status_1.FAIL;
        }
        const output = [];
        for (let i = 0; i < this.schemas.length; i++) {
          const schema6 = (0, get_array_item_1.getArrayItem)(this.schemas, i);
          const value = array[i];
          (0, schema_internal_1.pushPath)(context, i);
          const result = schema6["_parse"](context, value);
          (0, schema_internal_1.popPath)(context);
          if (!result.success) {
            return parse_status_1.FAIL;
          }
          output.push(result.data);
        }
        return (0, parse_status_1.OK)(output);
      }
    };
    exports2.TupleSchema = TupleSchema;
  }
});

// ../core-validation/dist/core/validation-runtime.js
var require_validation_runtime = __commonJS({
  "../core-validation/dist/core/validation-runtime.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getValidationRuntimeOptions = getValidationRuntimeOptions;
    exports2.setValidationRuntimeOptions = setValidationRuntimeOptions;
    var runtimeOptions = {
      includeDebugMetadata: true
    };
    function getValidationRuntimeOptions() {
      return runtimeOptions;
    }
    function setValidationRuntimeOptions(options) {
      if (typeof options.includeDebugMetadata === "boolean") {
        runtimeOptions.includeDebugMetadata = options.includeDebugMetadata;
      }
    }
  }
});

// ../core-validation/dist/schemas/union-schema.js
var require_union_schema = __commonJS({
  "../core-validation/dist/schemas/union-schema.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.UnionSchema = void 0;
    var base_schema_1 = require_base_schema();
    var issue_factory_1 = require_issue_factory();
    var parse_status_1 = require_parse_status();
    var format_value_1 = require_format_value();
    var get_array_item_1 = require_get_array_item();
    var validation_runtime_1 = require_validation_runtime();
    var UnionSchema = class extends base_schema_1.BaseSchema {
      constructor(schemas) {
        super();
        this.schemas = schemas;
      }
      getSchemas() {
        return this.schemas;
      }
      _parse(context, input) {
        const branchFailures = [];
        for (let index = 0; index < this.schemas.length; index++) {
          const schema6 = (0, get_array_item_1.getArrayItem)(this.schemas, index);
          const branchContext = {
            path: [...context.path],
            issues: []
          };
          const result = schema6["_parse"](branchContext, input);
          if (result.success) {
            return (0, parse_status_1.OK)(result.data);
          }
          branchFailures.push({
            index,
            issues: [...branchContext.issues]
          });
        }
        const runtimeOptions = (0, validation_runtime_1.getValidationRuntimeOptions)();
        context.issues.push((0, issue_factory_1.createIssue)(context.path, "invalid_union", `Input did not match any union branch, received ${(0, format_value_1.formatValue)(input)}`, {
          expected: "valid union branch",
          received: input,
          metadata: runtimeOptions.includeDebugMetadata ? {
            branchIssueCount: branchFailures.reduce((total, branch) => total + branch.issues.length, 0),
            branchFailures
          } : {
            branchIssueCount: branchFailures.reduce((total, branch) => total + branch.issues.length, 0)
          }
        }));
        return parse_status_1.FAIL;
      }
    };
    exports2.UnionSchema = UnionSchema;
  }
});

// ../core-validation/dist/schemas/unknown-schema.js
var require_unknown_schema = __commonJS({
  "../core-validation/dist/schemas/unknown-schema.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.UnknownSchema = void 0;
    var base_schema_1 = require_base_schema();
    var parse_status_1 = require_parse_status();
    var UnknownSchema = class extends base_schema_1.BaseSchema {
      _parse(_context, input) {
        return (0, parse_status_1.OK)(input);
      }
    };
    exports2.UnknownSchema = UnknownSchema;
  }
});

// ../core-validation/dist/schemas/function-schema.js
var require_function_schema = __commonJS({
  "../core-validation/dist/schemas/function-schema.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.FunctionSchema = void 0;
    var base_schema_1 = require_base_schema();
    var issue_factory_1 = require_issue_factory();
    var parse_status_1 = require_parse_status();
    var format_value_1 = require_format_value();
    var FunctionSchema = class extends base_schema_1.BaseSchema {
      _parse(context, input) {
        if (typeof input !== "function") {
          context.issues.push((0, issue_factory_1.createIssue)(context.path, "invalid_type", `Expected function, received ${(0, format_value_1.formatValue)(input)}`, {
            expected: "function",
            received: input
          }));
          return parse_status_1.FAIL;
        }
        return (0, parse_status_1.OK)(input);
      }
    };
    exports2.FunctionSchema = FunctionSchema;
  }
});

// ../core-validation/dist/schemas/lazy-schema.js
var require_lazy_schema = __commonJS({
  "../core-validation/dist/schemas/lazy-schema.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.LazySchema = void 0;
    var base_schema_1 = require_base_schema();
    var LazySchema = class extends base_schema_1.BaseSchema {
      constructor(getter) {
        super();
        this.getter = getter;
      }
      _parse(context, input) {
        const schema6 = this.getter();
        return schema6["_parse"](context, input);
      }
    };
    exports2.LazySchema = LazySchema;
  }
});

// ../core-validation/dist/schemas/schema-factory.js
var require_schema_factory = __commonJS({
  "../core-validation/dist/schemas/schema-factory.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.schema = void 0;
    var any_schema_1 = require_any_schema();
    var array_schema_1 = require_array_schema();
    var boolean_schema_1 = require_boolean_schema();
    var custom_schema_1 = require_custom_schema();
    var enum_schema_1 = require_enum_schema();
    var literal_schema_1 = require_literal_schema();
    var never_schema_1 = require_never_schema();
    var nullable_schema_1 = require_nullable_schema();
    var number_schema_1 = require_number_schema();
    var object_schema_1 = require_object_schema();
    var optional_schema_1 = require_optional_schema();
    var record_schema_1 = require_record_schema();
    var string_schema_1 = require_string_schema();
    var tuple_schema_1 = require_tuple_schema();
    var union_schema_1 = require_union_schema();
    var unknown_schema_1 = require_unknown_schema();
    var function_schema_1 = require_function_schema();
    var lazy_schema_1 = require_lazy_schema();
    var defaultRecordKeySchema = new string_schema_1.StringSchema();
    function recordFactory(keyOrValueSchema, maybeValueSchema) {
      if (maybeValueSchema) {
        return new record_schema_1.RecordSchema(keyOrValueSchema, maybeValueSchema);
      }
      return new record_schema_1.RecordSchema(defaultRecordKeySchema, keyOrValueSchema);
    }
    exports2.schema = {
      string() {
        return new string_schema_1.StringSchema();
      },
      number() {
        return new number_schema_1.NumberSchema();
      },
      boolean() {
        return new boolean_schema_1.BooleanSchema();
      },
      any() {
        return new any_schema_1.AnySchema();
      },
      unknown() {
        return new unknown_schema_1.UnknownSchema();
      },
      never() {
        return new never_schema_1.NeverSchema();
      },
      literal(value) {
        return new literal_schema_1.LiteralSchema(value);
      },
      enum(values) {
        return new enum_schema_1.EnumSchema(values);
      },
      object(shape) {
        return new object_schema_1.ObjectSchema(shape);
      },
      array(itemSchema) {
        return new array_schema_1.ArraySchema(itemSchema);
      },
      union(schemas) {
        return new union_schema_1.UnionSchema(schemas);
      },
      optional(innerSchema) {
        return new optional_schema_1.OptionalSchema(innerSchema);
      },
      nullable(innerSchema) {
        return new nullable_schema_1.NullableSchema(innerSchema);
      },
      tuple(schemas) {
        return new tuple_schema_1.TupleSchema(schemas);
      },
      record: recordFactory,
      custom(check, message) {
        return new custom_schema_1.CustomSchema(check, message);
      },
      function() {
        return new function_schema_1.FunctionSchema();
      },
      lazy(getter) {
        return new lazy_schema_1.LazySchema(getter);
      }
    };
  }
});

// ../core-validation/dist/parsing/parse.js
var require_parse = __commonJS({
  "../core-validation/dist/parsing/parse.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.parse = parse;
    function parse(schema6, input) {
      return schema6.parse(input);
    }
  }
});

// ../core-validation/dist/parsing/safe-parse.js
var require_safe_parse = __commonJS({
  "../core-validation/dist/parsing/safe-parse.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.safeParse = safeParse;
    function safeParse(schema6, input) {
      return schema6.safeParse(input);
    }
  }
});

// ../core-validation/dist/parsing/assert-valid.js
var require_assert_valid = __commonJS({
  "../core-validation/dist/parsing/assert-valid.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.assertValid = assertValid;
    function assertValid(schema6, input) {
      schema6.assert(input);
    }
  }
});

// ../core-validation/dist/parsing/parse-async.js
var require_parse_async = __commonJS({
  "../core-validation/dist/parsing/parse-async.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.parseAsync = parseAsync;
    async function parseAsync(schema6, input) {
      return schema6.parseAsync(input);
    }
  }
});

// ../core-validation/dist/parsing/safe-parse-async.js
var require_safe_parse_async = __commonJS({
  "../core-validation/dist/parsing/safe-parse-async.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.safeParseAsync = safeParseAsync;
    async function safeParseAsync(schema6, input) {
      return schema6.safeParseAsync(input);
    }
  }
});

// ../core-validation/dist/integration/parse-dto.js
var require_parse_dto = __commonJS({
  "../core-validation/dist/integration/parse-dto.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.parseDto = parseDto3;
    function parseDto3(schema6, input) {
      return schema6.parse(input);
    }
  }
});

// ../core-validation/dist/integration/parse-event-payload.js
var require_parse_event_payload = __commonJS({
  "../core-validation/dist/integration/parse-event-payload.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.parseEventPayload = parseEventPayload;
    function parseEventPayload(schema6, payload) {
      return schema6.parse(payload);
    }
  }
});

// ../core-validation/dist/integration/parse-config-section.js
var require_parse_config_section = __commonJS({
  "../core-validation/dist/integration/parse-config-section.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.parseConfigSection = parseConfigSection;
    function parseConfigSection(schema6, config) {
      return schema6.parse(config);
    }
  }
});

// ../core-validation/dist/constants/patterns.js
var require_patterns = __commonJS({
  "../core-validation/dist/constants/patterns.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SERVICE_EXPORT_PATTERN = exports2.CUSTOM_EXPORT_PATTERN = exports2.NET_EVENT_PATTERN = exports2.LOCAL_EVENT_PATTERN = exports2.EXPORT_NAME_PATTERN = exports2.SERVICE_NAME_PATTERN = exports2.MODULE_NAME_PATTERN = void 0;
    exports2.MODULE_NAME_PATTERN = /^[a-z0-9-]+$/;
    exports2.SERVICE_NAME_PATTERN = /^[a-z0-9-]+$/;
    exports2.EXPORT_NAME_PATTERN = /^[A-Za-z][A-Za-z0-9]*$/;
    exports2.LOCAL_EVENT_PATTERN = /^[a-z0-9-]+:[A-Za-z][A-Za-z0-9]*$/;
    exports2.NET_EVENT_PATTERN = /^[a-z0-9-]+:net:[A-Za-z][A-Za-z0-9]*$/;
    exports2.CUSTOM_EXPORT_PATTERN = /^[a-z0-9-]+\.[A-Za-z][A-Za-z0-9]*$/;
    exports2.SERVICE_EXPORT_PATTERN = /^[a-z0-9-]+\.service\.[a-z0-9-]+$/;
  }
});

// ../core-validation/dist/public-api.js
var require_public_api2 = __commonJS({
  "../core-validation/dist/public-api.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.setValidationRuntimeOptions = exports2.getValidationRuntimeOptions = exports2.SERVICE_EXPORT_PATTERN = exports2.CUSTOM_EXPORT_PATTERN = exports2.NET_EVENT_PATTERN = exports2.LOCAL_EVENT_PATTERN = exports2.EXPORT_NAME_PATTERN = exports2.SERVICE_NAME_PATTERN = exports2.MODULE_NAME_PATTERN = exports2.ValidationError = exports2.BaseSchema = exports2.parseConfigSection = exports2.parseEventPayload = exports2.parseDto = exports2.safeParseAsync = exports2.parseAsync = exports2.assertValid = exports2.safeParse = exports2.parse = exports2.schema = void 0;
    require_base_schema_extensions();
    var schema_factory_1 = require_schema_factory();
    Object.defineProperty(exports2, "schema", { enumerable: true, get: function() {
      return schema_factory_1.schema;
    } });
    var parse_1 = require_parse();
    Object.defineProperty(exports2, "parse", { enumerable: true, get: function() {
      return parse_1.parse;
    } });
    var safe_parse_1 = require_safe_parse();
    Object.defineProperty(exports2, "safeParse", { enumerable: true, get: function() {
      return safe_parse_1.safeParse;
    } });
    var assert_valid_1 = require_assert_valid();
    Object.defineProperty(exports2, "assertValid", { enumerable: true, get: function() {
      return assert_valid_1.assertValid;
    } });
    var parse_async_1 = require_parse_async();
    Object.defineProperty(exports2, "parseAsync", { enumerable: true, get: function() {
      return parse_async_1.parseAsync;
    } });
    var safe_parse_async_1 = require_safe_parse_async();
    Object.defineProperty(exports2, "safeParseAsync", { enumerable: true, get: function() {
      return safe_parse_async_1.safeParseAsync;
    } });
    var parse_dto_1 = require_parse_dto();
    Object.defineProperty(exports2, "parseDto", { enumerable: true, get: function() {
      return parse_dto_1.parseDto;
    } });
    var parse_event_payload_1 = require_parse_event_payload();
    Object.defineProperty(exports2, "parseEventPayload", { enumerable: true, get: function() {
      return parse_event_payload_1.parseEventPayload;
    } });
    var parse_config_section_1 = require_parse_config_section();
    Object.defineProperty(exports2, "parseConfigSection", { enumerable: true, get: function() {
      return parse_config_section_1.parseConfigSection;
    } });
    var base_schema_1 = require_base_schema();
    Object.defineProperty(exports2, "BaseSchema", { enumerable: true, get: function() {
      return base_schema_1.BaseSchema;
    } });
    var validation_error_1 = require_validation_error2();
    Object.defineProperty(exports2, "ValidationError", { enumerable: true, get: function() {
      return validation_error_1.ValidationError;
    } });
    var patterns_1 = require_patterns();
    Object.defineProperty(exports2, "MODULE_NAME_PATTERN", { enumerable: true, get: function() {
      return patterns_1.MODULE_NAME_PATTERN;
    } });
    Object.defineProperty(exports2, "SERVICE_NAME_PATTERN", { enumerable: true, get: function() {
      return patterns_1.SERVICE_NAME_PATTERN;
    } });
    Object.defineProperty(exports2, "EXPORT_NAME_PATTERN", { enumerable: true, get: function() {
      return patterns_1.EXPORT_NAME_PATTERN;
    } });
    Object.defineProperty(exports2, "LOCAL_EVENT_PATTERN", { enumerable: true, get: function() {
      return patterns_1.LOCAL_EVENT_PATTERN;
    } });
    Object.defineProperty(exports2, "NET_EVENT_PATTERN", { enumerable: true, get: function() {
      return patterns_1.NET_EVENT_PATTERN;
    } });
    Object.defineProperty(exports2, "CUSTOM_EXPORT_PATTERN", { enumerable: true, get: function() {
      return patterns_1.CUSTOM_EXPORT_PATTERN;
    } });
    Object.defineProperty(exports2, "SERVICE_EXPORT_PATTERN", { enumerable: true, get: function() {
      return patterns_1.SERVICE_EXPORT_PATTERN;
    } });
    var validation_runtime_1 = require_validation_runtime();
    Object.defineProperty(exports2, "getValidationRuntimeOptions", { enumerable: true, get: function() {
      return validation_runtime_1.getValidationRuntimeOptions;
    } });
    Object.defineProperty(exports2, "setValidationRuntimeOptions", { enumerable: true, get: function() {
      return validation_runtime_1.setValidationRuntimeOptions;
    } });
  }
});

// ../core-validation/dist/index.js
var require_dist2 = __commonJS({
  "../core-validation/dist/index.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __exportStar = exports2 && exports2.__exportStar || function(m, exports3) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p)) __createBinding(exports3, m, p);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    __exportStar(require_public_api2(), exports2);
  }
});

// ../core-exports/dist/server/public-api.js
var require_public_api3 = __commonJS({
  "../core-exports/dist/server/public-api.js"(exports2, module2) {
    "use strict";
    var __create2 = Object.create;
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __getProtoOf2 = Object.getPrototypeOf;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __commonJS2 = (cb, mod) => function __require() {
      return mod || (0, cb[__getOwnPropNames2(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    };
    var __export = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toESM2 = (mod, isNodeMode, target) => (target = mod != null ? __create2(__getProtoOf2(mod)) : {}, __copyProps2(
      // If the importer is in node compatibility mode or this is not an ESM
      // file that has been converted to a CommonJS file using a Babel-
      // compatible transform (i.e. "__esModule" has not been set), then set
      // "default" to the CommonJS "module.exports" for node compatibility.
      isNodeMode || !mod || !mod.__esModule ? __defProp2(target, "default", { value: mod, enumerable: true }) : target,
      mod
    ));
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var require_public_api4 = __commonJS2({
      "../core-logger/dist/server/public-api.js"(exports22, module22) {
        "use strict";
        var __defProp22 = Object.defineProperty;
        var __getOwnPropDesc22 = Object.getOwnPropertyDescriptor;
        var __getOwnPropNames22 = Object.getOwnPropertyNames;
        var __hasOwnProp22 = Object.prototype.hasOwnProperty;
        var __export2 = (target, all) => {
          for (var name in all)
            __defProp22(target, name, { get: all[name], enumerable: true });
        };
        var __copyProps22 = (to, from, except, desc) => {
          if (from && typeof from === "object" || typeof from === "function") {
            for (let key of __getOwnPropNames22(from))
              if (!__hasOwnProp22.call(to, key) && key !== except)
                __defProp22(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc22(from, key)) || desc.enumerable });
          }
          return to;
        };
        var __toCommonJS2 = (mod) => __copyProps22(__defProp22({}, "__esModule", { value: true }), mod);
        var public_api_exports2 = {};
        __export2(public_api_exports2, {
          BaseLogger: () => BaseLogger,
          LOG_LEVELS: () => LOG_LEVELS,
          createCoreLogger: () => createCoreLogger22,
          formatLog: () => formatLog
        });
        module22.exports = __toCommonJS2(public_api_exports2);
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
        function serverWriter(message) {
          console.log(message);
        }
        function createCoreLogger22(context) {
          return new BaseLogger(serverWriter, {
            context,
            minLevel: LOG_LEVELS.DEBUG
          });
        }
      }
    });
    var require_error_details2 = __commonJS2({
      "../core-errors/dist/types/error-details.js"(exports22) {
        "use strict";
        Object.defineProperty(exports22, "__esModule", { value: true });
      }
    });
    var require_error_codes2 = __commonJS2({
      "../core-errors/dist/codes/error-codes.js"(exports22) {
        "use strict";
        Object.defineProperty(exports22, "__esModule", { value: true });
        exports22.ERROR_CODES = void 0;
        exports22.ERROR_CODES = {
          UNKNOWN: "UNKNOWN",
          VALIDATION_FAILED: "VALIDATION_FAILED",
          CONFIG_MISSING: "CONFIG_MISSING",
          CONFIG_INVALID: "CONFIG_INVALID",
          INFRASTRUCTURE_FAILURE: "INFRASTRUCTURE_FAILURE",
          DATABASE_NOT_INITIALIZED: "DATABASE_NOT_INITIALIZED",
          DATABASE_CONNECTION_FAILED: "DATABASE_CONNECTION_FAILED",
          DOMAIN_RULE_VIOLATION: "DOMAIN_RULE_VIOLATION"
        };
      }
    });
    var require_app_error2 = __commonJS2({
      "../core-errors/dist/base/app-error.js"(exports22) {
        "use strict";
        Object.defineProperty(exports22, "__esModule", { value: true });
        exports22.AppError = void 0;
        var AppError = class extends Error {
          constructor(message, code, details, cause) {
            super(message);
            this.name = new.target.name;
            this.code = code;
            this.details = details;
            this.cause = cause;
          }
        };
        exports22.AppError = AppError;
      }
    });
    var require_validation_error3 = __commonJS2({
      "../core-errors/dist/validation/validation-error.js"(exports22) {
        "use strict";
        Object.defineProperty(exports22, "__esModule", { value: true });
        exports22.ValidationError = void 0;
        var app_error_1 = require_app_error2();
        var error_codes_1 = require_error_codes2();
        var ValidationError = class extends app_error_1.AppError {
          constructor(message, details, cause) {
            super(message, error_codes_1.ERROR_CODES.VALIDATION_FAILED, details, cause);
          }
        };
        exports22.ValidationError = ValidationError;
      }
    });
    var require_config_error2 = __commonJS2({
      "../core-errors/dist/config/config-error.js"(exports22) {
        "use strict";
        Object.defineProperty(exports22, "__esModule", { value: true });
        exports22.ConfigError = void 0;
        var app_error_1 = require_app_error2();
        var ConfigError = class extends app_error_1.AppError {
          constructor(message, code, details, cause) {
            super(message, code, details, cause);
          }
        };
        exports22.ConfigError = ConfigError;
      }
    });
    var require_infrastructure_error2 = __commonJS2({
      "../core-errors/dist/infrastructure/infrastructure-error.js"(exports22) {
        "use strict";
        Object.defineProperty(exports22, "__esModule", { value: true });
        exports22.InfrastructureError = void 0;
        var app_error_1 = require_app_error2();
        var error_codes_1 = require_error_codes2();
        var InfrastructureError32 = class extends app_error_1.AppError {
          constructor(message, details, cause) {
            super(message, error_codes_1.ERROR_CODES.INFRASTRUCTURE_FAILURE, details, cause);
          }
        };
        exports22.InfrastructureError = InfrastructureError32;
      }
    });
    var require_domain_error2 = __commonJS2({
      "../core-errors/dist/domain/domain-error.js"(exports22) {
        "use strict";
        Object.defineProperty(exports22, "__esModule", { value: true });
        exports22.DomainError = void 0;
        var app_error_1 = require_app_error2();
        var error_codes_1 = require_error_codes2();
        var DomainError3 = class extends app_error_1.AppError {
          constructor(message, details, cause) {
            super(message, error_codes_1.ERROR_CODES.DOMAIN_RULE_VIOLATION, details, cause);
          }
        };
        exports22.DomainError = DomainError3;
      }
    });
    var require_dist3 = __commonJS2({
      "../core-errors/dist/index.js"(exports22) {
        "use strict";
        var __createBinding = exports22 && exports22.__createBinding || (Object.create ? (function(o, m, k, k2) {
          if (k2 === void 0) k2 = k;
          var desc = Object.getOwnPropertyDescriptor(m, k);
          if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
            desc = { enumerable: true, get: function() {
              return m[k];
            } };
          }
          Object.defineProperty(o, k2, desc);
        }) : (function(o, m, k, k2) {
          if (k2 === void 0) k2 = k;
          o[k2] = m[k];
        }));
        var __exportStar = exports22 && exports22.__exportStar || function(m, exports3) {
          for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p)) __createBinding(exports3, m, p);
        };
        Object.defineProperty(exports22, "__esModule", { value: true });
        __exportStar(require_error_details2(), exports22);
        __exportStar(require_error_codes2(), exports22);
        __exportStar(require_app_error2(), exports22);
        __exportStar(require_validation_error3(), exports22);
        __exportStar(require_config_error2(), exports22);
        __exportStar(require_infrastructure_error2(), exports22);
        __exportStar(require_domain_error2(), exports22);
      }
    });
    var require_join_path2 = __commonJS2({
      "../core-validation/dist/utils/join-path.js"(exports22) {
        "use strict";
        Object.defineProperty(exports22, "__esModule", { value: true });
        exports22.joinPath = joinPath;
        function joinPath(path) {
          if (path.length === 0) {
            return "";
          }
          let result = "";
          for (const segment of path) {
            if (typeof segment === "number") {
              result += `[${segment}]`;
              continue;
            }
            if (result.length === 0) {
              result += segment;
              continue;
            }
            result += `.${segment}`;
          }
          return result;
        }
      }
    });
    var require_validation_error22 = __commonJS2({
      "../core-validation/dist/errors/validation-error.js"(exports22) {
        "use strict";
        Object.defineProperty(exports22, "__esModule", { value: true });
        exports22.ValidationError = void 0;
        var core_errors_1 = require_dist3();
        var join_path_1 = require_join_path2();
        var ValidationError = class extends core_errors_1.InfrastructureError {
          constructor(message, issues) {
            super(message, {
              module: "core-validation",
              code: "VALIDATION_FAILED"
            });
            this.name = "ValidationError";
            this.issues = issues;
          }
          format() {
            if (this.issues.length === 0) {
              return this.message;
            }
            const lines = this.issues.map((issue, index) => {
              const path = (0, join_path_1.joinPath)(issue.path);
              const location = path.length > 0 ? path : "<root>";
              return `${index + 1}. ${location}: ${issue.message}`;
            });
            return [this.message, ...lines].join("\n");
          }
          flatten() {
            const formErrors = [];
            const fieldErrors = {};
            for (const issue of this.issues) {
              const path = (0, join_path_1.joinPath)(issue.path);
              if (path.length === 0) {
                formErrors.push(issue.message);
                continue;
              }
              if (!fieldErrors[path]) {
                fieldErrors[path] = [];
              }
              fieldErrors[path].push(issue.message);
            }
            return {
              formErrors,
              fieldErrors
            };
          }
          getFieldErrors() {
            return this.flatten().fieldErrors;
          }
          getFormErrors() {
            return this.flatten().formErrors;
          }
          toString() {
            return this.format();
          }
        };
        exports22.ValidationError = ValidationError;
      }
    });
    var require_base_schema2 = __commonJS2({
      "../core-validation/dist/core/base-schema.js"(exports22) {
        "use strict";
        Object.defineProperty(exports22, "__esModule", { value: true });
        exports22.BaseSchema = void 0;
        var validation_error_1 = require_validation_error22();
        var BaseSchema = class {
          // =========================
          // SYNC
          // =========================
          parse(input) {
            const result = this.safeParse(input);
            if (!result.success) {
              throw result.error;
            }
            return result.data;
          }
          safeParse(input) {
            const context = {
              path: [],
              issues: []
            };
            const result = this._parse(context, input);
            if (!result.success) {
              return {
                success: false,
                error: new validation_error_1.ValidationError("Validation failed", context.issues)
              };
            }
            return {
              success: true,
              data: result.data
            };
          }
          assert(input) {
            const result = this.safeParse(input);
            if (!result.success) {
              throw result.error;
            }
          }
          // =========================
          // ASYNC
          // =========================
          async parseAsync(input) {
            const result = await this.safeParseAsync(input);
            if (!result.success) {
              throw result.error;
            }
            return result.data;
          }
          async safeParseAsync(input) {
            const context = {
              path: [],
              issues: []
            };
            const result = await this._parseAsync(context, input);
            if (!result.success) {
              return {
                success: false,
                error: new validation_error_1.ValidationError("Validation failed", context.issues)
              };
            }
            return {
              success: true,
              data: result.data
            };
          }
          async _parseAsync(context, input) {
            return this._parse(context, input);
          }
        };
        exports22.BaseSchema = BaseSchema;
      }
    });
    var require_issue_factory2 = __commonJS2({
      "../core-validation/dist/core/issue-factory.js"(exports22) {
        "use strict";
        Object.defineProperty(exports22, "__esModule", { value: true });
        exports22.createIssue = createIssue;
        function createIssue(path, code, message, options) {
          return {
            path: [...path],
            code,
            message,
            expected: options?.expected,
            received: options?.received,
            metadata: options?.metadata
          };
        }
      }
    });
    var require_parse_status2 = __commonJS2({
      "../core-validation/dist/core/parse-status.js"(exports22) {
        "use strict";
        Object.defineProperty(exports22, "__esModule", { value: true });
        exports22.FAIL = exports22.OK = void 0;
        var OK = (data) => ({
          success: true,
          data
        });
        exports22.OK = OK;
        exports22.FAIL = {
          success: false
        };
      }
    });
    var require_effects_schema2 = __commonJS2({
      "../core-validation/dist/schemas/effects-schema.js"(exports22) {
        "use strict";
        Object.defineProperty(exports22, "__esModule", { value: true });
        exports22.EffectsSchema = void 0;
        var base_schema_1 = require_base_schema2();
        var issue_factory_1 = require_issue_factory2();
        var parse_status_1 = require_parse_status2();
        var EffectsSchema = class _EffectsSchema extends base_schema_1.BaseSchema {
          constructor(baseSchema, effects) {
            super();
            this.baseSchema = baseSchema;
            this.effects = effects;
          }
          // =========================
          // SYNC
          // =========================
          _parse(context, input) {
            const baseResult = this.baseSchema["_parse"](context, input);
            if (!baseResult.success) {
              return parse_status_1.FAIL;
            }
            let value = baseResult.data;
            for (const effect of this.effects) {
              if (effect.type === "refine") {
                if (!effect.check(value)) {
                  context.issues.push((0, issue_factory_1.createIssue)(context.path, "custom", effect.message ?? "Validation failed"));
                  return parse_status_1.FAIL;
                }
                continue;
              }
              if (effect.type === "transform") {
                value = effect.transform(value);
                continue;
              }
              if (effect.type === "superRefine") {
                effect.handler(value, context);
                if (context.issues.length > 0) {
                  return parse_status_1.FAIL;
                }
                continue;
              }
            }
            return (0, parse_status_1.OK)(value);
          }
          // =========================
          // ASYNC
          // =========================
          async _parseAsync(context, input) {
            const baseResult = await this.baseSchema["_parseAsync"](context, input);
            if (!baseResult.success) {
              return parse_status_1.FAIL;
            }
            let value = baseResult.data;
            for (const effect of this.effects) {
              if (effect.type === "refine") {
                if (!effect.check(value)) {
                  context.issues.push((0, issue_factory_1.createIssue)(context.path, "custom", effect.message ?? "Validation failed"));
                  return parse_status_1.FAIL;
                }
                continue;
              }
              if (effect.type === "refineAsync") {
                if (!await effect.check(value)) {
                  context.issues.push((0, issue_factory_1.createIssue)(context.path, "custom", effect.message ?? "Validation failed"));
                  return parse_status_1.FAIL;
                }
                continue;
              }
              if (effect.type === "transform") {
                value = effect.transform(value);
                continue;
              }
              if (effect.type === "transformAsync") {
                value = await effect.transform(value);
                continue;
              }
              if (effect.type === "superRefine") {
                effect.handler(value, context);
                if (context.issues.length > 0) {
                  return parse_status_1.FAIL;
                }
                continue;
              }
              if (effect.type === "superRefineAsync") {
                await effect.handler(value, context);
                if (context.issues.length > 0) {
                  return parse_status_1.FAIL;
                }
              }
            }
            return (0, parse_status_1.OK)(value);
          }
          // =========================
          // API
          // =========================
          refine(check, message) {
            return new _EffectsSchema(this.baseSchema, [
              ...this.effects,
              { type: "refine", check, message }
            ]);
          }
          refineAsync(check, message) {
            return new _EffectsSchema(this.baseSchema, [
              ...this.effects,
              { type: "refineAsync", check, message }
            ]);
          }
          transform(transform) {
            return new _EffectsSchema(this.baseSchema, [
              ...this.effects,
              { type: "transform", transform }
            ]);
          }
          transformAsync(transform) {
            return new _EffectsSchema(this.baseSchema, [
              ...this.effects,
              { type: "transformAsync", transform }
            ]);
          }
          superRefine(handler) {
            return new _EffectsSchema(this.baseSchema, [
              ...this.effects,
              { type: "superRefine", handler }
            ]);
          }
          superRefineAsync(handler) {
            return new _EffectsSchema(this.baseSchema, [
              ...this.effects,
              { type: "superRefineAsync", handler }
            ]);
          }
        };
        exports22.EffectsSchema = EffectsSchema;
      }
    });
    var require_nullable_schema2 = __commonJS2({
      "../core-validation/dist/schemas/nullable-schema.js"(exports22) {
        "use strict";
        Object.defineProperty(exports22, "__esModule", { value: true });
        exports22.NullableSchema = void 0;
        var base_schema_1 = require_base_schema2();
        var parse_status_1 = require_parse_status2();
        var NullableSchema = class extends base_schema_1.BaseSchema {
          constructor(innerSchema) {
            super();
            this.innerSchema = innerSchema;
          }
          _parse(context, input) {
            if (input === null) {
              return (0, parse_status_1.OK)(null);
            }
            return this.innerSchema["_parse"](context, input);
          }
        };
        exports22.NullableSchema = NullableSchema;
      }
    });
    var require_optional_schema2 = __commonJS2({
      "../core-validation/dist/schemas/optional-schema.js"(exports22) {
        "use strict";
        Object.defineProperty(exports22, "__esModule", { value: true });
        exports22.OptionalSchema = void 0;
        var base_schema_1 = require_base_schema2();
        var parse_status_1 = require_parse_status2();
        var OptionalSchema = class extends base_schema_1.BaseSchema {
          constructor(innerSchema) {
            super();
            this.innerSchema = innerSchema;
            this.__optionalBrand = true;
          }
          _parse(context, input) {
            if (input === void 0) {
              return (0, parse_status_1.OK)(void 0);
            }
            return this.innerSchema["_parse"](context, input);
          }
        };
        exports22.OptionalSchema = OptionalSchema;
      }
    });
    var require_base_schema_extensions2 = __commonJS2({
      "../core-validation/dist/core/base-schema-extensions.js"(exports22) {
        "use strict";
        Object.defineProperty(exports22, "__esModule", { value: true });
        var base_schema_1 = require_base_schema2();
        var effects_schema_1 = require_effects_schema2();
        var nullable_schema_1 = require_nullable_schema2();
        var optional_schema_1 = require_optional_schema2();
        base_schema_1.BaseSchema.prototype.optional = function() {
          return new optional_schema_1.OptionalSchema(this);
        };
        base_schema_1.BaseSchema.prototype.nullable = function() {
          return new nullable_schema_1.NullableSchema(this);
        };
        base_schema_1.BaseSchema.prototype.refine = function(check, message) {
          return new effects_schema_1.EffectsSchema(this, [
            {
              type: "refine",
              check,
              message
            }
          ]);
        };
        base_schema_1.BaseSchema.prototype.transform = function(transform) {
          return new effects_schema_1.EffectsSchema(this, [
            {
              type: "transform",
              transform
            }
          ]);
        };
        base_schema_1.BaseSchema.prototype.superRefine = function(handler) {
          return new effects_schema_1.EffectsSchema(this, [
            {
              type: "superRefine",
              handler
            }
          ]);
        };
        base_schema_1.BaseSchema.prototype.refineAsync = function(check, message) {
          return new effects_schema_1.EffectsSchema(this, [
            { type: "refineAsync", check, message }
          ]);
        };
        base_schema_1.BaseSchema.prototype.transformAsync = function(transform) {
          return new effects_schema_1.EffectsSchema(this, [
            { type: "transformAsync", transform }
          ]);
        };
        base_schema_1.BaseSchema.prototype.superRefineAsync = function(handler) {
          return new effects_schema_1.EffectsSchema(this, [
            { type: "superRefineAsync", handler }
          ]);
        };
      }
    });
    var require_any_schema2 = __commonJS2({
      "../core-validation/dist/schemas/any-schema.js"(exports22) {
        "use strict";
        Object.defineProperty(exports22, "__esModule", { value: true });
        exports22.AnySchema = void 0;
        var base_schema_1 = require_base_schema2();
        var parse_status_1 = require_parse_status2();
        var AnySchema = class extends base_schema_1.BaseSchema {
          _parse(_context, input) {
            return (0, parse_status_1.OK)(input);
          }
        };
        exports22.AnySchema = AnySchema;
      }
    });
    var require_schema_internal2 = __commonJS2({
      "../core-validation/dist/core/schema-internal.js"(exports22) {
        "use strict";
        Object.defineProperty(exports22, "__esModule", { value: true });
        exports22.pushPath = pushPath;
        exports22.popPath = popPath;
        function pushPath(ctx, key) {
          ctx.path.push(key);
        }
        function popPath(ctx) {
          ctx.path.pop();
        }
      }
    });
    var require_format_value2 = __commonJS2({
      "../core-validation/dist/utils/format-value.js"(exports22) {
        "use strict";
        Object.defineProperty(exports22, "__esModule", { value: true });
        exports22.formatValue = formatValue;
        function formatValue(value) {
          if (typeof value === "string") {
            return `"${value}"`;
          }
          if (typeof value === "number" || typeof value === "boolean" || value === null || value === void 0) {
            return String(value);
          }
          if (typeof value === "bigint") {
            return `${value}n`;
          }
          if (typeof value === "symbol") {
            return value.toString();
          }
          if (typeof value === "function") {
            return `[Function ${value.name || "anonymous"}]`;
          }
          if (value instanceof Date) {
            return `Date(${value.toISOString()})`;
          }
          try {
            return JSON.stringify(value);
          } catch {
            return Object.prototype.toString.call(value);
          }
        }
      }
    });
    var require_array_schema2 = __commonJS2({
      "../core-validation/dist/schemas/array-schema.js"(exports22) {
        "use strict";
        Object.defineProperty(exports22, "__esModule", { value: true });
        exports22.ArraySchema = void 0;
        var base_schema_1 = require_base_schema2();
        var issue_factory_1 = require_issue_factory2();
        var parse_status_1 = require_parse_status2();
        var schema_internal_1 = require_schema_internal2();
        var format_value_1 = require_format_value2();
        var ArraySchema = class _ArraySchema extends base_schema_1.BaseSchema {
          constructor(itemSchema, options) {
            super();
            this.itemSchema = itemSchema;
            this.constraints = options?.constraints ?? [];
          }
          min(length, message) {
            this.assertValidNonNegativeInteger(length, "min");
            return this.withConstraint({
              kind: "min",
              value: length,
              message
            });
          }
          max(length, message) {
            this.assertValidNonNegativeInteger(length, "max");
            return this.withConstraint({
              kind: "max",
              value: length,
              message
            });
          }
          length(length, message) {
            this.assertValidNonNegativeInteger(length, "length");
            return this.withConstraint({
              kind: "length",
              value: length,
              message
            });
          }
          nonempty(message) {
            return this.min(1, message ?? "Array must not be empty");
          }
          _parse(context, input) {
            if (!Array.isArray(input)) {
              context.issues.push((0, issue_factory_1.createIssue)(context.path, "invalid_type", `Expected array, received ${(0, format_value_1.formatValue)(input)}`, {
                expected: "array",
                received: input
              }));
              return parse_status_1.FAIL;
            }
            const array = input;
            for (const constraint of this.constraints) {
              const result = this.applyConstraint(context, array, constraint);
              if (!result.success) {
                return parse_status_1.FAIL;
              }
            }
            const output = [];
            for (let i = 0; i < array.length; i++) {
              const item = array[i];
              (0, schema_internal_1.pushPath)(context, i);
              const result = this.itemSchema["_parse"](context, item);
              (0, schema_internal_1.popPath)(context);
              if (!result.success) {
                return parse_status_1.FAIL;
              }
              output.push(result.data);
            }
            return (0, parse_status_1.OK)(output);
          }
          withConstraint(constraint) {
            return new _ArraySchema(this.itemSchema, {
              constraints: [...this.constraints, constraint]
            });
          }
          applyConstraint(context, array, constraint) {
            switch (constraint.kind) {
              case "min":
                return this.checkMin(context, array, constraint.value, constraint.message);
              case "max":
                return this.checkMax(context, array, constraint.value, constraint.message);
              case "length":
                return this.checkLength(context, array, constraint.value, constraint.message);
              default: {
                const exhaustiveCheck = constraint;
                throw new Error(`Unhandled array constraint: ${JSON.stringify(exhaustiveCheck)}`);
              }
            }
          }
          checkMin(context, array, min, message) {
            if (array.length >= min) {
              return (0, parse_status_1.OK)(array);
            }
            context.issues.push((0, issue_factory_1.createIssue)(context.path, "array_too_short", message ?? `Array must contain at least ${min} item(s)`, {
              expected: `length >= ${min}`,
              received: array,
              metadata: {
                minLength: min,
                actualLength: array.length
              }
            }));
            return parse_status_1.FAIL;
          }
          checkMax(context, array, max, message) {
            if (array.length <= max) {
              return (0, parse_status_1.OK)(array);
            }
            context.issues.push((0, issue_factory_1.createIssue)(context.path, "array_too_long", message ?? `Array must contain at most ${max} item(s)`, {
              expected: `length <= ${max}`,
              received: array,
              metadata: {
                maxLength: max,
                actualLength: array.length
              }
            }));
            return parse_status_1.FAIL;
          }
          checkLength(context, array, length, message) {
            if (array.length === length) {
              return (0, parse_status_1.OK)(array);
            }
            const code = array.length < length ? "array_too_short" : "array_too_long";
            context.issues.push((0, issue_factory_1.createIssue)(context.path, code, message ?? `Array must contain exactly ${length} item(s)`, {
              expected: `length === ${length}`,
              received: array,
              metadata: {
                expectedLength: length,
                actualLength: array.length
              }
            }));
            return parse_status_1.FAIL;
          }
          assertValidNonNegativeInteger(value, method) {
            if (!Number.isInteger(value) || value < 0) {
              throw new TypeError(`ArraySchema.${method} expected a non-negative integer`);
            }
          }
        };
        exports22.ArraySchema = ArraySchema;
      }
    });
    var require_boolean_schema2 = __commonJS2({
      "../core-validation/dist/schemas/boolean-schema.js"(exports22) {
        "use strict";
        Object.defineProperty(exports22, "__esModule", { value: true });
        exports22.BooleanSchema = void 0;
        var base_schema_1 = require_base_schema2();
        var issue_factory_1 = require_issue_factory2();
        var parse_status_1 = require_parse_status2();
        var format_value_1 = require_format_value2();
        var BooleanSchema = class extends base_schema_1.BaseSchema {
          _parse(context, input) {
            if (typeof input !== "boolean") {
              context.issues.push((0, issue_factory_1.createIssue)(context.path, "invalid_type", `Expected boolean, received ${(0, format_value_1.formatValue)(input)}`, {
                expected: "boolean",
                received: input
              }));
              return parse_status_1.FAIL;
            }
            return (0, parse_status_1.OK)(input);
          }
        };
        exports22.BooleanSchema = BooleanSchema;
      }
    });
    var require_custom_schema2 = __commonJS2({
      "../core-validation/dist/schemas/custom-schema.js"(exports22) {
        "use strict";
        Object.defineProperty(exports22, "__esModule", { value: true });
        exports22.CustomSchema = void 0;
        var base_schema_1 = require_base_schema2();
        var issue_factory_1 = require_issue_factory2();
        var parse_status_1 = require_parse_status2();
        var CustomSchema = class extends base_schema_1.BaseSchema {
          constructor(check, message) {
            super();
            this.check = check;
            this.message = message;
          }
          _parse(context, input) {
            if (!this.check(input)) {
              context.issues.push((0, issue_factory_1.createIssue)(context.path, "custom", this.message, {
                received: input
              }));
              return parse_status_1.FAIL;
            }
            return (0, parse_status_1.OK)(input);
          }
        };
        exports22.CustomSchema = CustomSchema;
      }
    });
    var require_enum_schema2 = __commonJS2({
      "../core-validation/dist/schemas/enum-schema.js"(exports22) {
        "use strict";
        Object.defineProperty(exports22, "__esModule", { value: true });
        exports22.EnumSchema = void 0;
        var base_schema_1 = require_base_schema2();
        var issue_factory_1 = require_issue_factory2();
        var parse_status_1 = require_parse_status2();
        var format_value_1 = require_format_value2();
        var EnumSchema = class extends base_schema_1.BaseSchema {
          constructor(values) {
            super();
            this.values = values;
            this.valuesSet = new Set(values);
          }
          getValues() {
            return this.values;
          }
          _parse(context, input) {
            if (typeof input !== "string") {
              context.issues.push((0, issue_factory_1.createIssue)(context.path, "invalid_type", `Expected enum string, received ${(0, format_value_1.formatValue)(input)}`, {
                expected: `one of: ${this.values.join(", ")}`,
                received: input,
                metadata: {
                  allowedValues: [...this.values]
                }
              }));
              return parse_status_1.FAIL;
            }
            if (!this.valuesSet.has(input)) {
              context.issues.push((0, issue_factory_1.createIssue)(context.path, "invalid_enum_value", `Expected one of ${this.values.map((value) => (0, format_value_1.formatValue)(value)).join(", ")}, received ${(0, format_value_1.formatValue)(input)}`, {
                expected: `one of: ${this.values.join(", ")}`,
                received: input,
                metadata: {
                  allowedValues: [...this.values]
                }
              }));
              return parse_status_1.FAIL;
            }
            return (0, parse_status_1.OK)(input);
          }
        };
        exports22.EnumSchema = EnumSchema;
      }
    });
    var require_literal_schema2 = __commonJS2({
      "../core-validation/dist/schemas/literal-schema.js"(exports22) {
        "use strict";
        Object.defineProperty(exports22, "__esModule", { value: true });
        exports22.LiteralSchema = void 0;
        var base_schema_1 = require_base_schema2();
        var issue_factory_1 = require_issue_factory2();
        var parse_status_1 = require_parse_status2();
        var format_value_1 = require_format_value2();
        var LiteralSchema = class extends base_schema_1.BaseSchema {
          constructor(literal) {
            super();
            this.literal = literal;
          }
          getValue() {
            return this.literal;
          }
          _parse(context, input) {
            if (input !== this.literal) {
              context.issues.push((0, issue_factory_1.createIssue)(context.path, "invalid_literal", `Expected literal ${(0, format_value_1.formatValue)(this.literal)}, received ${(0, format_value_1.formatValue)(input)}`, {
                expected: (0, format_value_1.formatValue)(this.literal),
                received: input,
                metadata: {
                  literal: this.literal
                }
              }));
              return parse_status_1.FAIL;
            }
            return (0, parse_status_1.OK)(this.literal);
          }
        };
        exports22.LiteralSchema = LiteralSchema;
      }
    });
    var require_never_schema2 = __commonJS2({
      "../core-validation/dist/schemas/never-schema.js"(exports22) {
        "use strict";
        Object.defineProperty(exports22, "__esModule", { value: true });
        exports22.NeverSchema = void 0;
        var base_schema_1 = require_base_schema2();
        var issue_factory_1 = require_issue_factory2();
        var parse_status_1 = require_parse_status2();
        var format_value_1 = require_format_value2();
        var NeverSchema = class extends base_schema_1.BaseSchema {
          _parse(context, input) {
            context.issues.push((0, issue_factory_1.createIssue)(context.path, "invalid_type", `Expected never, received ${(0, format_value_1.formatValue)(input)}`, {
              expected: "never",
              received: input
            }));
            return parse_status_1.FAIL;
          }
        };
        exports22.NeverSchema = NeverSchema;
      }
    });
    var require_number_schema2 = __commonJS2({
      "../core-validation/dist/schemas/number-schema.js"(exports22) {
        "use strict";
        Object.defineProperty(exports22, "__esModule", { value: true });
        exports22.NumberSchema = void 0;
        var base_schema_1 = require_base_schema2();
        var issue_factory_1 = require_issue_factory2();
        var parse_status_1 = require_parse_status2();
        var format_value_1 = require_format_value2();
        var NumberSchema = class _NumberSchema extends base_schema_1.BaseSchema {
          constructor(options) {
            super();
            this.constraints = options?.constraints ?? [];
          }
          min(value, message) {
            this.assertValidNumber(value, "min");
            return this.withConstraint({
              kind: "min",
              value,
              message
            });
          }
          max(value, message) {
            this.assertValidNumber(value, "max");
            return this.withConstraint({
              kind: "max",
              value,
              message
            });
          }
          int(message) {
            return this.withConstraint({
              kind: "int",
              message
            });
          }
          positive(message) {
            return this.withConstraint({
              kind: "positive",
              message
            });
          }
          nonnegative(message) {
            return this.withConstraint({
              kind: "nonnegative",
              message
            });
          }
          negative(message) {
            return this.withConstraint({
              kind: "negative",
              message
            });
          }
          nonpositive(message) {
            return this.withConstraint({
              kind: "nonpositive",
              message
            });
          }
          finite(message) {
            return this.withConstraint({
              kind: "finite",
              message
            });
          }
          safe(message) {
            return this.withConstraint({
              kind: "safe",
              message
            });
          }
          _parse(context, input) {
            if (typeof input !== "number") {
              context.issues.push((0, issue_factory_1.createIssue)(context.path, "invalid_type", `Expected number, received ${(0, format_value_1.formatValue)(input)}`, {
                expected: "number",
                received: input
              }));
              return parse_status_1.FAIL;
            }
            const value = input;
            for (const constraint of this.constraints) {
              const result = this.applyConstraint(context, value, constraint);
              if (!result.success) {
                return parse_status_1.FAIL;
              }
            }
            return (0, parse_status_1.OK)(value);
          }
          withConstraint(constraint) {
            return new _NumberSchema({
              constraints: [...this.constraints, constraint]
            });
          }
          applyConstraint(context, value, constraint) {
            switch (constraint.kind) {
              case "min":
                return this.checkMin(context, value, constraint.value, constraint.message);
              case "max":
                return this.checkMax(context, value, constraint.value, constraint.message);
              case "int":
                return this.checkInt(context, value, constraint.message);
              case "positive":
                return this.checkPositive(context, value, constraint.message);
              case "nonnegative":
                return this.checkNonNegative(context, value, constraint.message);
              case "negative":
                return this.checkNegative(context, value, constraint.message);
              case "nonpositive":
                return this.checkNonPositive(context, value, constraint.message);
              case "finite":
                return this.checkFinite(context, value, constraint.message);
              case "safe":
                return this.checkSafe(context, value, constraint.message);
              default: {
                const exhaustiveCheck = constraint;
                throw new Error(`Unhandled number constraint: ${JSON.stringify(exhaustiveCheck)}`);
              }
            }
          }
          checkMin(context, value, min, message) {
            if (value >= min)
              return (0, parse_status_1.OK)(value);
            context.issues.push((0, issue_factory_1.createIssue)(context.path, "number_too_small", message ?? `Number must be >= ${min}`, {
              expected: `>= ${min}`,
              received: value
            }));
            return parse_status_1.FAIL;
          }
          checkMax(context, value, max, message) {
            if (value <= max)
              return (0, parse_status_1.OK)(value);
            context.issues.push((0, issue_factory_1.createIssue)(context.path, "number_too_large", message ?? `Number must be <= ${max}`, {
              expected: `<= ${max}`,
              received: value
            }));
            return parse_status_1.FAIL;
          }
          checkInt(context, value, message) {
            if (Number.isInteger(value))
              return (0, parse_status_1.OK)(value);
            context.issues.push((0, issue_factory_1.createIssue)(context.path, "number_not_integer", message ?? "Expected integer", {
              expected: "integer",
              received: value
            }));
            return parse_status_1.FAIL;
          }
          checkPositive(context, value, message) {
            if (value > 0)
              return (0, parse_status_1.OK)(value);
            context.issues.push((0, issue_factory_1.createIssue)(context.path, "number_too_small", message ?? "Expected positive number", {
              expected: "> 0",
              received: value
            }));
            return parse_status_1.FAIL;
          }
          checkNonNegative(context, value, message) {
            if (value >= 0)
              return (0, parse_status_1.OK)(value);
            context.issues.push((0, issue_factory_1.createIssue)(context.path, "number_too_small", message ?? "Expected non-negative number", {
              expected: ">= 0",
              received: value
            }));
            return parse_status_1.FAIL;
          }
          checkNegative(context, value, message) {
            if (value < 0)
              return (0, parse_status_1.OK)(value);
            context.issues.push((0, issue_factory_1.createIssue)(context.path, "number_too_large", message ?? "Expected negative number", {
              expected: "< 0",
              received: value
            }));
            return parse_status_1.FAIL;
          }
          checkNonPositive(context, value, message) {
            if (value <= 0)
              return (0, parse_status_1.OK)(value);
            context.issues.push((0, issue_factory_1.createIssue)(context.path, "number_too_large", message ?? "Expected non-positive number", {
              expected: "<= 0",
              received: value
            }));
            return parse_status_1.FAIL;
          }
          checkFinite(context, value, message) {
            if (Number.isFinite(value))
              return (0, parse_status_1.OK)(value);
            context.issues.push((0, issue_factory_1.createIssue)(context.path, "number_not_finite", message ?? "Expected finite number", {
              expected: "finite number",
              received: value
            }));
            return parse_status_1.FAIL;
          }
          checkSafe(context, value, message) {
            if (Number.isSafeInteger(value))
              return (0, parse_status_1.OK)(value);
            context.issues.push((0, issue_factory_1.createIssue)(context.path, "number_not_integer", message ?? "Expected safe integer", {
              expected: "safe integer",
              received: value
            }));
            return parse_status_1.FAIL;
          }
          assertValidNumber(value, method) {
            if (typeof value !== "number" || Number.isNaN(value)) {
              throw new TypeError(`NumberSchema.${method} expected a valid number`);
            }
          }
        };
        exports22.NumberSchema = NumberSchema;
      }
    });
    var require_get_object_keys2 = __commonJS2({
      "../core-validation/dist/utils/get-object-keys.js"(exports22) {
        "use strict";
        Object.defineProperty(exports22, "__esModule", { value: true });
        exports22.getObjectKeys = getObjectKeys;
        function getObjectKeys(value) {
          return Object.keys(value);
        }
      }
    });
    var require_is_plain_object2 = __commonJS2({
      "../core-validation/dist/utils/is-plain-object.js"(exports22) {
        "use strict";
        Object.defineProperty(exports22, "__esModule", { value: true });
        exports22.isPlainObject = isPlainObject;
        function isPlainObject(value) {
          if (typeof value !== "object" || value === null) {
            return false;
          }
          const prototype = Object.getPrototypeOf(value);
          return prototype === Object.prototype || prototype === null;
        }
      }
    });
    var require_object_schema2 = __commonJS2({
      "../core-validation/dist/schemas/object-schema.js"(exports22) {
        "use strict";
        Object.defineProperty(exports22, "__esModule", { value: true });
        exports22.ObjectSchema = void 0;
        var base_schema_1 = require_base_schema2();
        var issue_factory_1 = require_issue_factory2();
        var parse_status_1 = require_parse_status2();
        var schema_internal_1 = require_schema_internal2();
        var format_value_1 = require_format_value2();
        var get_object_keys_1 = require_get_object_keys2();
        var is_plain_object_1 = require_is_plain_object2();
        var ObjectSchema = class _ObjectSchema extends base_schema_1.BaseSchema {
          constructor(shape, options) {
            super();
            this.shape = shape;
            this.mode = options?.mode ?? "strict";
            this.shapeKeys = (0, get_object_keys_1.getObjectKeys)(shape);
            this.knownKeys = new Set(this.shapeKeys);
          }
          strict() {
            return new _ObjectSchema(this.shape, { mode: "strict" });
          }
          strip() {
            return new _ObjectSchema(this.shape, { mode: "strip" });
          }
          passthrough() {
            return new _ObjectSchema(this.shape, { mode: "passthrough" });
          }
          extend(extension) {
            return new _ObjectSchema({
              ...this.shape,
              ...extension
            }, { mode: this.mode });
          }
          merge(other) {
            return new _ObjectSchema({
              ...this.shape,
              ...other.getShape()
            }, { mode: this.mode });
          }
          pick(keys) {
            const pickedShape = {};
            for (const key of keys) {
              pickedShape[key] = this.shape[key];
            }
            return new _ObjectSchema(pickedShape, { mode: this.mode });
          }
          omit(keys) {
            const omittedKeys = new Set(keys);
            const nextShape = {};
            for (const key of (0, get_object_keys_1.getObjectKeys)(this.shape)) {
              if (!omittedKeys.has(key)) {
                nextShape[key] = this.shape[key];
              }
            }
            return new _ObjectSchema(nextShape, { mode: this.mode });
          }
          partial() {
            const nextShape = {};
            for (const key of this.shapeKeys) {
              const fieldSchema = this.shape[key];
              nextShape[key] = fieldSchema.optional();
            }
            return new _ObjectSchema(nextShape, { mode: this.mode });
          }
          getShape() {
            return this.shape;
          }
          _parse(context, input) {
            if (!(0, is_plain_object_1.isPlainObject)(input)) {
              context.issues.push((0, issue_factory_1.createIssue)(context.path, "invalid_type", `Expected object, received ${(0, format_value_1.formatValue)(input)}`, {
                expected: "object",
                received: input
              }));
              return parse_status_1.FAIL;
            }
            const source = input;
            const output = {};
            for (const key of this.shapeKeys) {
              const fieldSchema = this.shape[key];
              const rawValue = source[key];
              (0, schema_internal_1.pushPath)(context, key);
              const result = fieldSchema["_parse"](context, rawValue);
              (0, schema_internal_1.popPath)(context);
              if (!result.success) {
                return parse_status_1.FAIL;
              }
              if (result.data !== void 0) {
                output[key] = result.data;
              }
            }
            const inputKeys = (0, get_object_keys_1.getObjectKeys)(source);
            for (const key of inputKeys) {
              if (this.knownKeys.has(key)) {
                continue;
              }
              if (this.mode === "passthrough") {
                output[key] = source[key];
                continue;
              }
              if (this.mode === "strip") {
                continue;
              }
              context.issues.push((0, issue_factory_1.createIssue)([...context.path, key], "unrecognized_key", `Unrecognized key ${(0, format_value_1.formatValue)(key)}`, {
                expected: "known object key",
                received: key
              }));
              return parse_status_1.FAIL;
            }
            return (0, parse_status_1.OK)(output);
          }
        };
        exports22.ObjectSchema = ObjectSchema;
      }
    });
    var require_record_schema2 = __commonJS2({
      "../core-validation/dist/schemas/record-schema.js"(exports22) {
        "use strict";
        Object.defineProperty(exports22, "__esModule", { value: true });
        exports22.RecordSchema = void 0;
        var base_schema_1 = require_base_schema2();
        var issue_factory_1 = require_issue_factory2();
        var parse_status_1 = require_parse_status2();
        var schema_internal_1 = require_schema_internal2();
        var format_value_1 = require_format_value2();
        var get_object_keys_1 = require_get_object_keys2();
        var is_plain_object_1 = require_is_plain_object2();
        var RecordSchema = class extends base_schema_1.BaseSchema {
          constructor(keySchema, valueSchema) {
            super();
            this.keySchema = keySchema;
            this.valueSchema = valueSchema;
          }
          _parse(context, input) {
            if (!(0, is_plain_object_1.isPlainObject)(input)) {
              context.issues.push((0, issue_factory_1.createIssue)(context.path, "invalid_type", `Expected record object, received ${(0, format_value_1.formatValue)(input)}`, {
                expected: "object",
                received: input
              }));
              return parse_status_1.FAIL;
            }
            const source = input;
            const output = {};
            for (const key of (0, get_object_keys_1.getObjectKeys)(source)) {
              const rawValue = source[key];
              const keyContext = {
                path: [...context.path, key],
                issues: []
              };
              const keyResult = this.keySchema["_parse"](keyContext, key);
              if (!keyResult.success) {
                context.issues.push((0, issue_factory_1.createIssue)([...context.path, key], "invalid_key", `Invalid key ${(0, format_value_1.formatValue)(key)}`, {
                  expected: "valid key",
                  received: key,
                  metadata: {
                    keyIssues: keyContext.issues
                  }
                }));
                return parse_status_1.FAIL;
              }
              const parsedKey = keyResult.data;
              (0, schema_internal_1.pushPath)(context, key);
              const valueResult = this.valueSchema["_parse"](context, rawValue);
              (0, schema_internal_1.popPath)(context);
              if (!valueResult.success) {
                return parse_status_1.FAIL;
              }
              output[parsedKey] = valueResult.data;
            }
            return (0, parse_status_1.OK)(output);
          }
        };
        exports22.RecordSchema = RecordSchema;
      }
    });
    var require_string_schema2 = __commonJS2({
      "../core-validation/dist/schemas/string-schema.js"(exports22) {
        "use strict";
        Object.defineProperty(exports22, "__esModule", { value: true });
        exports22.StringSchema = void 0;
        var base_schema_1 = require_base_schema2();
        var issue_factory_1 = require_issue_factory2();
        var parse_status_1 = require_parse_status2();
        var format_value_1 = require_format_value2();
        var StringSchema = class _StringSchema extends base_schema_1.BaseSchema {
          constructor(options) {
            super();
            this.shouldTrim = options?.shouldTrim ?? false;
            this.constraints = options?.constraints ?? [];
          }
          trim() {
            return new _StringSchema({
              shouldTrim: true,
              constraints: this.constraints
            });
          }
          min(length, message) {
            this.assertValidNonNegativeInteger(length, "min");
            return this.withConstraint({
              kind: "min",
              value: length,
              message
            });
          }
          max(length, message) {
            this.assertValidNonNegativeInteger(length, "max");
            return this.withConstraint({
              kind: "max",
              value: length,
              message
            });
          }
          length(length, message) {
            this.assertValidNonNegativeInteger(length, "length");
            return this.withConstraint({
              kind: "length",
              value: length,
              message
            });
          }
          nonempty(message) {
            return this.min(1, message ?? "String must not be empty");
          }
          regex(pattern, message) {
            if (!(pattern instanceof RegExp)) {
              throw new TypeError("StringSchema.regex expected a RegExp instance");
            }
            return this.withConstraint({
              kind: "regex",
              regex: pattern,
              message
            });
          }
          startsWith(prefix, message) {
            if (prefix.length === 0) {
              throw new TypeError("StringSchema.startsWith expected a non-empty prefix");
            }
            return this.withConstraint({
              kind: "startsWith",
              value: prefix,
              message
            });
          }
          endsWith(suffix, message) {
            if (suffix.length === 0) {
              throw new TypeError("StringSchema.endsWith expected a non-empty suffix");
            }
            return this.withConstraint({
              kind: "endsWith",
              value: suffix,
              message
            });
          }
          includes(search, message) {
            if (search.length === 0) {
              throw new TypeError("StringSchema.includes expected a non-empty search value");
            }
            return this.withConstraint({
              kind: "includes",
              value: search,
              message
            });
          }
          _parse(context, input) {
            if (typeof input !== "string") {
              context.issues.push((0, issue_factory_1.createIssue)(context.path, "invalid_type", `Expected string, received ${(0, format_value_1.formatValue)(input)}`, {
                expected: "string",
                received: input
              }));
              return parse_status_1.FAIL;
            }
            const value = this.shouldTrim ? input.trim() : input;
            for (const constraint of this.constraints) {
              const result = this.applyConstraint(context, value, constraint);
              if (!result.success) {
                return parse_status_1.FAIL;
              }
            }
            return (0, parse_status_1.OK)(value);
          }
          withConstraint(constraint) {
            return new _StringSchema({
              shouldTrim: this.shouldTrim,
              constraints: [...this.constraints, constraint]
            });
          }
          applyConstraint(context, value, constraint) {
            switch (constraint.kind) {
              case "min":
                return this.checkMin(context, value, constraint.value, constraint.message);
              case "max":
                return this.checkMax(context, value, constraint.value, constraint.message);
              case "length":
                return this.checkLength(context, value, constraint.value, constraint.message);
              case "regex":
                return this.checkRegex(context, value, constraint.regex, constraint.message);
              case "startsWith":
                return this.checkStartsWith(context, value, constraint.value, constraint.message);
              case "endsWith":
                return this.checkEndsWith(context, value, constraint.value, constraint.message);
              case "includes":
                return this.checkIncludes(context, value, constraint.value, constraint.message);
              default: {
                const exhaustiveCheck = constraint;
                throw new Error(`Unhandled string constraint: ${JSON.stringify(exhaustiveCheck)}`);
              }
            }
          }
          checkMin(context, value, minLength, message) {
            if (value.length >= minLength) {
              return (0, parse_status_1.OK)(value);
            }
            context.issues.push((0, issue_factory_1.createIssue)(context.path, "string_too_short", message ?? `String must contain at least ${minLength} character(s)`, {
              expected: `length >= ${minLength}`,
              received: value,
              metadata: {
                minLength,
                actualLength: value.length
              }
            }));
            return parse_status_1.FAIL;
          }
          checkMax(context, value, maxLength, message) {
            if (value.length <= maxLength) {
              return (0, parse_status_1.OK)(value);
            }
            context.issues.push((0, issue_factory_1.createIssue)(context.path, "string_too_long", message ?? `String must contain at most ${maxLength} character(s)`, {
              expected: `length <= ${maxLength}`,
              received: value,
              metadata: {
                maxLength,
                actualLength: value.length
              }
            }));
            return parse_status_1.FAIL;
          }
          checkLength(context, value, exactLength, message) {
            if (value.length === exactLength) {
              return (0, parse_status_1.OK)(value);
            }
            const code = value.length < exactLength ? "string_too_short" : "string_too_long";
            context.issues.push((0, issue_factory_1.createIssue)(context.path, code, message ?? `String must contain exactly ${exactLength} character(s)`, {
              expected: `length === ${exactLength}`,
              received: value,
              metadata: {
                exactLength,
                actualLength: value.length
              }
            }));
            return parse_status_1.FAIL;
          }
          checkRegex(context, value, pattern, message) {
            pattern.lastIndex = 0;
            if (pattern.test(value)) {
              return (0, parse_status_1.OK)(value);
            }
            context.issues.push((0, issue_factory_1.createIssue)(context.path, "string_invalid_format", message ?? `String does not match required pattern ${pattern.toString()}`, {
              expected: pattern.toString(),
              received: value,
              metadata: {
                pattern: pattern.toString()
              }
            }));
            return parse_status_1.FAIL;
          }
          checkStartsWith(context, value, prefix, message) {
            if (value.startsWith(prefix)) {
              return (0, parse_status_1.OK)(value);
            }
            context.issues.push((0, issue_factory_1.createIssue)(context.path, "string_invalid_starts_with", message ?? `String must start with ${(0, format_value_1.formatValue)(prefix)}`, {
              expected: `startsWith(${prefix})`,
              received: value,
              metadata: {
                prefix
              }
            }));
            return parse_status_1.FAIL;
          }
          checkEndsWith(context, value, suffix, message) {
            if (value.endsWith(suffix)) {
              return (0, parse_status_1.OK)(value);
            }
            context.issues.push((0, issue_factory_1.createIssue)(context.path, "string_invalid_ends_with", message ?? `String must end with ${(0, format_value_1.formatValue)(suffix)}`, {
              expected: `endsWith(${suffix})`,
              received: value,
              metadata: {
                suffix
              }
            }));
            return parse_status_1.FAIL;
          }
          checkIncludes(context, value, search, message) {
            if (value.includes(search)) {
              return (0, parse_status_1.OK)(value);
            }
            context.issues.push((0, issue_factory_1.createIssue)(context.path, "string_invalid_includes", message ?? `String must include ${(0, format_value_1.formatValue)(search)}`, {
              expected: `includes(${search})`,
              received: value,
              metadata: {
                search
              }
            }));
            return parse_status_1.FAIL;
          }
          assertValidNonNegativeInteger(value, methodName) {
            if (!Number.isInteger(value) || value < 0) {
              throw new TypeError(`StringSchema.${methodName} expected a non-negative integer`);
            }
          }
        };
        exports22.StringSchema = StringSchema;
      }
    });
    var require_get_array_item2 = __commonJS2({
      "../core-validation/dist/utils/get-array-item.js"(exports22) {
        "use strict";
        Object.defineProperty(exports22, "__esModule", { value: true });
        exports22.getArrayItem = getArrayItem;
        function getArrayItem(array, index) {
          const item = array[index];
          if (item === void 0) {
            throw new Error(`Missing array item at index ${index}`);
          }
          return item;
        }
      }
    });
    var require_tuple_schema2 = __commonJS2({
      "../core-validation/dist/schemas/tuple-schema.js"(exports22) {
        "use strict";
        Object.defineProperty(exports22, "__esModule", { value: true });
        exports22.TupleSchema = void 0;
        var base_schema_1 = require_base_schema2();
        var issue_factory_1 = require_issue_factory2();
        var parse_status_1 = require_parse_status2();
        var schema_internal_1 = require_schema_internal2();
        var format_value_1 = require_format_value2();
        var get_array_item_1 = require_get_array_item2();
        var TupleSchema = class extends base_schema_1.BaseSchema {
          constructor(schemas) {
            super();
            this.schemas = schemas;
          }
          _parse(context, input) {
            if (!Array.isArray(input)) {
              context.issues.push((0, issue_factory_1.createIssue)(context.path, "invalid_type", `Expected tuple (array), received ${(0, format_value_1.formatValue)(input)}`, {
                expected: "tuple",
                received: input
              }));
              return parse_status_1.FAIL;
            }
            const array = input;
            if (array.length !== this.schemas.length) {
              context.issues.push((0, issue_factory_1.createIssue)(context.path, "array_too_short", `Expected tuple length ${this.schemas.length}, received ${array.length}`, {
                expected: `length === ${this.schemas.length}`,
                received: array
              }));
              return parse_status_1.FAIL;
            }
            const output = [];
            for (let i = 0; i < this.schemas.length; i++) {
              const schema7 = (0, get_array_item_1.getArrayItem)(this.schemas, i);
              const value = array[i];
              (0, schema_internal_1.pushPath)(context, i);
              const result = schema7["_parse"](context, value);
              (0, schema_internal_1.popPath)(context);
              if (!result.success) {
                return parse_status_1.FAIL;
              }
              output.push(result.data);
            }
            return (0, parse_status_1.OK)(output);
          }
        };
        exports22.TupleSchema = TupleSchema;
      }
    });
    var require_validation_runtime2 = __commonJS2({
      "../core-validation/dist/core/validation-runtime.js"(exports22) {
        "use strict";
        Object.defineProperty(exports22, "__esModule", { value: true });
        exports22.getValidationRuntimeOptions = getValidationRuntimeOptions;
        exports22.setValidationRuntimeOptions = setValidationRuntimeOptions;
        var runtimeOptions = {
          includeDebugMetadata: true
        };
        function getValidationRuntimeOptions() {
          return runtimeOptions;
        }
        function setValidationRuntimeOptions(options) {
          if (typeof options.includeDebugMetadata === "boolean") {
            runtimeOptions.includeDebugMetadata = options.includeDebugMetadata;
          }
        }
      }
    });
    var require_union_schema2 = __commonJS2({
      "../core-validation/dist/schemas/union-schema.js"(exports22) {
        "use strict";
        Object.defineProperty(exports22, "__esModule", { value: true });
        exports22.UnionSchema = void 0;
        var base_schema_1 = require_base_schema2();
        var issue_factory_1 = require_issue_factory2();
        var parse_status_1 = require_parse_status2();
        var format_value_1 = require_format_value2();
        var get_array_item_1 = require_get_array_item2();
        var validation_runtime_1 = require_validation_runtime2();
        var UnionSchema = class extends base_schema_1.BaseSchema {
          constructor(schemas) {
            super();
            this.schemas = schemas;
          }
          getSchemas() {
            return this.schemas;
          }
          _parse(context, input) {
            const branchFailures = [];
            for (let index = 0; index < this.schemas.length; index++) {
              const schema7 = (0, get_array_item_1.getArrayItem)(this.schemas, index);
              const branchContext = {
                path: [...context.path],
                issues: []
              };
              const result = schema7["_parse"](branchContext, input);
              if (result.success) {
                return (0, parse_status_1.OK)(result.data);
              }
              branchFailures.push({
                index,
                issues: [...branchContext.issues]
              });
            }
            const runtimeOptions = (0, validation_runtime_1.getValidationRuntimeOptions)();
            context.issues.push((0, issue_factory_1.createIssue)(context.path, "invalid_union", `Input did not match any union branch, received ${(0, format_value_1.formatValue)(input)}`, {
              expected: "valid union branch",
              received: input,
              metadata: runtimeOptions.includeDebugMetadata ? {
                branchIssueCount: branchFailures.reduce((total, branch) => total + branch.issues.length, 0),
                branchFailures
              } : {
                branchIssueCount: branchFailures.reduce((total, branch) => total + branch.issues.length, 0)
              }
            }));
            return parse_status_1.FAIL;
          }
        };
        exports22.UnionSchema = UnionSchema;
      }
    });
    var require_unknown_schema2 = __commonJS2({
      "../core-validation/dist/schemas/unknown-schema.js"(exports22) {
        "use strict";
        Object.defineProperty(exports22, "__esModule", { value: true });
        exports22.UnknownSchema = void 0;
        var base_schema_1 = require_base_schema2();
        var parse_status_1 = require_parse_status2();
        var UnknownSchema = class extends base_schema_1.BaseSchema {
          _parse(_context, input) {
            return (0, parse_status_1.OK)(input);
          }
        };
        exports22.UnknownSchema = UnknownSchema;
      }
    });
    var require_function_schema2 = __commonJS2({
      "../core-validation/dist/schemas/function-schema.js"(exports22) {
        "use strict";
        Object.defineProperty(exports22, "__esModule", { value: true });
        exports22.FunctionSchema = void 0;
        var base_schema_1 = require_base_schema2();
        var issue_factory_1 = require_issue_factory2();
        var parse_status_1 = require_parse_status2();
        var format_value_1 = require_format_value2();
        var FunctionSchema = class extends base_schema_1.BaseSchema {
          _parse(context, input) {
            if (typeof input !== "function") {
              context.issues.push((0, issue_factory_1.createIssue)(context.path, "invalid_type", `Expected function, received ${(0, format_value_1.formatValue)(input)}`, {
                expected: "function",
                received: input
              }));
              return parse_status_1.FAIL;
            }
            return (0, parse_status_1.OK)(input);
          }
        };
        exports22.FunctionSchema = FunctionSchema;
      }
    });
    var require_lazy_schema2 = __commonJS2({
      "../core-validation/dist/schemas/lazy-schema.js"(exports22) {
        "use strict";
        Object.defineProperty(exports22, "__esModule", { value: true });
        exports22.LazySchema = void 0;
        var base_schema_1 = require_base_schema2();
        var LazySchema = class extends base_schema_1.BaseSchema {
          constructor(getter) {
            super();
            this.getter = getter;
          }
          _parse(context, input) {
            const schema7 = this.getter();
            return schema7["_parse"](context, input);
          }
        };
        exports22.LazySchema = LazySchema;
      }
    });
    var require_schema_factory2 = __commonJS2({
      "../core-validation/dist/schemas/schema-factory.js"(exports22) {
        "use strict";
        Object.defineProperty(exports22, "__esModule", { value: true });
        exports22.schema = void 0;
        var any_schema_1 = require_any_schema2();
        var array_schema_1 = require_array_schema2();
        var boolean_schema_1 = require_boolean_schema2();
        var custom_schema_1 = require_custom_schema2();
        var enum_schema_1 = require_enum_schema2();
        var literal_schema_1 = require_literal_schema2();
        var never_schema_1 = require_never_schema2();
        var nullable_schema_1 = require_nullable_schema2();
        var number_schema_1 = require_number_schema2();
        var object_schema_1 = require_object_schema2();
        var optional_schema_1 = require_optional_schema2();
        var record_schema_1 = require_record_schema2();
        var string_schema_1 = require_string_schema2();
        var tuple_schema_1 = require_tuple_schema2();
        var union_schema_1 = require_union_schema2();
        var unknown_schema_1 = require_unknown_schema2();
        var function_schema_1 = require_function_schema2();
        var lazy_schema_1 = require_lazy_schema2();
        var defaultRecordKeySchema = new string_schema_1.StringSchema();
        function recordFactory(keyOrValueSchema, maybeValueSchema) {
          if (maybeValueSchema) {
            return new record_schema_1.RecordSchema(keyOrValueSchema, maybeValueSchema);
          }
          return new record_schema_1.RecordSchema(defaultRecordKeySchema, keyOrValueSchema);
        }
        exports22.schema = {
          string() {
            return new string_schema_1.StringSchema();
          },
          number() {
            return new number_schema_1.NumberSchema();
          },
          boolean() {
            return new boolean_schema_1.BooleanSchema();
          },
          any() {
            return new any_schema_1.AnySchema();
          },
          unknown() {
            return new unknown_schema_1.UnknownSchema();
          },
          never() {
            return new never_schema_1.NeverSchema();
          },
          literal(value) {
            return new literal_schema_1.LiteralSchema(value);
          },
          enum(values) {
            return new enum_schema_1.EnumSchema(values);
          },
          object(shape) {
            return new object_schema_1.ObjectSchema(shape);
          },
          array(itemSchema) {
            return new array_schema_1.ArraySchema(itemSchema);
          },
          union(schemas) {
            return new union_schema_1.UnionSchema(schemas);
          },
          optional(innerSchema) {
            return new optional_schema_1.OptionalSchema(innerSchema);
          },
          nullable(innerSchema) {
            return new nullable_schema_1.NullableSchema(innerSchema);
          },
          tuple(schemas) {
            return new tuple_schema_1.TupleSchema(schemas);
          },
          record: recordFactory,
          custom(check, message) {
            return new custom_schema_1.CustomSchema(check, message);
          },
          function() {
            return new function_schema_1.FunctionSchema();
          },
          lazy(getter) {
            return new lazy_schema_1.LazySchema(getter);
          }
        };
      }
    });
    var require_parse2 = __commonJS2({
      "../core-validation/dist/parsing/parse.js"(exports22) {
        "use strict";
        Object.defineProperty(exports22, "__esModule", { value: true });
        exports22.parse = parse;
        function parse(schema7, input) {
          return schema7.parse(input);
        }
      }
    });
    var require_safe_parse2 = __commonJS2({
      "../core-validation/dist/parsing/safe-parse.js"(exports22) {
        "use strict";
        Object.defineProperty(exports22, "__esModule", { value: true });
        exports22.safeParse = safeParse;
        function safeParse(schema7, input) {
          return schema7.safeParse(input);
        }
      }
    });
    var require_assert_valid2 = __commonJS2({
      "../core-validation/dist/parsing/assert-valid.js"(exports22) {
        "use strict";
        Object.defineProperty(exports22, "__esModule", { value: true });
        exports22.assertValid = assertValid;
        function assertValid(schema7, input) {
          schema7.assert(input);
        }
      }
    });
    var require_parse_async2 = __commonJS2({
      "../core-validation/dist/parsing/parse-async.js"(exports22) {
        "use strict";
        Object.defineProperty(exports22, "__esModule", { value: true });
        exports22.parseAsync = parseAsync;
        async function parseAsync(schema7, input) {
          return schema7.parseAsync(input);
        }
      }
    });
    var require_safe_parse_async2 = __commonJS2({
      "../core-validation/dist/parsing/safe-parse-async.js"(exports22) {
        "use strict";
        Object.defineProperty(exports22, "__esModule", { value: true });
        exports22.safeParseAsync = safeParseAsync;
        async function safeParseAsync(schema7, input) {
          return schema7.safeParseAsync(input);
        }
      }
    });
    var require_parse_dto2 = __commonJS2({
      "../core-validation/dist/integration/parse-dto.js"(exports22) {
        "use strict";
        Object.defineProperty(exports22, "__esModule", { value: true });
        exports22.parseDto = parseDto22;
        function parseDto22(schema7, input) {
          return schema7.parse(input);
        }
      }
    });
    var require_parse_event_payload2 = __commonJS2({
      "../core-validation/dist/integration/parse-event-payload.js"(exports22) {
        "use strict";
        Object.defineProperty(exports22, "__esModule", { value: true });
        exports22.parseEventPayload = parseEventPayload;
        function parseEventPayload(schema7, payload) {
          return schema7.parse(payload);
        }
      }
    });
    var require_parse_config_section2 = __commonJS2({
      "../core-validation/dist/integration/parse-config-section.js"(exports22) {
        "use strict";
        Object.defineProperty(exports22, "__esModule", { value: true });
        exports22.parseConfigSection = parseConfigSection;
        function parseConfigSection(schema7, config) {
          return schema7.parse(config);
        }
      }
    });
    var require_patterns2 = __commonJS2({
      "../core-validation/dist/constants/patterns.js"(exports22) {
        "use strict";
        Object.defineProperty(exports22, "__esModule", { value: true });
        exports22.SERVICE_EXPORT_PATTERN = exports22.CUSTOM_EXPORT_PATTERN = exports22.NET_EVENT_PATTERN = exports22.LOCAL_EVENT_PATTERN = exports22.EXPORT_NAME_PATTERN = exports22.SERVICE_NAME_PATTERN = exports22.MODULE_NAME_PATTERN = void 0;
        exports22.MODULE_NAME_PATTERN = /^[a-z0-9-]+$/;
        exports22.SERVICE_NAME_PATTERN = /^[a-z0-9-]+$/;
        exports22.EXPORT_NAME_PATTERN = /^[A-Za-z][A-Za-z0-9]*$/;
        exports22.LOCAL_EVENT_PATTERN = /^[a-z0-9-]+:[A-Za-z][A-Za-z0-9]*$/;
        exports22.NET_EVENT_PATTERN = /^[a-z0-9-]+:net:[A-Za-z][A-Za-z0-9]*$/;
        exports22.CUSTOM_EXPORT_PATTERN = /^[a-z0-9-]+\.[A-Za-z][A-Za-z0-9]*$/;
        exports22.SERVICE_EXPORT_PATTERN = /^[a-z0-9-]+\.service\.[a-z0-9-]+$/;
      }
    });
    var require_public_api22 = __commonJS2({
      "../core-validation/dist/public-api.js"(exports22) {
        "use strict";
        Object.defineProperty(exports22, "__esModule", { value: true });
        exports22.setValidationRuntimeOptions = exports22.getValidationRuntimeOptions = exports22.SERVICE_EXPORT_PATTERN = exports22.CUSTOM_EXPORT_PATTERN = exports22.NET_EVENT_PATTERN = exports22.LOCAL_EVENT_PATTERN = exports22.EXPORT_NAME_PATTERN = exports22.SERVICE_NAME_PATTERN = exports22.MODULE_NAME_PATTERN = exports22.ValidationError = exports22.BaseSchema = exports22.parseConfigSection = exports22.parseEventPayload = exports22.parseDto = exports22.safeParseAsync = exports22.parseAsync = exports22.assertValid = exports22.safeParse = exports22.parse = exports22.schema = void 0;
        require_base_schema_extensions2();
        var schema_factory_1 = require_schema_factory2();
        Object.defineProperty(exports22, "schema", { enumerable: true, get: function() {
          return schema_factory_1.schema;
        } });
        var parse_1 = require_parse2();
        Object.defineProperty(exports22, "parse", { enumerable: true, get: function() {
          return parse_1.parse;
        } });
        var safe_parse_1 = require_safe_parse2();
        Object.defineProperty(exports22, "safeParse", { enumerable: true, get: function() {
          return safe_parse_1.safeParse;
        } });
        var assert_valid_1 = require_assert_valid2();
        Object.defineProperty(exports22, "assertValid", { enumerable: true, get: function() {
          return assert_valid_1.assertValid;
        } });
        var parse_async_1 = require_parse_async2();
        Object.defineProperty(exports22, "parseAsync", { enumerable: true, get: function() {
          return parse_async_1.parseAsync;
        } });
        var safe_parse_async_1 = require_safe_parse_async2();
        Object.defineProperty(exports22, "safeParseAsync", { enumerable: true, get: function() {
          return safe_parse_async_1.safeParseAsync;
        } });
        var parse_dto_1 = require_parse_dto2();
        Object.defineProperty(exports22, "parseDto", { enumerable: true, get: function() {
          return parse_dto_1.parseDto;
        } });
        var parse_event_payload_1 = require_parse_event_payload2();
        Object.defineProperty(exports22, "parseEventPayload", { enumerable: true, get: function() {
          return parse_event_payload_1.parseEventPayload;
        } });
        var parse_config_section_1 = require_parse_config_section2();
        Object.defineProperty(exports22, "parseConfigSection", { enumerable: true, get: function() {
          return parse_config_section_1.parseConfigSection;
        } });
        var base_schema_1 = require_base_schema2();
        Object.defineProperty(exports22, "BaseSchema", { enumerable: true, get: function() {
          return base_schema_1.BaseSchema;
        } });
        var validation_error_1 = require_validation_error22();
        Object.defineProperty(exports22, "ValidationError", { enumerable: true, get: function() {
          return validation_error_1.ValidationError;
        } });
        var patterns_1 = require_patterns2();
        Object.defineProperty(exports22, "MODULE_NAME_PATTERN", { enumerable: true, get: function() {
          return patterns_1.MODULE_NAME_PATTERN;
        } });
        Object.defineProperty(exports22, "SERVICE_NAME_PATTERN", { enumerable: true, get: function() {
          return patterns_1.SERVICE_NAME_PATTERN;
        } });
        Object.defineProperty(exports22, "EXPORT_NAME_PATTERN", { enumerable: true, get: function() {
          return patterns_1.EXPORT_NAME_PATTERN;
        } });
        Object.defineProperty(exports22, "LOCAL_EVENT_PATTERN", { enumerable: true, get: function() {
          return patterns_1.LOCAL_EVENT_PATTERN;
        } });
        Object.defineProperty(exports22, "NET_EVENT_PATTERN", { enumerable: true, get: function() {
          return patterns_1.NET_EVENT_PATTERN;
        } });
        Object.defineProperty(exports22, "CUSTOM_EXPORT_PATTERN", { enumerable: true, get: function() {
          return patterns_1.CUSTOM_EXPORT_PATTERN;
        } });
        Object.defineProperty(exports22, "SERVICE_EXPORT_PATTERN", { enumerable: true, get: function() {
          return patterns_1.SERVICE_EXPORT_PATTERN;
        } });
        var validation_runtime_1 = require_validation_runtime2();
        Object.defineProperty(exports22, "getValidationRuntimeOptions", { enumerable: true, get: function() {
          return validation_runtime_1.getValidationRuntimeOptions;
        } });
        Object.defineProperty(exports22, "setValidationRuntimeOptions", { enumerable: true, get: function() {
          return validation_runtime_1.setValidationRuntimeOptions;
        } });
      }
    });
    var require_dist22 = __commonJS2({
      "../core-validation/dist/index.js"(exports22) {
        "use strict";
        var __createBinding = exports22 && exports22.__createBinding || (Object.create ? (function(o, m, k, k2) {
          if (k2 === void 0) k2 = k;
          var desc = Object.getOwnPropertyDescriptor(m, k);
          if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
            desc = { enumerable: true, get: function() {
              return m[k];
            } };
          }
          Object.defineProperty(o, k2, desc);
        }) : (function(o, m, k, k2) {
          if (k2 === void 0) k2 = k;
          o[k2] = m[k];
        }));
        var __exportStar = exports22 && exports22.__exportStar || function(m, exports3) {
          for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p)) __createBinding(exports3, m, p);
        };
        Object.defineProperty(exports22, "__esModule", { value: true });
        __exportStar(require_public_api22(), exports22);
      }
    });
    var public_api_exports = {};
    __export(public_api_exports, {
      assertValidCustomExportName: () => assertValidCustomExportName,
      assertValidQualifiedExportName: () => assertValidQualifiedExportName,
      assertValidServiceExportName: () => assertValidServiceExportName,
      buildQualifiedExportName: () => buildQualifiedExportName2,
      buildQualifiedServiceExportName: () => buildQualifiedServiceExportName,
      exportRegistry: () => exportRegistry,
      getExportSnapshot: () => getExportSnapshot,
      hasService: () => hasService,
      listServices: () => listServices,
      registerModuleExport: () => registerModuleExport,
      registerPublicService: () => registerPublicService,
      registerService: () => registerService,
      resolveService: () => resolveService,
      validateCustomExportName: () => validateCustomExportName,
      validateExportValue: () => validateExportValue,
      validateQualifiedExportName: () => validateQualifiedExportName,
      validateRegisterModuleExportInput: () => validateRegisterModuleExportInput,
      validateRegisterPublicServiceInput: () => validateRegisterPublicServiceInput,
      validateServiceExportName: () => validateServiceExportName
    });
    module2.exports = __toCommonJS(public_api_exports);
    var import_public_api4 = __toESM2(require_public_api4());
    var import_core_errors5 = __toESM2(require_dist3());
    var import_core_validation72 = __toESM2(require_dist22());
    var import_core_validation8 = __toESM2(require_dist22());
    var CustomExportNameSchema = import_core_validation8.schema.string().trim().min(1).regex(/^[a-z0-9-]+\.[A-Za-z][A-Za-z0-9]*$/, "Invalid custom export name");
    var import_core_validation22 = __toESM2(require_dist22());
    var ExportValueSchema = import_core_validation22.schema.custom(
      (value) => typeof value === "function" || value !== void 0,
      "Export value must be defined or be a function"
    );
    var import_core_validation32 = __toESM2(require_dist22());
    var QualifiedExportNameSchema = import_core_validation32.schema.string().trim().min(1).refine(
      (value) => /^[a-z0-9-]+\.[A-Za-z][A-Za-z0-9]*$/.test(value) || /^[a-z0-9-]+\.service\.[a-z0-9-]+$/.test(value),
      "Invalid qualified export name"
    );
    var import_core_validation42 = __toESM2(require_dist22());
    var RegisterModuleExportSchema = import_core_validation42.schema.object({
      moduleName: import_core_validation42.schema.string().trim().min(1).regex(/^[a-z0-9-]+$/, "Invalid module name"),
      exportName: import_core_validation42.schema.string().trim().min(1).regex(/^[A-Za-z][A-Za-z0-9]*$/, "Invalid export name"),
      value: import_core_validation42.schema.custom(
        (value) => typeof value === "function" || value !== void 0,
        "Export value must be defined or be a function"
      )
    }).strict();
    var import_core_validation52 = __toESM2(require_dist22());
    var RegisterPublicServiceSchema = import_core_validation52.schema.object({
      moduleName: import_core_validation52.schema.string().trim().min(1).regex(/^[a-z0-9-]+$/, "Invalid module name"),
      serviceName: import_core_validation52.schema.string().trim().min(1).regex(/^[a-z0-9-]+$/, "Invalid service name"),
      service: import_core_validation52.schema.custom(
        (value) => typeof value === "function" || value !== void 0,
        "Service value must be defined or be a function"
      )
    }).strict();
    var import_core_validation62 = __toESM2(require_dist22());
    var ServiceExportNameSchema = import_core_validation62.schema.string().trim().min(1).regex(/^[a-z0-9-]+\.service\.[a-z0-9-]+$/, "Invalid service export name");
    function validateQualifiedExportName(input) {
      return (0, import_core_validation72.parseDto)(QualifiedExportNameSchema, input);
    }
    function validateCustomExportName(input) {
      return (0, import_core_validation72.parseDto)(CustomExportNameSchema, input);
    }
    function validateServiceExportName(input) {
      return (0, import_core_validation72.parseDto)(ServiceExportNameSchema, input);
    }
    function validateExportValue(input) {
      return (0, import_core_validation72.parseDto)(ExportValueSchema, input);
    }
    function validateRegisterModuleExportInput(input) {
      return (0, import_core_validation72.parseDto)(RegisterModuleExportSchema, input);
    }
    function validateRegisterPublicServiceInput(input) {
      return (0, import_core_validation72.parseDto)(RegisterPublicServiceSchema, input);
    }
    var ExportRegistry = class {
      constructor() {
        this.exports = /* @__PURE__ */ new Map();
      }
      register(name, value) {
        const validatedName = validateQualifiedExportName(name);
        const validatedValue = validateExportValue(value);
        const kind = validatedName.includes(".service.") ? "service" : "custom";
        if (this.exports.has(validatedName)) {
          throw new import_core_errors5.InfrastructureError("Export is already registered", {
            module: "core-exports",
            code: import_core_errors5.ERROR_CODES.INFRASTRUCTURE_FAILURE,
            exportName: validatedName
          });
        }
        this.exports.set(validatedName, {
          name: validatedName,
          value: validatedValue,
          kind
        });
      }
      resolve(name) {
        const entry = this.exports.get(name);
        if (!entry) {
          throw new import_core_errors5.InfrastructureError("Export not found", {
            module: "core-exports",
            code: import_core_errors5.ERROR_CODES.INFRASTRUCTURE_FAILURE,
            exportName: name
          });
        }
        return entry.value;
      }
      has(name) {
        return this.exports.has(name);
      }
      list() {
        return [...this.exports.keys()].sort((a, b) => a.localeCompare(b));
      }
      listByKind(kind) {
        return [...this.exports.values()].filter((entry) => entry.kind === kind).map((entry) => entry.name).sort((a, b) => a.localeCompare(b));
      }
    };
    var exportRegistry = new ExportRegistry();
    function assertValidCustomExportName(name) {
      validateCustomExportName(name);
    }
    function assertValidServiceExportName(name) {
      validateServiceExportName(name);
    }
    function assertValidQualifiedExportName(name) {
      validateQualifiedExportName(name);
    }
    function buildQualifiedExportName2(moduleName, exportName) {
      const fullName = `${moduleName}.${exportName}`;
      validateCustomExportName(fullName);
      return fullName;
    }
    function buildQualifiedServiceExportName(moduleName, serviceName) {
      const fullName = `${moduleName}.service.${serviceName}`;
      validateServiceExportName(fullName);
      return fullName;
    }
    var import_core_errors22 = __toESM2(require_dist3());
    var logger2 = (0, import_public_api4.createCoreLogger)("core-exports");
    function registerService(name, service) {
      exportRegistry.register(name, service);
      logger2.debug("service export registered", { name });
    }
    function registerModuleExport(moduleName, exportName, value) {
      const validated = validateRegisterModuleExportInput({
        moduleName,
        exportName,
        value
      });
      const qualifiedName = buildQualifiedExportName2(
        validated.moduleName,
        validated.exportName
      );
      exportRegistry.register(qualifiedName, validated.value);
      logger2.debug("custom export registered", { name: qualifiedName });
      return qualifiedName;
    }
    function registerPublicService(moduleName, serviceName, service) {
      const validated = validateRegisterPublicServiceInput({
        moduleName,
        serviceName,
        service
      });
      const qualifiedName = buildQualifiedServiceExportName(
        validated.moduleName,
        validated.serviceName
      );
      exportRegistry.register(qualifiedName, validated.service);
      logger2.debug("public service export registered", { name: qualifiedName });
      return qualifiedName;
    }
    function resolveService(name) {
      if (!name.includes(".service.")) {
        throw new import_core_errors22.InfrastructureError("Invalid service name", {
          module: "core-exports",
          code: import_core_errors22.ERROR_CODES.INFRASTRUCTURE_FAILURE,
          name
        });
      }
      return exportRegistry.resolve(name);
    }
    function hasService(name) {
      return exportRegistry.has(name);
    }
    function listServices() {
      return exportRegistry.listByKind("service");
    }
    function getExportSnapshot() {
      return {
        exports: exportRegistry.list(),
        services: exportRegistry.listByKind("service")
      };
    }
  }
});

// src/server/index.ts
var import_public_api3 = __toESM(require_public_api());

// src/server/bootstrapper.ts
var import_public_api = __toESM(require_public_api());

// src/server/diagnostics.ts
function createKernelSnapshot(serviceRegistry, moduleRegistry, moduleStates) {
  return {
    services: serviceRegistry.list(),
    registeredModules: moduleRegistry.list().map((module2) => module2.name),
    moduleStates: [...moduleStates.values()]
  };
}

// src/server/module-context.ts
var ModuleContext = class {
  constructor(moduleName, services) {
    this.moduleName = moduleName;
    this.services = services;
  }
};

// src/server/module-registry.ts
var import_core_errors = __toESM(require_dist());

// src/server/validate.ts
var import_core_validation6 = __toESM(require_dist2());

// src/server/schemas/framework-kernel-snapshot-schema.ts
var import_core_validation3 = __toESM(require_dist2());

// src/server/schemas/module-state-schema.ts
var import_core_validation2 = __toESM(require_dist2());

// src/server/schemas/module-lifecycle-state-schema.ts
var import_core_validation = __toESM(require_dist2());
var ModuleLifecycleStateSchema = import_core_validation.schema.enum([
  "created",
  "registering",
  "registered",
  "starting",
  "started",
  "stopping",
  "stopped",
  "failed"
]);

// src/server/schemas/module-state-schema.ts
var ModuleStateSchema = import_core_validation2.schema.object({
  name: import_core_validation2.schema.string().trim().min(1).regex(/^[a-z0-9-]+$/, "Invalid module name"),
  state: ModuleLifecycleStateSchema,
  dependencies: import_core_validation2.schema.array(
    import_core_validation2.schema.string().trim().min(1).regex(/^[a-z0-9-]+$/, "Invalid dependency module name")
  )
}).strict();

// src/server/schemas/framework-kernel-snapshot-schema.ts
var FrameworkKernelSnapshotSchema = import_core_validation3.schema.object({
  services: import_core_validation3.schema.array(import_core_validation3.schema.string().trim().min(1)),
  moduleStates: import_core_validation3.schema.array(ModuleStateSchema),
  registeredModules: import_core_validation3.schema.array(
    import_core_validation3.schema.string().trim().min(1).regex(/^[a-z0-9-]+$/, "Invalid module name")
  )
}).strict();

// src/server/schemas/module-definition-schema.ts
var import_core_validation4 = __toESM(require_dist2());
var LifecycleFn = import_core_validation4.schema.function();
var ModuleDefinitionSchema = import_core_validation4.schema.object({
  sdkName: import_core_validation4.schema.string().trim().min(1).regex(import_core_validation4.MODULE_NAME_PATTERN, "Invalid sdk module name").optional(),
  name: import_core_validation4.schema.string().trim().min(1).regex(import_core_validation4.MODULE_NAME_PATTERN, "Invalid module name"),
  dependencies: import_core_validation4.schema.array(
    import_core_validation4.schema.string().trim().min(1).regex(import_core_validation4.MODULE_NAME_PATTERN, "Invalid dependency module name")
  ).optional(),
  register: LifecycleFn,
  start: LifecycleFn.optional(),
  stop: LifecycleFn.optional(),
  exports: import_core_validation4.schema.record(import_core_validation4.schema.string(), import_core_validation4.schema.unknown()).optional()
}).strict();

// src/server/schemas/service-registration-schema.ts
var import_core_validation5 = __toESM(require_dist2());
var ServiceRegistrationSchema = import_core_validation5.schema.object({
  name: import_core_validation5.schema.string().trim().min(1),
  service: import_core_validation5.schema.custom(
    (value) => value !== void 0,
    "Service value must be defined"
  )
}).strict();

// src/server/validate.ts
function validateModuleDefinition(input) {
  return (0, import_core_validation6.parseDto)(ModuleDefinitionSchema, input);
}
function validateModuleState(input) {
  return (0, import_core_validation6.parseDto)(ModuleStateSchema, input);
}
function validateModuleLifecycleState(input) {
  return (0, import_core_validation6.parseDto)(ModuleLifecycleStateSchema, input);
}
function validateFrameworkKernelSnapshot(input) {
  return (0, import_core_validation6.parseDto)(FrameworkKernelSnapshotSchema, input);
}
function validateServiceRegistration(input) {
  return (0, import_core_validation6.parseDto)(ServiceRegistrationSchema, input);
}

// src/server/module-registry.ts
var ModuleRegistry = class {
  constructor() {
    this.modules = /* @__PURE__ */ new Map();
  }
  register(definition) {
    const validatedDefinition = validateModuleDefinition(definition);
    if (this.modules.has(validatedDefinition.name)) {
      throw new import_core_errors.DomainError("Duplicate module registration", {
        module: "core-bootstrap",
        code: import_core_errors.ERROR_CODES.DOMAIN_RULE_VIOLATION,
        moduleName: validatedDefinition.name
      });
    }
    this.modules.set(validatedDefinition.name, validatedDefinition);
  }
  get(name) {
    const definition = this.modules.get(name);
    if (!definition) {
      throw new import_core_errors.InfrastructureError("Module definition not found", {
        module: "core-bootstrap",
        code: import_core_errors.ERROR_CODES.INFRASTRUCTURE_FAILURE,
        moduleName: name
      });
    }
    return definition;
  }
  list() {
    return [...this.modules.values()];
  }
  listNames() {
    return [...this.modules.keys()];
  }
  has(name) {
    return this.modules.has(name);
  }
};

// src/server/module-order.ts
var import_core_errors2 = __toESM(require_dist());
function resolveModuleOrder(modules) {
  const ordered = [];
  const visited = /* @__PURE__ */ new Set();
  const visiting = /* @__PURE__ */ new Set();
  const byName = new Map(modules.map((module2) => [module2.name, module2]));
  function visit(module2) {
    if (visited.has(module2.name)) {
      return;
    }
    if (visiting.has(module2.name)) {
      throw new import_core_errors2.DomainError("Circular module dependency detected", {
        code: import_core_errors2.ERROR_CODES.DOMAIN_RULE_VIOLATION,
        moduleName: module2.name
      });
    }
    visiting.add(module2.name);
    for (const dependencyName of module2.dependencies ?? []) {
      const dependency = byName.get(dependencyName);
      if (!dependency) {
        throw new import_core_errors2.DomainError("Missing module dependency", {
          code: import_core_errors2.ERROR_CODES.DOMAIN_RULE_VIOLATION,
          moduleName: module2.name,
          dependencyName
        });
      }
      visit(dependency);
    }
    visiting.delete(module2.name);
    visited.add(module2.name);
    ordered.push(module2);
  }
  for (const module2 of modules) {
    visit(module2);
  }
  return ordered;
}

// src/server/service-registry.ts
var import_core_errors3 = __toESM(require_dist());
var ServiceRegistry = class {
  constructor() {
    this.services = /* @__PURE__ */ new Map();
  }
  register(name, service) {
    const validated = validateServiceRegistration({
      name,
      service
    });
    if (this.services.has(validated.name)) {
      throw new import_core_errors3.InfrastructureError(
        "Service is already registered",
        {
          module: "core-bootstrap",
          code: import_core_errors3.ERROR_CODES.INFRASTRUCTURE_FAILURE,
          service: validated.name
        }
      );
    }
    this.services.set(validated.name, validated.service);
  }
  resolve(name) {
    const service = this.services.get(name);
    if (!service) {
      throw new import_core_errors3.InfrastructureError(
        "Service not found",
        {
          module: "core-bootstrap",
          code: import_core_errors3.ERROR_CODES.INFRASTRUCTURE_FAILURE,
          service: name
        }
      );
    }
    return service;
  }
  has(name) {
    return this.services.has(name);
  }
  list() {
    return [...this.services.keys()];
  }
};

// src/server/bootstrapper.ts
var import_core_validation7 = __toESM(require_dist2());
var import_public_api2 = __toESM(require_public_api3());
var Bootstrapper = class {
  constructor() {
    this.logger = (0, import_public_api.createCoreLogger)("core-bootstrap");
    this.services = new ServiceRegistry();
    this.modules = new ModuleRegistry();
    this.moduleStates = /* @__PURE__ */ new Map();
    this.hasBootstrapped = false;
  }
  registerModuleDefinition(definition) {
    const validated = (0, import_core_validation7.parseDto)(ModuleDefinitionSchema, definition);
    this.modules.register(validated);
    this.moduleStates.set(validated.name, validateModuleState({
      name: validated.name,
      state: "created",
      dependencies: validated.dependencies ?? []
    }));
    this.logger.debug("module definition registered", {
      module: validated.name,
      dependencies: validated.dependencies ?? []
    });
  }
  async bootstrap() {
    if (this.hasBootstrapped) {
      this.logger.warn("bootstrap already executed");
      return;
    }
    const orderedModules = resolveModuleOrder(this.modules.list());
    for (const moduleDefinition of orderedModules) {
      const context = new ModuleContext(moduleDefinition.name, this.services);
      try {
        this.setState(moduleDefinition.name, "registering");
        await moduleDefinition.register(context);
        this.setState(moduleDefinition.name, "registered");
        this.logger.info("module registered", {
          module: moduleDefinition.name
        });
        if (moduleDefinition.exports) {
          for (const [exportName, exportValue] of Object.entries(moduleDefinition.exports)) {
            const qualified = (0, import_public_api2.buildQualifiedExportName)(moduleDefinition.name, exportName);
            (0, import_public_api2.registerService)(qualified, exportValue);
          }
          this.logger.info("module exports registered", {
            module: moduleDefinition.name,
            exports: Object.keys(moduleDefinition.exports)
          });
        }
        if (moduleDefinition.start) {
          this.setState(moduleDefinition.name, "starting");
          await moduleDefinition.start(context);
          this.setState(moduleDefinition.name, "started");
          this.logger.info("module started", {
            module: moduleDefinition.name
          });
        }
      } catch (error) {
        this.setState(moduleDefinition.name, "failed");
        this.logger.error(error, {
          module: moduleDefinition.name
        });
        throw error;
      }
    }
    this.hasBootstrapped = true;
  }
  async shutdown() {
    const modules = [...this.modules.list()].reverse();
    for (const moduleDefinition of modules) {
      if (!moduleDefinition.stop) {
        continue;
      }
      const context = new ModuleContext(moduleDefinition.name, this.services);
      try {
        this.setState(moduleDefinition.name, "stopping");
        await moduleDefinition.stop(context);
        this.setState(moduleDefinition.name, "stopped");
        this.logger.info("module stopped", {
          module: moduleDefinition.name
        });
      } catch (error) {
        this.setState(moduleDefinition.name, "failed");
        this.logger.error(error, {
          module: moduleDefinition.name
        });
      }
    }
  }
  getServiceRegistry() {
    return this.services;
  }
  getSnapshot() {
    return validateFrameworkKernelSnapshot(
      createKernelSnapshot(this.services, this.modules, this.moduleStates)
    );
  }
  isBootstrapped() {
    return this.hasBootstrapped;
  }
  setState(name, state) {
    const existing = this.moduleStates.get(name);
    if (!existing) {
      return;
    }
    existing.state = validateModuleLifecycleState(state);
  }
};

// src/server/runtime.ts
var import_core_errors4 = __toESM(require_dist());
var bootstrapper = new Bootstrapper();
function getBootstrapper() {
  return bootstrapper;
}
function getFrameworkSnapshot() {
  return bootstrapper.getSnapshot();
}

// src/server/index.ts
var logger = (0, import_public_api3.createCoreLogger)("core-bootstrap");
var bootstrapper2 = getBootstrapper();
logger.info("core-bootstrap started");
on("onResourceStart", async (resourceName) => {
  if (resourceName !== GetCurrentResourceName()) {
    return;
  }
  try {
    logger.info("resource boot confirmed");
    await bootstrapper2.bootstrap();
    logger.info("bootstrap complete", {
      snapshot: getFrameworkSnapshot()
    });
  } catch (error) {
    logger.error(error);
  }
});
on("onResourceStop", async (resourceName) => {
  if (resourceName !== GetCurrentResourceName()) {
    return;
  }
  try {
    await bootstrapper2.shutdown();
    logger.info("bootstrap shutdown complete", {
      snapshot: getFrameworkSnapshot()
    });
  } catch (error) {
    logger.error(error);
  }
});
