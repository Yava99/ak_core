import type { IDatabaseConfig } from "@fivem/core-config/server/public-api";
import { Database } from "./database";
import type { DatabaseTransaction } from "./transaction";
export declare function initDatabase(config: IDatabaseConfig): Promise<void>;
export declare function getDatabase(): Database;
export declare function withTransaction<T>(callback: (transaction: DatabaseTransaction) => Promise<T>): Promise<T>;
