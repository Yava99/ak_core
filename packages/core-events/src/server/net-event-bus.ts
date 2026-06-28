import { createCoreLogger } from "@fivem/core-logger/server/public-api";
import {
  parseEventPayload,
  ValidationError as CoreValidationError,
  type BaseSchema
} from "@fivem/core-validation";
import { assertValidNetEventName } from "../shared";
import type { EventMapConstraint, EventName, EventPayload } from "./types";

const logger = createCoreLogger("core-events:net");

export class NetEventBus<TEventMap extends EventMapConstraint> {
  public emitToClient<TName extends EventName<TEventMap>>(
    playerId: number,
    eventName: TName,
    payload: EventPayload<TEventMap, TName>
  ): void {
    assertValidNetEventName(eventName);
    emitNet(eventName, playerId, payload);
  }

  public onFromClient<TName extends EventName<TEventMap>>(
    eventName: TName,
    handler: (playerId: number, payload: EventPayload<TEventMap, TName>) => void
  ): void {
    assertValidNetEventName(eventName);

    onNet(eventName, (payload: EventPayload<TEventMap, TName>) => {
      const playerId = Number(global.source);
      handler(playerId, payload);
    });
  }

  public onFromClientValidated<TName extends EventName<TEventMap>>(
    eventName: TName,
    payloadSchema: BaseSchema<EventPayload<TEventMap, TName>>,
    handler: (playerId: number, payload: EventPayload<TEventMap, TName>) => void | Promise<void>
  ): void {
    assertValidNetEventName(eventName);

    onNet(eventName, async (payload: unknown) => {
      const playerId = Number(global.source);

      try {
        const parsedPayload = parseEventPayload(payloadSchema, payload);
        await handler(playerId, parsedPayload);
      } catch (error) {
        if (error instanceof CoreValidationError) {
          logger.warn("net event payload validation failed", {
            eventName,
            playerId,
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