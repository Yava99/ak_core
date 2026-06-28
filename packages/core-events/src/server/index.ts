import { createCoreLogger } from "@fivem/core-logger/server/public-api";
import { schema } from "@fivem/core-validation";
import { defineLocalEvent } from "../shared";
import { EventBus } from "./event-bus";
import type { ILocalEventPayloadMap, INetEventPayloadMap } from "./types";

const logger = createCoreLogger("core-events");
const eventBus = new EventBus<ILocalEventPayloadMap, INetEventPayloadMap>();

const coreEventsTestEvent = defineLocalEvent("core-events", "test");

const CoreEventsTestPayloadSchema = schema.object({
  message: schema.string().trim().min(1),
  value: schema.number(),
  active: schema.boolean()
}).strict();

logger.info("core-events started");

on("onResourceStart", (resourceName: string) => {
  if (resourceName !== GetCurrentResourceName()) {
    return;
  }

  try {
    logger.info("resource boot confirmed");

    eventBus.local.onValidated(coreEventsTestEvent, CoreEventsTestPayloadSchema, (payload) => {
      logger.info("received core-events:test", { payload });
    });

    eventBus.local.emit(coreEventsTestEvent, {
      message: "hello",
      value: 42,
      active: true
    });

    // Tu peux tester un invalid payload plus tard si tu veux voir le log de validation :
    // emit(coreEventsTestEvent, { message: "", value: "bad", active: true });
  } catch (error) {
    logger.error(error);
  }
});

export { eventBus };