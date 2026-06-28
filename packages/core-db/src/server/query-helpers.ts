import type { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import type { SqlValue } from "../shared";
import type { DatabaseExecutor } from "./repository/types";

export async function queryMany<T = RowDataPacket[]>(
  executor: DatabaseExecutor,
  sql: string,
  values: SqlValue[] = []
): Promise<T> {
  return executor.query<T>(sql, values);
}

export async function queryOne<T = RowDataPacket>(
  executor: DatabaseExecutor,
  sql: string,
  values: SqlValue[] = []
): Promise<T | null> {
  const rows = await executor.query<T[]>(sql, values);
  return rows[0] ?? null;
}

export async function executeStatement(
  executor: DatabaseExecutor,
  sql: string,
  values: SqlValue[] = []
): Promise<ResultSetHeader> {
  return executor.execute<ResultSetHeader>(sql, values);
}

export async function exists(
  executor: DatabaseExecutor,
  sql: string,
  values: SqlValue[] = []
): Promise<boolean> {
  const row = await queryOne<Record<string, unknown>>(executor, sql, values);
  return Boolean(row);
}