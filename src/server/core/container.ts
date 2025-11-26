import { EventBus, type CoreInternalEvents } from './eventBus';
import { PlayerManager } from '../managers/PlayerManager';
import { PermissionManager } from '../managers/PermissionManager';
import { CommandManager } from '../managers/CommandManager';

export const coreEventBus = new EventBus<CoreInternalEvents>();

export const permissionManager = new PermissionManager();
export const playerManager = new PlayerManager(coreEventBus);
export const commandManager = new CommandManager(playerManager, permissionManager);

// Ici plus tard: characterManager, jobManager, inventoryManager, etc.
