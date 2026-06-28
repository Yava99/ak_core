import { LocalEventBus } from "./local-event-bus";
import { NetEventBus } from "./net-event-bus";
import type { EventMapConstraint } from "./types";
export declare class EventBus<TLocalEventMap extends EventMapConstraint, TNetEventMap extends EventMapConstraint> {
    readonly local: LocalEventBus<TLocalEventMap>;
    readonly net: NetEventBus<TNetEventMap>;
    constructor();
}
