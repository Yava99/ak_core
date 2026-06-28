import type { IDefinedExports } from "./types";
import { validateDefinedExports } from "./validate";

export function defineExports(
  entries: Record<string, unknown | (() => unknown)>
): IDefinedExports {
  return validateDefinedExports({
    entries
  });
}