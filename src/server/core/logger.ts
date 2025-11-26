const PREFIX = '[ak_core]';

export function logInfo(message: string, ...args: unknown[]) {
  console.log(`${PREFIX} ${message}`, ...args);
}

export function logWarn(message: string, ...args: unknown[]) {
  console.warn(`${PREFIX} [WARN] ${message}`, ...args);
}

export function logError(message: string, ...args: unknown[]) {
  console.error(`${PREFIX} [ERROR] ${message}`, ...args);
}
