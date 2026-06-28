import { parseConfigSection } from "@fivem/core-validation";
import type { IAppConfig } from "../server/public-api";
import { AppConfigSchema } from "./app-config-schema";

export function validateAppConfig(input: unknown): IAppConfig {
  return parseConfigSection(AppConfigSchema, input);
}