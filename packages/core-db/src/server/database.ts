import type {
  Pool,
  ResultSetHeader,
  RowDataPacket
} from "mysql2/promise";
import type { SqlValue } from "../shared";
import { DatabaseTransaction } from "./transaction";

export class Database {
  public constructor(private readonly pool: Pool) {}

  public async query<T = RowDataPacket[]>(
    sql: string,
    values: SqlValue[] = []
  ): Promise<T> {
    const [rows] = await this.pool.query(sql, values);
    return rows as T;
  }

  public async execute<T = ResultSetHeader>(
    sql: string,
    values: SqlValue[] = []
  ): Promise<T> {
    const [result] = await this.pool.execute(sql, values);
    return result as T;
  }

  public async ping(): Promise<void> {
    await this.pool.query("SELECT 1");
  }

  public async beginTransaction(): Promise<DatabaseTransaction> {
    const connection = await this.pool.getConnection();
    await connection.beginTransaction();
    return new DatabaseTransaction(connection);
  }
}