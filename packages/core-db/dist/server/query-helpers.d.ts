import type { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import type { SqlValue } from "../shared";
import type { DatabaseExecutor } from "./repository/types";
export declare function queryMany<T = RowDataPacket[]>(executor: DatabaseExecutor, sql: string, values?: SqlValue[]): Promise<T>;
export declare function queryOne<T = RowDataPacket>(executor: DatabaseExecutor, sql: string, values?: SqlValue[]): Promise<T | null>;
export declare function executeStatement(executor: DatabaseExecutor, sql: string, values?: SqlValue[]): Promise<ResultSetHeader>;
export declare function exists(executor: DatabaseExecutor, sql: string, values?: SqlValue[]): Promise<boolean>;
