import type {
  EventMapConstraint,
  EventName,
  EventPayload,
  ICoreEventsLocalEventPayloadMap,
  ICoreEventsNetEventPayloadMap
} from "../shared";

export type {
  EventMapConstraint,
  EventName,
  EventPayload
};

export interface ILocalEventPayloadMap extends ICoreEventsLocalEventPayloadMap {}

export interface INetEventPayloadMap extends ICoreEventsNetEventPayloadMap {}