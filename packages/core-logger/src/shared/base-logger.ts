import { formatLog } from "./formatter";
import { LOG_LEVELS, type LogLevel } from "./log-level";
import type { ILoggerOptions } from "./logger-options";
import type { ISerializedError, LogDetails, LogWriter } from "./log-types";

const LOG_LEVEL_ORDER: Record<LogLevel, number> = {
  [LOG_LEVELS.DEBUG]: 10,
  [LOG_LEVELS.INFO]: 20,
  [LOG_LEVELS.WARN]: 30,
  [LOG_LEVELS.ERROR]: 40
};

type ErrorWithMetadata = Error & {
  code?: string;
  details?: Record<string, unknown>;
  cause?: unknown;
};

export class BaseLogger {
  private readonly context: string;
  private readonly minLevel: LogLevel;
  private readonly writer: LogWriter;

  public constructor(writer: LogWriter, options: ILoggerOptions = {}) {
    this.writer = writer;
    this.context = options.context ?? "app";
    this.minLevel = options.minLevel ?? LOG_LEVELS.INFO;
  }

  public child(context: string): BaseLogger {
    return new BaseLogger(this.writer, {
      context,
      minLevel: this.minLevel
    });
  }

  public debug(message: string, details?: LogDetails): void {
    this.write(LOG_LEVELS.DEBUG, message, details);
  }

  public info(message: string, details?: LogDetails): void {
    this.write(LOG_LEVELS.INFO, message, details);
  }

  public warn(message: string | Error | unknown, details?: LogDetails): void {
    this.writeUnknown(LOG_LEVELS.WARN, message, details);
  }

  public error(message: string | Error | unknown, details?: LogDetails): void {
    this.writeUnknown(LOG_LEVELS.ERROR, message, details);
  }

  private writeUnknown(
    level: LogLevel,
    value: string | Error | unknown,
    details?: LogDetails
  ): void {
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

  private serializeError(error: Error): ISerializedError {
    const typedError = error as ErrorWithMetadata;

    return {
      name: typedError.name,
      message: typedError.message,
      stack: typedError.stack,
      code: typedError.code,
      details: typedError.details,
      cause: typedError.cause
    };
  }

  private write(level: LogLevel, message: string, details?: LogDetails): void {
    if (!this.shouldLog(level)) {
      return;
    }

    const formattedMessage = formatLog({
      level,
      context: this.context,
      message,
      timestamp: new Date().toISOString(),
      details
    });

    this.writer(formattedMessage);
  }

  private shouldLog(level: LogLevel): boolean {
    return LOG_LEVEL_ORDER[level] >= LOG_LEVEL_ORDER[this.minLevel];
  }
}