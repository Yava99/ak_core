import { parseDto } from "@fivem/core-validation";
import { CustomExportNameSchema } from "./schemas/custom-export-name-schema";
import { ExportValueSchema } from "./schemas/export-value-schema";
import { QualifiedExportNameSchema } from "./schemas/qualified-export-name-schema";
import {
  RegisterModuleExportSchema,
  type IRegisterModuleExportInput
} from "./schemas/register-module-export-schema";
import {
  RegisterPublicServiceSchema,
  type IRegisterPublicServiceInput
} from "./schemas/register-public-service-schema";
import { ServiceExportNameSchema } from "./schemas/service-export-name-schema";
import type { ExportValue } from "./types";

export function validateQualifiedExportName(input: string): string {
  return parseDto(QualifiedExportNameSchema, input);
}

export function validateCustomExportName(input: string): string {
  return parseDto(CustomExportNameSchema, input);
}

export function validateServiceExportName(input: string): string {
  return parseDto(ServiceExportNameSchema, input);
}

export function validateExportValue(input: ExportValue): ExportValue {
  return parseDto(ExportValueSchema, input);
}

export function validateRegisterModuleExportInput(
  input: IRegisterModuleExportInput
): IRegisterModuleExportInput {
  return parseDto(RegisterModuleExportSchema, input);
}

export function validateRegisterPublicServiceInput(
  input: IRegisterPublicServiceInput
): IRegisterPublicServiceInput {
  return parseDto(RegisterPublicServiceSchema, input);
}