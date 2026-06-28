import { ValidationError } from "@fivem/core-errors";

const LOCAL_EVENT_PATTERN = /^[a-z0-9-]+:[A-Za-z][A-Za-z0-9]*$/;
const NET_EVENT_PATTERN = /^[a-z0-9-]+:net:[A-Za-z][A-Za-z0-9]*$/;

export function assertValidLocalEventName(name: string): void {
  if (!LOCAL_EVENT_PATTERN.test(name)) {
    throw new ValidationError("Invalid local event name", {
      value: name,
      expected: "<module>:<event>"
    });
  }
}

export function assertValidNetEventName(name: string): void {
  if (!NET_EVENT_PATTERN.test(name)) {
    throw new ValidationError("Invalid net event name", {
      value: name,
      expected: "<module>:net:<event>"
    });
  }
}

export function buildLocalEventName(moduleName: string, eventName: string): string {
  const fullName = `${moduleName}:${eventName}`;
  assertValidLocalEventName(fullName);
  return fullName;
}

export function buildNetEventName(moduleName: string, eventName: string): string {
  const fullName = `${moduleName}:net:${eventName}`;
  assertValidNetEventName(fullName);
  return fullName;
}

export function defineLocalEvent<
  TModuleName extends string,
  TEventName extends string
>(
  moduleName: TModuleName,
  eventName: TEventName
): `${TModuleName}:${TEventName}` {
  return buildLocalEventName(
    moduleName,
    eventName
  ) as `${TModuleName}:${TEventName}`;
}

export function defineNetEvent<
  TModuleName extends string,
  TEventName extends string
>(
  moduleName: TModuleName,
  eventName: TEventName
): `${TModuleName}:net:${TEventName}` {
  return buildNetEventName(
    moduleName,
    eventName
  ) as `${TModuleName}:net:${TEventName}`;
}