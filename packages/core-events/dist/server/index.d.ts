import { EventBus } from "./event-bus";
import type { ILocalEventPayloadMap, INetEventPayloadMap } from "./types";
declare const eventBus: EventBus<ILocalEventPayloadMap, INetEventPayloadMap>;
export { eventBus };
