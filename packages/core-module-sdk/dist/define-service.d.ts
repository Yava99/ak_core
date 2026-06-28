import type { IDefinedService } from "./types";
export declare function defineService<TInstance>(name: string, instance: TInstance, options?: {
    public?: boolean;
}): IDefinedService<TInstance>;
