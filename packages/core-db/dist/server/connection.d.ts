import { type Pool } from "mysql2/promise";
import type { IDatabaseConfig } from "@fivem/core-config/server/public-api";
export declare function createConnection(config: IDatabaseConfig): Promise<Pool>;
