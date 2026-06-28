import type { IServiceRegistry } from "./types";
export declare class ServiceRegistry implements IServiceRegistry {
    private readonly services;
    register<TService>(name: string, service: TService): void;
    resolve<TService>(name: string): TService;
    has(name: string): boolean;
    list(): string[];
}
