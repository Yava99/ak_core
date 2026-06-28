import type { IAppConfig } from "../../shared";
import { createDefaultConfig } from "../defaults";
import { mergeConfig } from "../merge-config";
import { loadJsonConfig } from "./json-source";
import { loadEnvConfig } from "./env-source";
import { loadConvarConfig } from "./convar-source";
import { validateAppConfig } from "../../schemas/validate-app-config";

export function buildConfig(): IAppConfig {
  const defaults = createDefaultConfig();
  const fromJson = loadJsonConfig();
  const fromEnv = loadEnvConfig();
  const fromConvars = loadConvarConfig();

  const merged = mergeConfig(
    mergeConfig(
      mergeConfig(defaults, fromJson),
      fromEnv
    ),
    fromConvars
  );

  return validateAppConfig(merged);
}