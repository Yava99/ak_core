import type { PoolConnection, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import type { SqlValue } from "../shared";
export declare class DatabaseTransaction {
    private readonly connection;
    constructor(connection: PoolConnection);
    query<T = RowDataPacket[]>(sql: string, values?: SqlValue[]): Promise<T>;
    execute<T = ResultSetHeader>(sql: string, values?: SqlValue[]): Promise<T>;
    commit(): Promise<void>;
    rollback(): Promise<void>;
    release(): Promise<void>;
}
