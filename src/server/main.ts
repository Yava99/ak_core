import { logInfo } from './core/logger';
import { registerPlayerEvents } from './events/playerEvents';
import { registerCommandEvents } from './events/commandEvents';
import { buildCoreApi } from './core/coreApi';

const coreApi = buildCoreApi();

logInfo('Server script loaded');

on('onResourceStart', (resourceName: string) => {
  if (resourceName !== GetCurrentResourceName()) return;

  logInfo('Resource started, registering core events...');

  registerPlayerEvents();
  registerCommandEvents();

  logInfo('ak_core initialization complete.');
});

// Export "getCore" pour les autres ressources
(global as any).exports('getCore', () => coreApi);
