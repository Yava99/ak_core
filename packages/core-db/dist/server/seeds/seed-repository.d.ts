import type { DatabaseExecutor } from "../repository/types";
export declare class SeedRepository {
    private readonly executor;
    constructor(executor: DatabaseExecutor);
    ensureSeedTable(): Promise<void>;
    getAppliedKeys(): Promise<Set<string>>;
    markAsApplied(moduleName: string, version: string): Promise<void>;
}
