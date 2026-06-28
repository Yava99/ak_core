import { BaseLogger, LOG_LEVELS } from "../shared";

function serverWriter(message: string): void {
  console.log(message);
}

export function createCoreLogger(context: string): BaseLogger {
  return new BaseLogger(serverWriter, {
    context,
    minLevel: LOG_LEVELS.DEBUG
  });
}

export { BaseLogger };
export { LOG_LEVELS } from "../shared";
export type { LogLevel, ILoggerOptions, LogDetails, ISerializedError } from "../shared";
export { formatLog } from "../shared";