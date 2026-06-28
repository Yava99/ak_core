import "./core/base-schema-extensions";

export { schema } from "./schemas/schema-factory";

export { parse } from "./parsing/parse";
export { safeParse } from "./parsing/safe-parse";
export { assertValid } from "./parsing/assert-valid";
export { parseAsync } from "./parsing/parse-async"
export { safeParseAsync } from "./parsing/safe-parse-async"

export { parseDto } from "./integration/parse-dto";
export { parseEventPayload } from "./integration/parse-event-payload";
export { parseConfigSection } from "./integration/parse-config-section";

export { BaseSchema } from "./core/base-schema";

export {
  ValidationError,
  type IFlattenedValidationError
} from "./errors/validation-error";

export type { Infer } from "./types/infer";
export type { InputOf } from "./types/input-of";
export type { OutputOf } from "./types/output-of";
export type { IValidationIssue } from "./types/issues";
export type { SafeParseResult } from "./types/parse-result";

export {
  MODULE_NAME_PATTERN,
  SERVICE_NAME_PATTERN,
  EXPORT_NAME_PATTERN,
  LOCAL_EVENT_PATTERN,
  NET_EVENT_PATTERN,
  CUSTOM_EXPORT_PATTERN,
  SERVICE_EXPORT_PATTERN
} from "./constants/patterns";

export {
  getValidationRuntimeOptions,
  setValidationRuntimeOptions,
  type IValidationRuntimeOptions
} from "./core/validation-runtime";