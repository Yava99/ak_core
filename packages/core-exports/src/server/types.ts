export type ExportValue = unknown | (() => unknown);

export interface IRegisteredExport {
  name: string;
  value: ExportValue;
}

export type ExportKind = "service" | "custom";

export interface InternalExport {
  name: string;
  value: ExportValue;
  kind: ExportKind;
}

export interface IExportSnapshot {
  exports: string[];
  services: string[];
}