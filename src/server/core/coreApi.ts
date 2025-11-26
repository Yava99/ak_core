import type { ICoreApi } from '../../shared/core-api';
import { playerManager, commandManager, permissionManager } from './container';

export function buildCoreApi(): ICoreApi {
  return {
    players: {
      getBySource: (src) => playerManager.getPlayer(src),
      getAll: () => playerManager.getAllPlayers(),
    },
    commands: {
      register: (def) => commandManager.register(def),
    },
    permissions: {
      has: (src, perm) =>
        permissionManager.hasPermissionBySource(
          (s) => playerManager.getPlayer(s),
          src,
          perm,
        ),
    },
  };
}
