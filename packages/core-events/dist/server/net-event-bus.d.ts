import { type BaseSchema } from "@fivem/core-validation";
import type { EventMapConstraint, EventName, EventPayload } from "./types";
export declare class NetEventBus<TEventMap extends EventMapConstraint> {
    emitToClient<TName extends EventName<TEventMap>>(playerId: number, eventName: TName, payload: EventPayload<TEventMap, TName>): void;
    onFromClient<TName extends EventName<TEventMap>>(eventName: TName, handler: (playerId: number, payload: EventPayload<TEventMap, TName>) => void): void;
    onFromClientValidated<TName extends EventName<TEventMap>>(eventName: TName, payloadSchema: BaseSchema<EventPayload<TEventMap, TName>>, handler: (playerId: number, payload: EventPayload<TEventMap, TName>) => void | Promise<void>): void;
}
