import type { ISeedFile } from "./types";
import { loadResourceSqlFiles } from "../resource-sql-loader";

export function loadSeedFiles(): ISeedFile[] {
  return loadResourceSqlFiles("seeds");
}