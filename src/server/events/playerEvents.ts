import { playerManager } from '../core/container';
import { logInfo } from '../core/logger';
import { Events } from '../../shared/events';

function getSourceFromEvent(): number {
  const srcStr = (global as unknown as { source: string }).source;
  return Number(srcStr) || 0;
}

export function registerPlayerEvents() {
  // Juste du log lors de la connexion brute
  on('playerConnecting', (name: string) => {
    const src = getSourceFromEvent();
    logInfo(`playerConnecting: ${name} (source: ${src})`);
  });

  // Le vrai moment où on enregistre le joueur dans le PlayerManager
  onNet(Events.core.playerLoaded, () => {
    const src = getSourceFromEvent();
    const name = GetPlayerName(src);

    if (!name) {
      logInfo(`playerLoaded from client but GetPlayerName(${src}) is empty`);
      return;
    }

    playerManager.registerPlayer(src, name);

    const p = playerManager.getPlayer(src);
    logInfo(`playerLoaded from client: ${p?.name ?? 'unknown'} [${src}]`);
  });

  on('playerDropped', (reason: string) => {
    const src = getSourceFromEvent();
    const p = playerManager.getPlayer(src);
    logInfo(`playerDropped: ${p?.name ?? 'unknown'} [${src}] reason: ${reason}`);
    playerManager.unregisterPlayer(src);
  });
}
