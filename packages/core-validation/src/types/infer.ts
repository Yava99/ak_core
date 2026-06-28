import type { BaseSchema } from "../core/base-schema";
import type { OutputOf } from "./output-of";

export type Infer<TSchema extends BaseSchema<any, any>> = OutputOf<TSchema>;