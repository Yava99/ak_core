import type { LogLevel } from "./log-level";
import type { LogDetails } from "./log-types";
export interface IFormatLogInput {
    level: LogLevel;
    context: string;
    message: string;
    timestamp: string;
    details?: LogDetails;
}
export declare function formatLog(input: IFormatLogInput): string;
