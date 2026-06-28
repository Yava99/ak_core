export const PLAYER_EVENTS = {
  CONNECTING: "player:connecting",
  LOADED: "player:loaded",
  DROPPED: "player:dropped",
} as const;

export type PlayerEventName =
  (typeof PLAYER_EVENTS)[keyof typeof PLAYER_EVENTS];