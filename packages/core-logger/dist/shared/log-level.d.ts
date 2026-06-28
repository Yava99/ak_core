export declare const LOG_LEVELS: {
    readonly DEBUG: "debug";
    readonly INFO: "info";
    readonly WARN: "warn";
    readonly ERROR: "error";
};
export type LogLevel = (typeof LOG_LEVELS)[keyof typeof LOG_LEVELS];
