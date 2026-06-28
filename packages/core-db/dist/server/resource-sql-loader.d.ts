export interface IResourceSqlFile {
    moduleName: string;
    version: string;
    fileName: string;
    absolutePath: string;
    sql: string;
}
export declare function loadResourceSqlFiles(directoryName: string): IResourceSqlFile[];
