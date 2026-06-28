import type { SchemaPath } from "../types/path";

export function joinPath(path: SchemaPath): string {
  if (path.length === 0) {
    return "";
  }

  let result = "";

  for (const segment of path) {
    if (typeof segment === "number") {
      result += `[${segment}]`;
      continue;
    }

    if (result.length === 0) {
      result += segment;
      continue;
    }

    result += `.${segment}`;
  }

  return result;
}