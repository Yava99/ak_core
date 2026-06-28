import { createCoreLogger } from "@fivem/core-logger/server/public-api";
import {
  parseEventPayload,
  ValidationError as CoreValidationError,
  type BaseSchema
} from "@fivem/core-validation";
import { assertValidLocalEventName } from "../shared";
import type { EventMapConstraint, EventName, EventPayload } from "./types";

const logger = createCoreLogger("core-events:local");

export class LocalEventBus<TEventMap extends EventMapConstraint> {
  public emit<TName extends EventName<TEventMap>>(
    eventName: TName,
    payload: EventPayload<TEventMap, TName>
  ): void {
    assertValidLocalEventName(eventName);
    emit(eventName, payload);
  }

  public on<TName extends EventName<TEventMap>>(
    eventName: TName,
    handler: (payload: EventPayload<TEventMap, TName>) => void
  ): void {
    assertValidLocalEventName(eventName);

    on(eventName, (payload: EventPayload<TEventMap, TName>) => {
      handler(payload);
    });
  }

  public onValidated<TName extends EventName<TEventMap>>(
    eventName: TName,
    payloadSchema: BaseSchema<EventPayload<TEventMap, TName>>,
    handler: (payload: EventPayload<TEventMap, TName>) => void | Promise<void>
  ): void {
    assertValidLocalEventName(eventName);

    on(eventName, async (payload: unknown) => {
      try {
        const parsedPayload = parseEventPayload(payloadSchema, payload);
        await handler(parsedPayload);
      } catch (error) {
        if (error instanceof CoreValidationError) {
          logger.warn("local event payload validation failed", {
            eventName,
            formatted: error.format(),
            issues: error.issues,
            flattened: error.flatten()
          });
          return;
        }

        throw error;
      }
    });
  }
}