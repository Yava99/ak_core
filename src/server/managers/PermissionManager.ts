import type { IPlayerData } from '../../shared';
import { logInfo } from '../core/logger';

// simple wildcard checker: admin.* etc.
function matchPermission(pattern: string, permission: string): boolean {
  if (pattern === permission) return true;
  if (pattern.endsWith('.*')) {
    const prefix = pattern.slice(0, -2);
    return permission === prefix || permission.startsWith(prefix + '.');
  }
  return false;
}

export class PermissionManager {
  // clé: identifier (license:xxx, steam:xxx, etc.)
  private identifierPermissions = new Map<string, Set<string>>();
  private identifierGroups = new Map<string, string>();
  private groupPermissions = new Map<string, Set<string>>();

  constructor() {
    // group par défaut
    this.groupPermissions.set('admin', new Set(['admin.*']));
    this.groupPermissions.set('user', new Set([]));
  }

  grantPermissionToIdentifier(identifier: string, permission: string) {
    const set = this.identifierPermissions.get(identifier) ?? new Set<string>();
    set.add(permission);
    this.identifierPermissions.set(identifier, set);
    logInfo(`Granted permission ${permission} to ${identifier}`);
  }

  revokePermissionFromIdentifier(identifier: string, permission: string) {
    const set = this.identifierPermissions.get(identifier);
    if (!set) return;
    set.delete(permission);
    logInfo(`Revoked permission ${permission} from ${identifier}`);
  }

  setGroup(identifier: string, group: string) {
    this.identifierGroups.set(identifier, group);
    logInfo(`Set group of ${identifier} to ${group}`);
  }

  hasPermissionForPlayer(player: IPlayerData | undefined, permission: string): boolean {
    if (!player) return false;

    const idStrings = player.identifiers.map((id) => `${id.type}:${id.value}`);

    // permissions directes
    for (const idStr of idStrings) {
      const perms = this.identifierPermissions.get(idStr);
      if (!perms) continue;
      for (const p of perms) {
        if (matchPermission(p, permission)) return true;
      }
    }

    // permissions de groupe
    for (const idStr of idStrings) {
      const group = this.identifierGroups.get(idStr);
      if (!group) continue;
      const groupPerms = this.groupPermissions.get(group);
      if (!groupPerms) continue;
      for (const p of groupPerms) {
        if (matchPermission(p, permission)) return true;
      }
    }

    return false;
  }

  hasPermissionBySource(getPlayer: (src: number) => IPlayerData | undefined, source: number, permission: string): boolean {
    const player = getPlayer(source);
    return this.hasPermissionForPlayer(player, permission);
  }
}
