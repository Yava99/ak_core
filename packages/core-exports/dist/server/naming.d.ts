export declare function assertValidCustomExportName(name: string): void;
export declare function assertValidServiceExportName(name: string): void;
export declare function assertValidQualifiedExportName(name: string): void;
export declare function buildQualifiedExportName(moduleName: string, exportName: string): string;
export declare function buildQualifiedServiceExportName(moduleName: string, serviceName: string): string;
export declare const QUALIFIED_EXPORT_PATTERN: RegExp;
