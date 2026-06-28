import type { ILoggerOptions } from "./logger-options";
import type { LogDetails, LogWriter } from "./log-types";
export declare class BaseLogger {
    private readonly context;
    private readonly minLevel;
    private readonly writer;
    constructor(writer: LogWriter, options?: ILoggerOptions);
    child(context: string): BaseLogger;
    debug(message: string, details?: LogDetails): void;
    info(message: string, details?: LogDetails): void;
    warn(message: string | Error | unknown, details?: LogDetails): void;
    error(message: string | Error | unknown, details?: LogDetails): void;
    private writeUnknown;
    private serializeError;
    private write;
    private shouldLog;
}
