import fs from "node:fs";
import path from "node:path";
import type { AppConfigOverride } from "../types";

export function loadJsonConfig(): AppConfigOverride {
  const filePath = path.resolve(process.cwd(), "config", "server.config.json");

  if (!fs.existsSync(filePath)) {
    return {};
  }

  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = JSON.parse(raw) as AppConfigOverride;

  return parsed;
}