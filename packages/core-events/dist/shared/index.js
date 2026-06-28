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

// ../core-errors/dist/types/error-details.js
var require_error_details = __commonJS({
  "../core-errors/dist/types/error-details.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// ../core-errors/dist/codes/error-codes.js
var require_error_codes = __commonJS({
  "../core-errors/dist/codes/error-codes.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ERROR_CODES = void 0;
    exports.ERROR_CODES = {
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
  "../core-errors/dist/base/app-error.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AppError = void 0;
    var AppError = class extends Error {
      constructor(message, code, details, cause) {
        super(message);
        this.name = new.target.name;
        this.code = code;
        this.details = details;
        this.cause = cause;
      }
    };
    exports.AppError = AppError;
  }
});

// ../core-errors/dist/validation/validation-error.js
var require_validation_error = __commonJS({
  "../core-errors/dist/validation/validation-error.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ValidationError = void 0;
    var app_error_1 = require_app_error();
    var error_codes_1 = require_error_codes();
    var ValidationError2 = class extends app_error_1.AppError {
      constructor(message, details, cause) {
        super(message, error_codes_1.ERROR_CODES.VALIDATION_FAILED, details, cause);
      }
    };
    exports.ValidationError = ValidationError2;
  }
});

// ../core-errors/dist/config/config-error.js
var require_config_error = __commonJS({
  "../core-errors/dist/config/config-error.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ConfigError = void 0;
    var app_error_1 = require_app_error();
    var ConfigError = class extends app_error_1.AppError {
      constructor(message, code, details, cause) {
        super(message, code, details, cause);
      }
    };
    exports.ConfigError = ConfigError;
  }
});

// ../core-errors/dist/infrastructure/infrastructure-error.js
var require_infrastructure_error = __commonJS({
  "../core-errors/dist/infrastructure/infrastructure-error.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InfrastructureError = void 0;
    var app_error_1 = require_app_error();
    var error_codes_1 = require_error_codes();
    var InfrastructureError = class extends app_error_1.AppError {
      constructor(message, details, cause) {
        super(message, error_codes_1.ERROR_CODES.INFRASTRUCTURE_FAILURE, details, cause);
      }
    };
    exports.InfrastructureError = InfrastructureError;
  }
});

// ../core-errors/dist/domain/domain-error.js
var require_domain_error = __commonJS({
  "../core-errors/dist/domain/domain-error.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DomainError = void 0;
    var app_error_1 = require_app_error();
    var error_codes_1 = require_error_codes();
    var DomainError = class extends app_error_1.AppError {
      constructor(message, details, cause) {
        super(message, error_codes_1.ERROR_CODES.DOMAIN_RULE_VIOLATION, details, cause);
      }
    };
    exports.DomainError = DomainError;
  }
});

// ../core-errors/dist/index.js
var require_dist = __commonJS({
  "../core-errors/dist/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
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
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_error_details(), exports);
    __exportStar(require_error_codes(), exports);
    __exportStar(require_app_error(), exports);
    __exportStar(require_validation_error(), exports);
    __exportStar(require_config_error(), exports);
    __exportStar(require_infrastructure_error(), exports);
    __exportStar(require_domain_error(), exports);
  }
});

// src/shared/naming.ts
var import_core_errors = __toESM(require_dist());
var LOCAL_EVENT_PATTERN = /^[a-z0-9-]+:[A-Za-z][A-Za-z0-9]*$/;
var NET_EVENT_PATTERN = /^[a-z0-9-]+:net:[A-Za-z][A-Za-z0-9]*$/;
function assertValidLocalEventName(name) {
  if (!LOCAL_EVENT_PATTERN.test(name)) {
    throw new import_core_errors.ValidationError("Invalid local event name", {
      value: name,
      expected: "<module>:<event>"
    });
  }
}
function assertValidNetEventName(name) {
  if (!NET_EVENT_PATTERN.test(name)) {
    throw new import_core_errors.ValidationError("Invalid net event name", {
      value: name,
      expected: "<module>:net:<event>"
    });
  }
}
function buildLocalEventName(moduleName, eventName) {
  const fullName = `${moduleName}:${eventName}`;
  assertValidLocalEventName(fullName);
  return fullName;
}
function buildNetEventName(moduleName, eventName) {
  const fullName = `${moduleName}:net:${eventName}`;
  assertValidNetEventName(fullName);
  return fullName;
}
function defineLocalEvent(moduleName, eventName) {
  return buildLocalEventName(
    moduleName,
    eventName
  );
}
function defineNetEvent(moduleName, eventName) {
  return buildNetEventName(
    moduleName,
    eventName
  );
}
export {
  assertValidLocalEventName,
  assertValidNetEventName,
  buildLocalEventName,
  buildNetEventName,
  defineLocalEvent,
  defineNetEvent
};
