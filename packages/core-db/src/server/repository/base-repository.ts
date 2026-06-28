import type { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import type { SqlValue } from "../../shared";
import type { DatabaseExecutor } from "./types";
import {
  executeStatement,
  exists,
  queryMany,
  queryOne
} from "../query-helpers";

export abstract class BaseRepository {
  protected constructor(protected readonly executor: DatabaseExecutor) {}

  protected async queryMany<T = RowDataPacket[]>(
    sql: string,
    values: SqlValue[] = []
  ): Promise<T> {
    return queryMany<T>(this.executor, sql, values);
  }

  protected async queryOne<T = RowDataPacket>(
    sql: string,
    values: SqlValue[] = []
  ): Promise<T | null> {
    return queryOne<T>(this.executor, sql, values);
  }

  protected async execute(
    sql: string,
    values: SqlValue[] = []
  ): Promise<ResultSetHeader> {
    return executeStatement(this.executor, sql, values);
  }

  protected async exists(
    sql: string,
    values: SqlValue[] = []
  ): Promise<boolean> {
    return exists(this.executor, sql, values);
  }
}