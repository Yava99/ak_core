export * from "./contracts";
export * from "./naming";

export type EventMapConstraint = {};

export type EventName<TMap extends EventMapConstraint> = Extract<keyof TMap, string>;

export type EventPayload<
  TMap extends EventMapConstraint,
  TName extends EventName<TMap>
> = TMap[TName];