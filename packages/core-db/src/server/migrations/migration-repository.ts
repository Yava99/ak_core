import type { RowDataPacket } from "mysql2/promise";
import type { DatabaseExecutor } from "../repository/types";

interface IAppliedMigrationRow extends RowDataPacket {
  module_name: string;
  version: string;
}

export class MigrationRepository {
  public constructor(private readonly executor: DatabaseExecutor) {}

  public async ensureMigrationTable(): Promise<void> {
    await this.executor.execute(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        module_name VARCHAR(255) NOT NULL,
        version VARCHAR(255) NOT NULL,
        applied_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UNIQUE KEY uq_schema_migrations_module_version (module_name, version)
      );
    `);
  }

  public async getAppliedKeys(): Promise<Set<string>> {
    const rows = await this.executor.query<IAppliedMigrationRow[]>(
      "SELECT module_name, version FROM schema_migrations ORDER BY module_name ASC, version ASC"
    );

    return new Set(rows.map((row) => `${row.module_name}:${row.version}`));
  }

  public async markAsApplied(moduleName: string, version: string): Promise<void> {
    await this.executor.execute(
      "INSERT INTO schema_migrations (module_name, version) VALUES (?, ?)",
      [moduleName, version]
    );
  }
}