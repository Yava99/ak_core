import { type BaseSchema } from "@fivem/core-validation";
import type { EventMapConstraint, EventName, EventPayload } from "./types";
export declare class LocalEventBus<TEventMap extends EventMapConstraint> {
    emit<TName extends EventName<TEventMap>>(eventName: TName, payload: EventPayload<TEventMap, TName>): void;
    on<TName extends EventName<TEventMap>>(eventName: TName, handler: (payload: EventPayload<TEventMap, TName>) => void): void;
    onValidated<TName extends EventName<TEventMap>>(eventName: TName, payloadSchema: BaseSchema<EventPayload<TEventMap, TName>>, handler: (payload: EventPayload<TEventMap, TName>) => void | Promise<void>): void;
}
