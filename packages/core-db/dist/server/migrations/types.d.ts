export interface IMigrationFile {
    moduleName: string;
    version: string;
    fileName: string;
    absolutePath: string;
    sql: string;
}
