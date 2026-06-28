import type { IDefinedService } from "./types";
import { validateDefinedService } from "./validate";

export function defineService<TInstance>(
  name: string,
  instance: TInstance,
  options?: { public?: boolean }
): IDefinedService<TInstance> {
  return validateDefinedService({
    name,
    instance,
    public: options?.public ?? false
  });
}