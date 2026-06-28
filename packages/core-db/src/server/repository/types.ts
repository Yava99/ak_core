import type { Database } from "../database";
import type { DatabaseTransaction } from "../transaction";

export type DatabaseExecutor = Database | DatabaseTransaction;