export const Events = {
    core: {
        playerRegistered: 'ak_core:playerRegistered',
        playerUpdated: 'ak_core:playerUpdated',
        playerUnregistered: 'ak_core:playerUnregistered',
        playerLoaded: 'ak_core:playerLoaded', // client → serveur quand le joueur est prêt
    },
} as const;

export type CoreEventName =
    | typeof Events.core.playerRegistered
    | typeof Events.core.playerUpdated
    | typeof Events.core.playerUnregistered
    | typeof Events.core.playerLoaded;