import type {
  PoolConnection,
  ResultSetHeader,
  RowDataPacket
} from "mysql2/promise";
import type { SqlValue } from "../shared";

export class DatabaseTransaction {
  public constructor(private readonly connection: PoolConnection) {}

  public async query<T = RowDataPacket[]>(
    sql: string,
    values: SqlValue[] = []
  ): Promise<T> {
    const [rows] = await this.connection.query(sql, values);
    return rows as T;
  }

  public async execute<T = ResultSetHeader>(
    sql: string,
    values: SqlValue[] = []
  ): Promise<T> {
    const [result] = await this.connection.execute(sql, values);
    return result as T;
  }

  public async commit(): Promise<void> {
    await this.connection.commit();
  }

  public async rollback(): Promise<void> {
    await this.connection.rollback();
  }

  public async release(): Promise<void> {
    this.connection.release();
  }
}