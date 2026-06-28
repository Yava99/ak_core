import type { LogLevel } from "../shared/log-level";
export interface ILoggerOptions {
    context?: string;
    minLevel?: LogLevel;
}
