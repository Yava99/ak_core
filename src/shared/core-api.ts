import type { IPlayerData } from './index';

export interface ICommandContext {
  source: number;
  name: string;
  args: string[];
  rawCommand: string;
  player?: IPlayerData;
}

export interface ICommandDefinition {
  name: string;
  description?: string;
  aliases?: string[];
  group?: string; // ex: 'admin', 'user'
  requiredPermissions?: string[];
  handler: (ctx: ICommandContext) => void | Promise<void>;
}

export interface ICorePlayersApi {
  getBySource(source: number): IPlayerData | undefined;
  getAll(): IPlayerData[];
}

export interface ICoreCommandsApi {
  register(def: ICommandDefinition): void;
}

export interface ICorePermissionsApi {
  has(source: number, permission: string): boolean;
}

export interface ICoreApi {
  players: ICorePlayersApi;
  commands: ICoreCommandsApi;
  permissions: ICorePermissionsApi;
}

// Typage des exports pour d'autres ressources (JS/TS)
declare global {
  interface CitizenExports {
    ak_core: {
      getCore(): ICoreApi;
    };
  }
}

// pour faire de ce fichier un module TS
export {};
