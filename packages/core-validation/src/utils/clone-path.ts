import type { SchemaPath } from "../types/path";

export function clonePath(path: SchemaPath): SchemaPath {
  return [...path];
}