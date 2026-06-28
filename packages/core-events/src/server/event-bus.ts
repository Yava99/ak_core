import { LocalEventBus } from "./local-event-bus";
import { NetEventBus } from "./net-event-bus";
import type { EventMapConstraint } from "./types";

export class EventBus<
  TLocalEventMap extends EventMapConstraint,
  TNetEventMap extends EventMapConstraint
> {
  public readonly local: LocalEventBus<TLocalEventMap>;
  public readonly net: NetEventBus<TNetEventMap>;

  public constructor() {
    this.local = new LocalEventBus<TLocalEventMap>();
    this.net = new NetEventBus<TNetEventMap>();
  }
}