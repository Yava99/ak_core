import type { LogLevel } from "./log-level";
import type { LogDetails } from "./log-types";

export interface IFormatLogInput {
  level: LogLevel;
  context: string;
  message: string;
  timestamp: string;
  details?: LogDetails;
}

export function formatLog(input: IFormatLogInput): string {
  const base = `[${input.timestamp}] [${input.context}] [${input.level.toUpperCase()}] ${input.message}`;

  if (!input.details || Object.keys(input.details).length === 0) {
    return base;
  }

  return `${base} ${JSON.stringify(input.details)}`;
}