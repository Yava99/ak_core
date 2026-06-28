import type { AppConfigOverride } from "./types";

export function loadConfigOverrides(): AppConfigOverride {
  return {
    server: {
      environment: "development"
    }
  };
}