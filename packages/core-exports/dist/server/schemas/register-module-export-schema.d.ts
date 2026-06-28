import { type BaseSchema } from "@fivem/core-validation";
export interface IRegisterModuleExportInput {
    moduleName: string;
    exportName: string;
    value: unknown | (() => unknown);
}
export declare const RegisterModuleExportSchema: BaseSchema<IRegisterModuleExportInput>;
