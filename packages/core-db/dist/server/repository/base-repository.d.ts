import type { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import type { SqlValue } from "../../shared";
import type { DatabaseExecutor } from "./types";
export declare abstract class BaseRepository {
    protected readonly executor: DatabaseExecutor;
    protected constructor(executor: DatabaseExecutor);
    protected queryMany<T = RowDataPacket[]>(sql: string, values?: SqlValue[]): Promise<T>;
    protected queryOne<T = RowDataPacket>(sql: string, values?: SqlValue[]): Promise<T | null>;
    protected execute(sql: string, values?: SqlValue[]): Promise<ResultSetHeader>;
    protected exists(sql: string, values?: SqlValue[]): Promise<boolean>;
}
