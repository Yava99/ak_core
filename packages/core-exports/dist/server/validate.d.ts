import { type IRegisterModuleExportInput } from "./schemas/register-module-export-schema";
import { type IRegisterPublicServiceInput } from "./schemas/register-public-service-schema";
import type { ExportValue } from "./types";
export declare function validateQualifiedExportName(input: string): string;
export declare function validateCustomExportName(input: string): string;
export declare function validateServiceExportName(input: string): string;
export declare function validateExportValue(input: ExportValue): ExportValue;
export declare function validateRegisterModuleExportInput(input: IRegisterModuleExportInput): IRegisterModuleExportInput;
export declare function validateRegisterPublicServiceInput(input: IRegisterPublicServiceInput): IRegisterPublicServiceInput;
