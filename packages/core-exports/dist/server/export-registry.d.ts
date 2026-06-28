import type { ExportValue } from "./types";
export declare class ExportRegistry {
    private readonly exports;
    register(name: string, value: ExportValue): void;
    resolve<TValue = unknown>(name: string): TValue;
    has(name: string): boolean;
    list(): string[];
    listByKind(kind: "service" | "custom"): string[];
}
export declare const exportRegistry: ExportRegistry;
