export interface CoreConfig {
  debug: boolean;
  frameworkName: string;
}

const defaultConfig: CoreConfig = {
  debug: true,
  frameworkName: 'ak_framework',
};

export function getConfig(): CoreConfig {
  // plus tard: lecture fichier JSON/YAML, DB, etc.
  return defaultConfig;
}
