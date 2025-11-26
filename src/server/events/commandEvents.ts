import { commandManager } from '../core/container';
import { logInfo } from '../core/logger';

export function registerCommandEvents() {
  // /ping_core → test
  commandManager.register({
    name: 'ping_core',
    description: 'Test ak_core ping',
    handler: (ctx) => {
      if (ctx.source === 0) {
        logInfo('Ping command from console');
      } else {
        emitNet('chat:addMessage', ctx.source, {
          args: ['[ak_core]', 'Pong from server!'],
        });
      }
    },
  });

  // /core_players → log les joueurs
  commandManager.register({
    name: 'core_players',
    description: 'Liste les joueurs gérés par ak_core',
    //requiredPermissions: ['admin.core.players'],
    handler: (ctx) => {
      const getPlayers = global.exports['ak_core'].getCore().players.getAll;
      const players = getPlayers();
      logInfo(`Command /core_players used by ${ctx.source}, players: ${players.length}`);
      emitNet('chat:addMessage', ctx.source, {
        args: ['[ak_core]', `Joueurs suivis par core: ${players.length}`],
      });
    },
  });
}
