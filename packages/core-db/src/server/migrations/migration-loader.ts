import type { IMigrationFile } from "./types";
import { loadResourceSqlFiles } from "../resource-sql-loader";

export function loadMigrationFiles(): IMigrationFile[] {
  return loadResourceSqlFiles("migrations");
}