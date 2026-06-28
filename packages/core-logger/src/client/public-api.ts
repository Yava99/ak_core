import { BaseLogger, LOG_LEVELS } from "../shared";

function clientWriter(message: string): void {
  console.log(message);
}

export function createClientLogger(context: string): BaseLogger {
  return new BaseLogger(clientWriter, {
    context,
    minLevel: LOG_LEVELS.DEBUG
  });
}

export { BaseLogger };
export { LOG_LEVELS } from "../shared";
export type { LogLevel, ILoggerOptions, LogDetails, ISerializedError } from "../shared";
export { formatLog } from "../shared";