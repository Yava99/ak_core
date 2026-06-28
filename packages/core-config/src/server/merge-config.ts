import type { DeepPartial } from "./types";

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function mergeConfig<T>(base: T, override: DeepPartial<T>): T {
  const result = { ...base } as Record<string, unknown>;

  for (const key of Object.keys(override) as Array<keyof T>) {
    const baseValue = base[key];
    const overrideValue = override[key];

    if (overrideValue === undefined) {
      continue;
    }

    if (isPlainObject(baseValue) && isPlainObject(overrideValue)) {
      result[key as string] = mergeConfig(
        baseValue as Record<string, unknown>,
        overrideValue as DeepPartial<Record<string, unknown>>
      );
      continue;
    }

    result[key as string] = overrideValue;
  }

  return result as T;
}