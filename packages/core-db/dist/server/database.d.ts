import type { Pool, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import type { SqlValue } from "../shared";
import { DatabaseTransaction } from "./transaction";
export declare class Database {
    private readonly pool;
    constructor(pool: Pool);
    query<T = RowDataPacket[]>(sql: string, values?: SqlValue[]): Promise<T>;
    execute<T = ResultSetHeader>(sql: string, values?: SqlValue[]): Promise<T>;
    ping(): Promise<void>;
    beginTransaction(): Promise<DatabaseTransaction>;
}
