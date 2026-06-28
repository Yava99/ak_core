import { validateDependencies } from "./validate";

export function defineDependencies(...dependencies: string[]): string[] {
  return validateDependencies(dependencies);
}