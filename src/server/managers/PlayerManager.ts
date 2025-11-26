import type { IPlayerData, IPlayerIdentifier } from '../../shared';
import type { EventBus, CoreInternalEvents } from '../core/eventBus';
import { logInfo } from '../core/logger';

function parseIdentifier(raw: string): IPlayerIdentifier {
  const [type, value] = raw.split(':');
  switch (type) {
    case 'license':
    case 'steam':
    case 'xbl':
    case 'live':
    case 'discord':
    case 'fivem':
    case 'ip':
      return { type, value };
    default:
      return { type: 'unknown', value: raw };
  }
}

export class PlayerManager {
  private players = new Map<number, IPlayerData>();

  constructor(private readonly eventBus: EventBus<CoreInternalEvents>) {}

  registerPlayer(source: number, name: string) {
    const identifiersRaw: string[] = [];
    const num = GetNumPlayerIdentifiers(source.toString());

    for (let i = 0; i < num; i++) {
      identifiersRaw.push(GetPlayerIdentifier(source.toString(), i));
    }

    const identifiers = identifiersRaw.map(parseIdentifier);
    const ping = GetPlayerPing(source.toString());
    const sessionId = `${source}-${Date.now()}-${Math.floor(Math.random() * 1e6)}`;

    const player: IPlayerData = {
      source,
      name,
      identifiers,
      ping,
      session: {
        sessionId,
        joinedAt: Date.now(),
        lastSeenAt: Date.now(),
        lastKnownIp: identifiers.find((id) => id.type === 'ip')?.value,
        // hardwareId à remplir plus tard
      },
      flags: {
        isWhitelisted: false,
        suspectedCheater: false,
      },
      meta: {},
    };

    this.players.set(source, player);
    logInfo(`Player registered: ${name} [${source}]`);

    this.eventBus.emit('core:playerRegistered', { player });
  }

  unregisterPlayer(source: number) {
    const existed = this.players.delete(source);
    if (existed) {
      logInfo(`Player unregistered [${source}]`);
      this.eventBus.emit('core:playerUnregistered', { source });
    }
  }

  updatePing(source: number) {
    const player = this.players.get(source);
    if (!player) return;
    player.ping = GetPlayerPing(source.toString());
    player.session.lastSeenAt = Date.now();
    this.eventBus.emit('core:playerUpdated', { player });
  }

  getPlayer(source: number): IPlayerData | undefined {
    return this.players.get(source);
  }

  getAllPlayers(): IPlayerData[] {
    return Array.from(this.players.values());
  }
}
