export type IdentifierType =
  | 'license'
  | 'steam'
  | 'xbl'
  | 'live'
  | 'discord'
  | 'fivem'
  | 'ip'
  | 'unknown';

export interface IPlayerIdentifier {
    type: IdentifierType;
    value: string;
}

export interface IPlayerSessionInfo {
    sessionId: string;      // UUID de session
    joinedAt: number;       // timestamp (Date.now)
    lastSeenAt: number;     // MAJ régulière si tu veux
    lastKnownIp?: string;
    hardwareId?: string;    // à remplir plus tard si tu as une source fiable
}

export interface IPlayerData  {
    source: number;                 // id FiveM
    name: string;
    identifiers: IPlayerIdentifier[];
    ping: number;
    session: IPlayerSessionInfo;
    flags: {
        isWhitelisted?: boolean;
        suspectedCheater?: boolean;
    };
    // meta libre pour les modules
    meta: Record<string, unknown>;
}