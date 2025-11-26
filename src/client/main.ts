import { Events } from '../shared/events';

console.log('[ak_core] Client script loaded');

on('playerSpawned', () => {
  console.log('[ak_core] playerSpawned event, notifying server...');
  emitNet(Events.core.playerLoaded);
});
