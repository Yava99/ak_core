import type { ICommandDefinition, ICommandContext } from '../../shared/core-api';
import type { PlayerManager } from './PlayerManager';
import type { PermissionManager } from './PermissionManager';
import { logInfo, logWarn } from '../core/logger';

export class CommandManager {
  private commands = new Map<string, ICommandDefinition>();

  constructor(
    private readonly playerManager: PlayerManager,
    private readonly permissionManager: PermissionManager,
  ) {}

  register(def: ICommandDefinition) {
    if (this.commands.has(def.name)) {
      logWarn(`Command ${def.name} already registered, overwriting.`);
    }
    this.commands.set(def.name, def);

    RegisterCommand(
      def.name,
      (source: number, args: string[], raw: string) => {
        this.handleCommand(def.name, source, args, raw);
      },
      false,
    );

    if (def.aliases) {
      for (const alias of def.aliases) {
        RegisterCommand(
          alias,
          (source: number, args: string[], raw: string) => {
            this.handleCommand(def.name, source, args, raw);
          },
          false,
        );
      }
    }

    logInfo(`Registered command /${def.name}`);
  }

  private handleCommand(name: string, source: number, args: string[], raw: string) {
    const def = this.commands.get(name);
    if (!def) return;

    const player = source > 0 ? this.playerManager.getPlayer(source) : undefined;

    if (def.requiredPermissions && def.requiredPermissions.length > 0) {
      const has = def.requiredPermissions.some((perm) =>
        this.permissionManager.hasPermissionBySource(
          (src) => this.playerManager.getPlayer(src),
          source,
          perm,
        ),
      );
      if (!has) {
        if (source > 0) {
          emitNet('chat:addMessage', source, {
            args: ['^1[ak_core]^0', "Vous n'avez pas la permission d'utiliser cette commande."],
          });
        }
        logWarn(`Player ${source} tried to use /${name} without permissions`);
        return;
      }
    }

    const ctx: ICommandContext = {
      source,
      name,
      args,
      rawCommand: raw,
      player,
    };

    try {
      const result = def.handler(ctx);
      if (result instanceof Promise) {
        result.catch((e) => {
          logWarn(`Error in async command /${name}: ${(e as Error).message}`);
        });
      }
    } catch (e) {
      logWarn(`Error in command /${name}: ${(e as Error).message}`);
    }
  }
}
