export declare const PLAYER_EVENTS: {
    readonly CONNECTING: "player:connecting";
    readonly LOADED: "player:loaded";
    readonly DROPPED: "player:dropped";
};
export type PlayerEventName = (typeof PLAYER_EVENTS)[keyof typeof PLAYER_EVENTS];
