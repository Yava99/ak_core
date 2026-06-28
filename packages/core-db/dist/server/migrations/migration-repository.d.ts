import type { DatabaseExecutor } from "../repository/types";
export declare class MigrationRepository {
    private readonly executor;
    constructor(executor: DatabaseExecutor);
    ensureMigrationTable(): Promise<void>;
    getAppliedKeys(): Promise<Set<string>>;
    markAsApplied(moduleName: string, version: string): Promise<void>;
}
